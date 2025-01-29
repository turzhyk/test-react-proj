import React, { useEffect, useState } from "react";
import { isPropertyAccessExpression, JsxElement } from "typescript";
import { addMember, removeMember } from "../store/EventManager";
import "../index.css";
import { IEvent } from "../store/EventManager";
import { getUser } from "../store/UsersManager";
import { auth } from "../firebaseSetup";

export function EventItem(props: {
  data: IEvent;
  author: { fullname: string };
}) {
  let _isIn = false;

  if (auth.currentUser != null && props.data.members != null) {
    _isIn = props.data.members.includes(auth.currentUser?.uid);
  }
  const [isIn, setIsIn] = useState(_isIn);

  const join = async () => {
    if (auth.currentUser != null) {
      setIsIn(true);
      await addMember(auth.currentUser?.uid, props.data.id);
    }
  };
  const leave = async () => {
    if (auth.currentUser != null)
      await removeMember(auth.currentUser?.uid, props.data.id);
    setIsIn(false);
  };
  useEffect(() => {}, [isIn]);

  const joinButton = () => {
    if (isIn) {
      return (
        <button className="event-item-button " onClick={leave}>
          Leave
        </button>
      );
    } else {
      return (
        <button className="event-item-button key" onClick={join}>
          I'm in!
        </button>
      );
    }
  };
  const getUsersPics = () => {
    let result: JSX.Element[] = [];
    for (let i = 0; i < props.data.members.length; i++) {
      const picUrl = getUser(props.data.members[i])?.picUrl;
      result.push(
        <img
          className="event-item-profilePic"
          src={picUrl}
          height="34"
          width="34"
        />
      );
    }
    return result;
  };
  return (
    <div className="event-item panel-shadow-crisp">
      <div className="event-item-top">
        <div className="event-item-top-left">
          <h1>{props.data.title}</h1>
          <span className="event-item-description">{props.data.desc}</span>
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
          <p className="event-item-location">
            <span style={{ lineHeight: "20px", marginBottom:"10rem" }}>{props.data.location}</span>
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "translate(0px,3px)", transformBox: "fill-box" }}
            >
              <path
                d="M10 8L14 12M14 8L10 12M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>
      </div>

      <div
        className={"event-item-bottom " + (isIn == true ? " event-active" : "")}
      >
        <div className="event-item-participants">
          {getUsersPics()}
          {/* <img
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
          /> */}
        </div>
        {joinButton()}
      </div>
    </div>
  );
}
