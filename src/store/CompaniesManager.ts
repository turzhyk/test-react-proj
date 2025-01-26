import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseSetup";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  where,
  query,
  getDoc,
  Firestore,
  getDocFromServer,
} from "firebase/firestore";

export const getCompany = async (id: string) => {
  if (id === undefined || id.length===0) id = "default";
  const ref = await getDoc(doc(db, "companies", id));
  return ref;
};
export const getCompanyIcon = async (id: string) => {
  const doc = await getCompany(id);
  let res = "https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png";
  if (doc.data() !== undefined) res = doc.data()?.picture;
  return res;
};
