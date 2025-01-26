import React, { FormEvent, useEffect } from "react";
import "../index.css";
import { useState, useReducer } from "react";
import { auth, db } from "../firebaseSetup";
import { collection, addDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import loading from "../img/loading.png";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../store/CreateAccount";
import { AlertPopup } from "../components/AlertPopup";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      const match =
        (action.payload.pwd === undefined ? state.pwd : action.payload.pwd) ===
        (action.payload.rpwd === undefined ? state.rpwd : action.payload.rpwd);
      return {
        ...state,
        email:
          action.payload.email === undefined
            ? state.email
            : action.payload.email,
        pwd: action.payload.pwd === undefined ? state.pwd : action.payload.pwd,
        rpwd:
          action.payload.rpwd === undefined ? state.rpwd : action.payload.rpwd,
        pwdMatch: match,
        name : action.payload.name|| state.name,
        surname : action.payload.surname || state.name
      };
  }
};
export function SignIn() {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    pwd: "",
    rpwd: "",
    name:"",
    surname:"",
    pwdMatch: false,
    pwdAccept: false,
  });
  const pwdMatch = state.pwdMatch;

  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const startCreating = async (event: FormEvent) => {
    console.log(state);
    setIsLoading(true);
    const res = await createAccount(event, state.email, state.pwd, state.name, state.surname);
    if (res === true) navigate("/");
    else setError("bad email");
    setIsLoading(false);
    //setIsLoading(createAccount(event))
  };

  return (
    <form
      onSubmit={(e)=>
        startCreating(e)}
      className="input-form panel-shadow"
    >
      <h1 style={{ marginTop: "0px" }}>Create  account</h1>
      <hr style={{ width: "10%" }} />
      <br/>
      <div className="signin-input">
        <div style={{ marginLeft:"10px"}}>Name:</div>
        <input
          style={{ width: "92%" }}
          type="text"
          onChange={(e) => dispatch({ payload: { name: e.target.value } })}
        />
      </div>
      <div className="signin-input">
        <div style={{ marginLeft:"10px"}}>Surname:</div>
        <input
          style={{ width: "92%" }}
          type="text"
          onChange={(e) => dispatch({ payload: { surname: e.target.value } })}
        />
      </div>
      <br />
      <div className="signin-input">
        <div style={{ marginLeft:"10px"}}> Enter email:</div>
        <input
         style={{ width: "92%" }}
          type="text"
          id="email"
          onChange={(e) => dispatch({ payload: { email: e.target.value } })}
        />
      </div>
      <div className="signin-input">
        <div className="input-head">
          <div>Enter password:</div> <i>
            {state.pwd.length<8 && <i className="input-head-alert-text">min length is 8</i>}
          </i>
        </div>
        <input
          style={{ width: "92%" }}
          type="password"
          id="pwd"
          onChange={(e) => dispatch({ payload: { pwd: e.target.value } })}
        />
      </div>
      <div className="signin-input">
        <div style={{ marginLeft:"10px"}}>Repeat password:</div>
        <input
          style={{ width: "92%" }}
          type="password"
          id="pwd"
          onChange={(e) => dispatch({ payload: { rpwd: e.target.value } })}
        />
          {/* <AlertPopup isVisible={!pwdMatch} text= "❗️ passwords don't match" /> */}
      </div>
      <br />
      {error}
      <div className="centered">
        <button type="submit" className={isLoading ? "hidden" : ""}>
          Sign in
        </button>
        <img
          className={`loading ${isLoading ? "" : "hidden"}`}
          src={loading}
          width="40"
          height="40"
        />
      </div>
    </form>
  );
}
