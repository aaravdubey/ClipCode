import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, default: '' },
  language: { type: String, default: 'none' },
}, { timestamps: true });

const CodeRoom = mongoose.model('CodeRoom', roomSchema);

export default CodeRoom;