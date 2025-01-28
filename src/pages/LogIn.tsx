import React, { useEffect } from "react";
import "../index.css";
import { useState } from "react";
import { auth, db } from "../firebaseSetup";
import { collection, addDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import loading from "../img/loading.png";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function startCreating() {
    setIsLoading(true);
  }
  const createAccount = async (event: any) => {
    event.preventDefault();
    let err: string = "";
    try {
      await auth.signInWithEmailAndPassword(email, pwd); 
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={function (event) {
        startCreating();
        createAccount(event);
      }}
      className="input-form panel-shadow"
    >
      <h1 style={{ marginTop: "0px" }}>Log in</h1>
      <hr style={{ width: "10%" }} />
      <br />
      <div className="login-input">
        <span>Enter email:</span>
        <input
          style={{ width: "65%"}}
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="login-input">
        <span>Enter password:</span>
        <input
          style={{ width: "65%"}}
          type="password"
          value={pwd}
          id="pwd"
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>
      <br />
      <div className="centered">
        <button type="submit" className={isLoading ? "hidden" : ""}>
          Log in
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
