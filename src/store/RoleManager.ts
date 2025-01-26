import React from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseSetup";
import { convertToObject } from "typescript";
import { doc, updateDoc } from "firebase/firestore";

export interface IRole {
  id: string;
  bgColor: string;
  color: string;
}
let roles: IRole[];
let loadedRoles = false;

const getRolesData = async () => {
  const fetchPost = async () => {
    await getDocs(collection(db, "roles")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        bgColor: doc.data().bgColor,
        color: doc.data().color,
      }));
      roles = newData;
    });
  };
  await fetchPost();
};
getRolesData();
export const getRoles = async () =>{
  if (!loadedRoles) {
   await getRolesData();                  //         TURN THAT ON
  }
  return roles;
}
export const getRole = async (id: string) => {
  if (!loadedRoles) {
    // await getRolesData();
    // loadedRoles = true;
  }
  return roles.find((el) => el.id === id);
};
export const updateRole = async (id:string, data:{bgColor?:string, color?:string}) =>{
  const index = roles.findIndex(item => item.id === id);
  roles[index].bgColor = data.bgColor || roles[index].bgColor;
  roles[index].color = data.color || roles[index].color;

  const a = await updateDoc(doc(db, "roles", id), data);
  // console.log(data.bgColor);
}
