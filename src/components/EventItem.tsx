import React, { useEffect, useState ,useRef} from "react";
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
  const [shownMembers, setShownMembers] = useState(false);


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
  const handleMouseLeaveList = () => {
    setShownMembers(false);
  };
  useEffect(() => {}, [isIn, shownMembers]);
  const allMembers = () => {
    return props.data.members.map((uid, i,arr) => (
      <>
        <div className="event-item-allmembers-element">
          {" "}
          <img
            className="event-item-profilePic"
            src={getUser(uid)?.picUrl}
            height="34"
            width="34"
          />
          <span>{getUser(uid)?.name + " " + getUser(uid)?.surname}</span>
        </div>
        {i != arr.length-1?<hr />: <></>}
        
      </>
    ));
  };
  const joinButton = () => {
    if (isIn) {
      return (
        <button className="event-item-button active" onClick={leave}>
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
    <div className="event-item panel-shadow-crisp" onMouseLeave={handleMouseLeaveList}>
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
            <span style={{ lineHeight: "20px", marginBottom: "10rem" }}>
              {props.data.location}
            </span>
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: "translate(0px,3px)",
                transformBox: "fill-box",
              }}
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
        <div
          className={"event-item-allmembers-list " + (shownMembers? "active":"")}
          onMouseLeave={handleMouseLeaveList}
          // style={{ display: shownMembers ? "block" : "none" }}
        >
          {allMembers()}
        </div>
        <div className="event-item-participants">{getUsersPics()}</div>
        <div
          className="event-item-allmembers-button"
          onMouseEnter={() => setShownMembers(true)}
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
              fill="currentcolor"
            />
          </svg>
        </div>
        {joinButton()}
      </div>
    </div>
  );
}
