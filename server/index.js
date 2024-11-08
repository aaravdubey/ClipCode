import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import CodeRoom from './models/codeRoom.js';
import { debounce } from './utils/debounce.js';
import env from 'dotenv';
env.config();

const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const debouncedCodeChange = debounce(async (roomId, code) => {
  await CodeRoom.findOneAndUpdate({ name: roomId }, { code }, { new: true });
  // console.log("updated");
}, 1000);

const debouncedLanguageChange = debounce(async (roomId, language) => {
  await CodeRoom.findOneAndUpdate({ name: roomId }, { language }, { new: true });
} , 1000);

io.on('connection', (socket) => {
  // console.log('a user connected');

  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    // console.log(`User ${socket.id} joined room ${roomId}`);

    const clientsInRoom = io.sockets.adapter.rooms.get(roomId);
    const numClients = clientsInRoom ? clientsInRoom.size : 0;
    // console.log(`Number of clients in room ${roomId}: ${numClients}`);

    const codeRoom = await CodeRoom.findOne({ name: roomId });
    // console.log(codeRoom);
    if (!codeRoom) {
      const newCodeRoom = new CodeRoom({ name: roomId });
      await newCodeRoom.save();
    } else {
      if (codeRoom.code) io.to(socket.id).emit('receiveCode', codeRoom.code);
      if (codeRoom.language) io.to(socket.id).emit('receiveLanguage', codeRoom.language);
      // console.log(codeRoom.code);
      // console.log(codeRoom.language);
    }
    io.to(roomId).emit('coderCount', numClients);
  });

  socket.on('codeChange', ({ roomId, code }) => {
    // console.log('code: ', code);
    io.to(roomId).emit('receiveCode', code);
    debouncedCodeChange(roomId, code);
  });

  socket.on('languageChange', ({ roomId, language }) => {
    // console.log('language: ', language);
    io.to(roomId).emit('receiveLanguage', language);
    debouncedLanguageChange(roomId, language);
  });

  socket.on('disconnecting', () => {
    const rooms = Array.from(socket.rooms).slice(1);
    rooms.forEach((roomId) => {
      const clientsInRoom = io.sockets.adapter.rooms.get(roomId);
      const numClients = clientsInRoom ? clientsInRoom.size - 1 : 0;
      // console.log(`Updated number of clients in room ${roomId}: ${numClients}`);
      io.to(roomId).emit('coderCount', numClients);
    });
  });

  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
server.listen(3001, () => console.log('Socket Server is running on port 3001'));
