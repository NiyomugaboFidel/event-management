import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats is required'],
    min: 1,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;
