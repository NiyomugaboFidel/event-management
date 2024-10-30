export interface Booking {
    _id: string;
    attendeeName: string;
    attendeeEmail: string;
    numberOfSeats: number;
    event: {
      _id: string;
      title: string;
    };
   }