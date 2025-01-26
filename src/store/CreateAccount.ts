import React, { useState, useEffect, FormEvent } from "react";
import { auth, db } from "../firebaseSetup";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { allowedNodeEnvironmentFlags } from "process";

export const createAccount = async (
  event: FormEvent,
  email: string,
  pwd: string,
  name:string,
  surname:string,
) => {
  event.preventDefault();
  let err: string = "";
  try {
    await auth.createUserWithEmailAndPassword(email, pwd);
    addNewUserData(event, auth.currentUser?.uid, auth.currentUser?.email, name, surname);
    return true;
  } catch (e) {
    return false;
  }
};

const addNewUserData = async (
  e: FormEvent,
  userId: string | undefined,
  email: string | undefined | null,
  name: string,
  surname:string
) => {
  e.preventDefault();
  try {
    let id = auth.currentUser?.uid;
    if (id === undefined) id = "123";

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    const docRef = await setDoc(doc(db, "userData", id), {
      email: email,
      createDate: currentDate,
      name:name,
      surname:surname,
      picUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
