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
} from "firebase/firestore";
import { create } from "domain";
import { async } from "@firebase/util";
import { isNamedExportBindings } from "typescript";

export interface IUser {
  id: string;
  name: string;
  surname: string;
  picUrl: string;
  email: string;
  companyId: string;
  bio: string;
  dob: string;
  role: string;
  createDate: string;
  isRemoved: boolean;
}
export const getAuthUser = () => {
  return users.find((el) => el.id === auth.currentUser?.uid);
};
export const isAdmin = (id: string) => {
  if (users) return users.find((el) => el.id === id)?.role === "admin";
  else return false;
};
let users: IUser[];
let isUsersUpdated: boolean;
export const getUsers = async () => {
  await getUserData(undefined);
  return users;
};
export const getUser = (id: string) => {
  if (users) return users.find((item) => item.id === id);
  else return undefined;
};
export const getUserData = async (id: string | undefined) => {
  const fetchPost = async () => {
    await getDocs(collection(db, "userData")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        // ...doc.data(),
        id: doc.id,
        email: doc.data().email,
        name: doc.data().name,
        surname: doc.data().surname,
        picUrl: doc.data().picUrl,
        companyId: doc.data().companyId,
        bio: doc.data().bio,
        dob: doc.data().dob,
        role: doc.data().role,
        createDate: doc.data().createDate,
        isRemoved: doc.data().isRemoved,
      }));
      users = newData.filter((el) => !el.isRemoved);
      isUsersUpdated = true;
      // userModel = newData.find((el) => el.id === id);
    });
  };
  await fetchPost();
  if (id !== undefined) return users.find((el) => el.id === id);
};
export const updateUserData = async (userUID: string, data: any) => {
  Object.keys(data).forEach((key) =>
    data[key] === undefined ? delete data[key] : {}
  );
  isUsersUpdated = false;
  const a = await updateDoc(doc(db, "userData", userUID), data);
};
export const removeUser = async (userUID: string) => {
  users = users.filter((el) => !el.isRemoved);
  await updateUserData(userUID, { isRemoved: true });
};
