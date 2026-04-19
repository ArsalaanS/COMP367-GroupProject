 import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema({
  author: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  isResolved: { type: Boolean, default: false },
  volunteers: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);
export default HelpRequest;
