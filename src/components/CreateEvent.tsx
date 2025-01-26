import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useReducer } from "react";
import { auth, db } from "../firebaseSetup";
import { addEvent } from "../store/EventManager";

export const CreateEvent = (props: {
  isVisible: boolean;
  cb: CallableFunction;
  successCb: CallableFunction;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    desc: "",
    date: "",
    time: "",
    authorId: auth.currentUser?.uid,
    location: "",
  });
  const handleChange = (e: any) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const incrementTime = (e: any, inc: number) => {
    dispatch({
      type: "INCREMENT_TIME",
      payload: { increment: inc, value: state.time },
    });
  };
  const onClose = () => {
    dispatch({ type: "RESET", payload: {} });
    props.cb();
  };
  const handleCreate = async () => {
    await addEvent(state);
    props.successCb();
    dispatch({ type: "RESET", payload: {} });
  };
  return (
    <div className={`create_event-holder ${props.isVisible ? "" : "hidden"}`}>
      <div className={`panel-create_event panel-shadow `}>
        <h1>Create Event</h1>
        <hr style={{ width: "25%", marginBottom: "40px" }} />
        <div>
          <div className="create_event-input">
            <div className="input-head">
              <span>Title:</span> <i>{state.title.length}/30</i>
            </div>
            <input
              name="title"
              maxLength={30}
              value={state.title}
              type="text"
              style={{ width: "460px" }}
              onChange={handleChange}
            />
          </div>
          <div className="create_event-input">
            <div className="input-head">
              <span>Description:</span> <i>{state.desc.length}/40</i>
            </div>
            <input
              name="desc"
              maxLength={40}
              value={state.desc}
              type="text"
              style={{ width: "460px" }}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="create_event-input">
            <span style={{ marginLeft: "10px" }}>Date:</span>
            <input
              name="date"
              type="date"
              value={state.date}
              style={{ width: "140px" }}
              onChange={handleChange}
            />
            <span style={{ marginLeft: "10px" }}>Time:</span>
            <input
              name="time"
              type="time"
              value={state.time}
              style={{ width: "135px" }}
              onChange={handleChange}
            />
            <div className="increment-buttons" style={{ float: "right" }}>
              <div
                style={{ borderRadius: "12px 12px 0px 0px" }}
                onClick={(e) => incrementTime(e, 1)}
              >
                +
              </div>
              <div
                style={{ borderRadius: "0px 0px 12px 12px" }}
                onClick={(e) => incrementTime(e, -1)}
              >
                -
              </div>
            </div>
          </div>
          <br />
          <div className="create_event-input">
            <div className="input-head">
              <span>Location:</span> <i>{state.location.length}/50</i>
            </div>
            <input
              name="location"
              maxLength={50}
              value={state.location}
              type="text"
              style={{ width: "460px" }}
              onChange={handleChange}
            />
          </div>
          <br />
        </div>
        <div className="centered">
          <button onClick={onClose}>Close</button>
          <button className="blue" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const lengthLimits = { title: "30", desc: "40" };
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };
    case "INCREMENT_TIME":
      let hour: number =
        Number(
          action.payload.value.substring(0, action.payload.value.indexOf(":"))
        ) + action.payload.increment;
      if (hour >= 24) hour = 0;
      if (hour < 0) hour = 23;
      const time = (hour < 10 ? "0" + hour : hour) + ":00";
      return { ...state, time: time };
    case "RESET":
      return {location:"",date:"", title: "", desc: "", time: "", authorId:state.authorId};
    default:
      return state;
  }
};
function created(created: any, reload: boolean | undefined) {
  throw new Error("Function not implemented.");
}
