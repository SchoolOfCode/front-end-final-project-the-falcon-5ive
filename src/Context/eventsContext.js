//React
import { useContext, createContext, useState } from "react";

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(null);

  /*---------------------events Test---------------------*/

  //   useEffect(() => {
  //     if (authUser && userData && allEvents) {
  //       const gettingAllEvents = {
  //         eventName: events.eventName,
  //         eventType: events.eventType,
  //         date: events.date,
  //         time: events.time,
  //         uid: events.uid,
  //         description: events.description,
  //         image: events.image,
  //         location: events.location,
  //         enableVolunteers: events.enableVolunteers,
  //         attendingList: events.attendingList,
  //         likes: events.likes,
  //         volunteerList: events.volunteerList,
  //       };
  //       setEvents(gettingAllEvents);
  //     }
  //   }, [allEvents]);

  /*---------------------FINISH events Test---------------------*/

  return (
    <EventsContext.Provider value={[events, setEvents]}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEventsContext() {
  return useContext(EventsContext);
}
