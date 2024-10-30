import EventList, { EndedEvents } from "./components/EventList";

export default function HomePage() {


  return (
    <div>
      <h1 className=" px-4 text-3xl font-bold mb-4">Upcoming Events</h1>
       <div className="p-4">
       <EventList />
       </div>
       <hr />
      <h1 className=" px-4 text-3xl font-bold mb-4">Ended Events</h1>
       <div className="p-4">
        <EndedEvents />
       </div>
    </div>
  );
}
