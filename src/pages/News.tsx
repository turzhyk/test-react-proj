import "../index.css";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseSetup";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { RoleTag } from "../components/RoleTag";
import {
  getUsers,
  getAuthUser,
  removeUser,
  isAdmin,
  IUser,
} from "../store/UsersManager";
import { secureHeapUsed } from "crypto";

interface IListUser {
  id: string;
  name: string;
  surname: string;
  picUrl: string;
  company: string;
  role: string;
}
export function News() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userSortType, setUserSortType] = useState("name");
  const [userSortDir, setUserSortDir] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      let dbUsers = await getUsers();
      setUsers(dbUsers);
      setIsLoading(false);
    };
    fetchPost();
  }, []);

  const onUserRemove = (id: string) => {
    if (window.confirm("Do you want to remove user " + id + "?")) {
      setUsers(users.filter((usr) => usr.id != id));
      removeUser(id);
    }
  };
  const removeBtn = (id: string) => {
    if (isAdmin(auth.currentUser?.uid || "") && id !== auth.currentUser?.uid)
      return (
        <div className="btn-remove_user" onClick={() => onUserRemove(id)}>
          Remove
        </div>
      );
    else return <></>;
  };
  const getUserList = () => {
    if (users === undefined) return "";
    users.sort((obj1, obj2) =>
      obj1.name.toLowerCase() > obj2.name.toLowerCase() ? 1 : -1
    );
    return users.map((user, index) => (
      <div key={user.id} className={`panel-new_user panel-shadow`}>
        <img src={user.picUrl} width="48" height="48" />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="panel-user-name"
            onClick={() => navigate("/account/" + user.id)}
          >
            <div>
              {user.name + " " + user.surname}
              {auth.currentUser?.uid === user.id ? " (you)" : ""}
            </div>
            <span className="panel-user-company">{user.companyId}</span>
          </div>
          <div style={{ height: "100%", width: "auto" }}>
            {user.role && (
              <div style={{ marginBottom: "12px" }}>
                <RoleTag id={user.role} />
              </div>
            )}
            {removeBtn(user.id)}
          </div>
        </div>
      </div>
    ));
  };
  const loadUsers = () => {
    return isLoading ? "loading" : getUserList();
  };
  const changeSortType = (e: string) => {
    setUserSortType(e);
    switch (e) {
      case "name":
        setUsers(
          users.sort((obj1, obj2) =>
            obj1.name.toLowerCase() > obj2.name.toLowerCase() ? 1 : -1
          )
        );
        console.log("sort by name");
        break;
      case "date":
        setUsers(
          users.sort((obj1, obj2) => {
            if (obj1.name > obj2.name) {
              return -1 * userSortDir;
            }
            if (obj1.name < obj2.name) {
              return 1 * userSortDir;
            }
            return 0;
          })
        );
        break;
      default:
        break;
    }
  };
  //   fetchPost();
  if (auth.currentUser == null) return <h1>You must be logged in</h1>;
  else
    return (
      <div className="new_users">
        <h1 className="centered">New users:</h1>
        <div className="users-sort-panel">
          <span style={{ marginRight: "10px" }}>sort by: </span>
          <span
            className={`users-sort-option ${
              userSortType === "name" ? "users-sort-option-active" : "pointer"
            }`}
            onClick={() => changeSortType("name")}
          >
            Name
          </span>
          <span
            className={`users-sort-option ${
              userSortType === "date" ? "users-sort-option-active" : "pointer"
            }`}
            onClick={() => changeSortType("date")}
          >
            Add date
          </span>
        </div>
        <div className="new_users-content">{loadUsers()}</div>
      </div>
    );
}
