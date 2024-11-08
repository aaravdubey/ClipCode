import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, default: '' },
  language: { type: String, default: 'none' },
});

const CodeRoom = mongoose.model('room', roomSchema);

export default CodeRoom;