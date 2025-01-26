import React, { useEffect, useState } from "react";
import { isPropertyAccessExpression } from "typescript";
import "../index.css";
import { IEvent } from "../store/EventManager";
import { getUser } from "../store/UsersManager";

export function EventItem(props: { data: IEvent, author:{fullname:string} }) {
  return (
    <div className="event-item panel-shadow-crisp">
      <div className="event-item-top">
        <div className="event-item-top-left">
          <h1>{props.data.title}</h1>
          <span className="event-item-author">
            <img
              className="event-item-author-profilePic"
              src="https://www.rappler.com/tachyon/2022/08/Screen-Shot-2022-08-16-at-3.54.21-PM.png"
              height="25"
              width="25"
            />
            <h4>{props.author.fullname}</h4>
          </span>
        </div>
        <div className="event-item-top-right">
          <p className="event-item-date">
            {props.data.date}
            <br />
            {props.data.time}
          </p>
        </div>
      </div>

      <div className="event-item-bottom">
        <div className="event-item-participants">
          <img
            className="event-item-profilePic"
            src="https://upload.wikimedia.org/wikipedia/en/3/34/Jimmy_McGill_BCS_S3.png"
            height="34"
            width="34"
          />
          <img
            className="event-item-profilePic"
            src="https://pbs.twimg.com/profile_images/1319329032262078464/f54cA6_h_400x400.jpg"
            height="34"
            width="34"
          />
          <img
            className="event-item-profilePic"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjxhvzbNI3uoZVJC0umOq9i5KCC1fs6QndNgGZvEIaDPR0i5T0rFY5PQ6uyWcmmXjKPV8&usqp=CAU"
            height="34"
            width="34"
          />
          <img
            className="event-item-profilePic"
            src="https://www.rappler.com/tachyon/2022/08/Screen-Shot-2022-08-16-at-3.54.21-PM.png"
            height="34"
            width="34"
          />
        </div>
        <button className="event-item-button key">I'm in!</button>
      </div>
    </div>
  );
}
