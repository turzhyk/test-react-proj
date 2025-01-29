import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../firebaseSetup";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../store/UsersManager";
import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  //   let logText: string = "logged out";
  let [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();
  const getDisplayName = async () => {
    if (auth.currentUser != null) {
      const userData = await getUserData(auth.currentUser.uid);
      let val = "";
      val += userData?.name !== undefined ? userData?.name : "";
      val += " ";
      val += userData?.surname !== undefined ? userData?.surname : "";
      setDisplayName(val);
    }
  };
  const logText = () => {
    if (auth.currentUser != null) {
      getDisplayName();
      return (
        <>
          logged in as{" "}
          <span className="text-blue text-bold">{displayName}</span>
        </>
      );
    } else return <>logged out</>;
  };
  const signOut = async () => {
    await auth.signOut();
    window.location.reload();
  };
  const signInLink = () => {
    navigate("/login");
  };

  const signoutButton = () => {
    if (auth.currentUser != null) {
      return (
        <button className="button-signout" onClick={signOut}>
          Sign out
        </button>
      );
    } else {
      return (
        <button className="button-signout" onClick={signInLink}>
          Log in
        </button>
      );
    }
  };
  return (
    <div className="header-holder">
      <div className="header">
        <span className="header-left">
          <Link to="/" className="header-button">
            <div
              className={
                location.pathname === "/" ? "text-extraBold key_color" : ""
              }
            >
              Home
            </div>
          </Link>
          <div className="header-separator"></div>
          <Link to="/users" className="header-button">
            <div
              className={
                location.pathname === "/users" ? "text-extraBold key_color" : ""
              }
            >
              Users
            </div>
          </Link>
          <div className="header-separator"></div>
          <Link to="/sign_in" className="header-button">
            <div
              className={
                location.pathname === "/sign_in"
                  ? "text-extraBold key_color"
                  : ""
              }
            >
              Join
            </div>
          </Link>
          <div className="header-separator"></div>
          <Link to="/events" className="header-button">
            <div
              className={
                location.pathname === "/events"
                  ? "text-extraBold key_color"
                  : ""
              }
            >
              Events
            </div>
          </Link>
          <div className="header-separator"></div>
          <Link to="/my-account" className="header-button">
            <div
              className={
                location.pathname === "/my-account"
                  ? "text-extraBold key_color"
                  : ""
              }
            >
              Account
            </div>
          </Link>
          <div className="header-separator" style={{display: "none"}}></div>
          <Link to="/roles" className="header-button" style={{display: "none"}}>
            <div
              className={
                location.pathname === "/roles" ? "text-extraBold key_color" : ""
              }
            >
              Roles
            </div>
          </Link>
        </span>
        <span className="header-right">
          <div>{signoutButton()}</div>
          <div className="header-separator"></div>
          <div className="header-login">{logText()}</div>
        </span>
      </div>
    </div>
  );
}
