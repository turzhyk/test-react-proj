import React from "react";
import { getDocs, collection, setDoc, doc, arrayUnion, arrayRemove, updateDoc} from "firebase/firestore";
import { db } from "../firebaseSetup";
import { time } from "console";
import { decodedTextSpanIntersectsWith } from "typescript";
export interface IEvent {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  authorId: string;
  members: string[];
  location: string;
}
let events: IEvent[];
export const getEvents = async () => {
  await getEventData(undefined);
  return events;
};
const getEventData = async (id: string | undefined) => {
  const fetchPost = async () => {
    await getDocs(collection(db, "events")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        desc: doc.data().desc,
        date: doc.data().date,
        time: doc.data().time,
        authorId: doc.data().authorId,
        members: doc.data().members,
        location: doc.data().location
      }));
      events = newData.sort((obj1, obj2) => {
        const timeA = new Date(obj1.date + " " + obj1.time);
        const timeB = new Date(obj2.date + " " + obj2.time);
        return timeA.getTime() > timeB.getDate() ? 1 : -1;
      });
      // userModel = newData.find((el) => el.id === id);
    });
  };
  await fetchPost();
  if (id !== undefined) return events.find((el) => el.id === id);

};
export const addEvent = async (data: any) => {
  Object.keys(data).forEach((key) =>
    data[key] === undefined ? delete data[key] : {}
  );
  const today = new Date().getTime();
  await setDoc(doc(db, "events", today.toString()), data);
};
export const addMember = async(user:string, event:string) =>
{
  const docRef = doc(db, 'events', event);
  await updateDoc(docRef, {members: arrayUnion(user)});
}
export const removeMember = async(user:string, event:string) =>{
  const docRef = doc(db, 'events', event);
  await updateDoc(docRef, {members: arrayRemove(user)});
}
