import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, default: '' },
  language: { type: String, default: 'none' },
  coderCount: { type: Number, default: 0 },
  
});