import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, enum: ['Bug', 'Feature Request', 'Question'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
}, { 
  timestamps: true,
  versionKey: false,
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
