import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('codeChange', ({ roomId, code }) => {
    // console.log('code: ', code);
    io.to(roomId).emit('receiveCode', code);
  });

  socket.on('languageChange', ({ roomId, language }) => {
    // console.log('language: ', language);
    io.to(roomId).emit('receiveLanguage', language);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
server.listen(3001, () => console.log('Socket Server is running on port 3001'));
