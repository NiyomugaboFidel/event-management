import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    attendeeName: {
      type: String,
      required: [true, "Attendee name is required"],
    },
    attendeeEmail: {
      type: String,
      required: [true, "Attendee email is required"],
    },
    numberOfSeats: {
      type: Number,
      required: [true, "Number of seats is required"],
      min: 1,
    },
  },
  { timestamps: true }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
