import "../index.css";
import React, { useState, useEffect } from "react";
import { EventItem } from "../components/EventItem";
import { IEvent, getEvents } from "../store/EventManager";
import { CreateEvent } from "../components/CreateEvent";
import { convertToObject } from "typescript";
import { getUser } from "../store/UsersManager";
import { AlertPopup } from "../components/AlertPopup";
export function Events() {
  const [isLoading, setIsLoading] = useState(false);
  const [addedEvent, setAddedEvent] = useState(false);
  const [addingEvent, setAddingEvent] = useState(false);
  const [st, setSt] = useState<IEvent[]>([]);
  const handleAddEventBtn = () => {
    setAddedEvent(false);
    setAddingEvent(true);
  };
  const fetch = async () => {
    setIsLoading(true);
    const newData = await getEvents();
    setSt(newData);
    setIsLoading(false);
  };
  useEffect(() => {
    fetch();
  }, [setAddedEvent]);
  const receiveCreateCallback = (created: boolean) => {
    setAddingEvent(false);
    setAddedEvent(created);
    if (created) fetch();
    
    // if (created) window.location.reload();
  };
  const getEventList = () => {
    return st.map((item, index) => {
      const author = getUser(item.authorId);
      return (
        <EventItem
          data={item}
          key={item.id}
          author={{ fullname: author?.name + " " + author?.surname }}
        />
      );
    });
  };
  return (
    <>
      <CreateEvent
        isVisible={addingEvent}
        cb={() => receiveCreateCallback(false)}
        successCb={() => receiveCreateCallback(true)}
      />

      <div style={{ position: "absolute", bottom: "100px" }}>
        <AlertPopup
          isVisible={addedEvent}
          color="green"
          text="Added new event!"
          timer={addedEvent? 5:0}
        />
      </div>

      <h1>All events</h1>
      <div className="event-items">
        <>
          <div
            className="add_event-button panel-shadow"
            onClick={handleAddEventBtn}
          >
            <div>+</div>Create Event
          </div>
          {getEventList()}
        </>
      </div>
      <ul></ul>
    </>
  );
}
