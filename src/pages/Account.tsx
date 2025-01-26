import "../index.css";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import { auth, db } from "../firebaseSetup";
import { collection, getDoc } from "firebase/firestore";
import {
  getAuthUser,
  getUserData,
  isAdmin,
  updateUserData,
} from "../store/UsersManager";
import { getCompany, getCompanyIcon } from "../store/CompaniesManager";
import { strictEqual } from "assert";
import { accountFormReducer, INITIAL_STATE } from "../accountFormReducer";
import { useParams, useNavigate } from "react-router-dom";
import { RoleDropdown } from "../components/RoleDropdown";

const emojiRegex =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;

export function Account() {
  let { params } = useParams();
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editingField, setEditingField] = useState("");
  const [canSave, setCanSave] = useState(true);
  const [bioStyle, setBioStyle] = useState("");

  let id =
    params === undefined
      ? auth.currentUser
        ? auth.currentUser.uid
        : ""
      : params;
  const [companyIcon, setCompanyIcon] = useState("");

  const [userData, setUserData] = useReducer(accountFormReducer, INITIAL_STATE);

  const containEmoji = (target: string) => {
    const res = emojiRegex.test(target);
    return res;
  };
  const timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };
  const gettingData = async () => {
    setIsLoading(true);

    if (id === "") {
      await timeout(1200);
      if (auth.currentUser) {
        id = auth.currentUser.uid;
      } else {
        navigate("/");
      }
    }
    await getUserData(id).then((us) => {
      setUserData({
        type: "SET",
        payload: us,
      });
      updateCompanyIcon(us?.companyId);
      setIsLoading(false);
      setBioStyle(emojiRegex.test(us?.bio || "") ? "font-big" : "");
    });
  };
  useEffect(() => {
    gettingData();
  }, []);
  const handleChange = (e: any) => {
    setUserData({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const updateCompanyIcon = async (e: string | undefined) => {
    if (e === undefined) return;
    let icon = await getCompanyIcon(e);
    setCompanyIcon(icon);
  };

  const resetChanges = () => {
    gettingData();
  };
  const saveChanges = (e: any) => {
    let _id = id;
    if (_id === undefined) _id = "";
    if (userData.email === undefined) userData.email = "";
    updateUserData(_id, userData);

    setEditingField("");
  };
  const handleOnEdit = () => {
    console.log(userData.role);
    if (userData.uid === auth.currentUser?.uid || userData.role === "admin")
      setEditingField("all");
  };
  const hanldeRoleChange = useCallback((role: string) => {
    setUserData({
      type: "CHANGE_INPUT",
      payload: { name: "role", value: role },
    });
    let _id = id;
    if (_id === undefined) _id = "";
    updateUserData(_id, { role: role });
  }, []);
  const companyField = () => {
    return (
      <div className="panel-account-parameter" onClick={() => handleOnEdit}>
        <span className="account-editField">Company: </span>
        {editingField === "all" ? (
          <input
            style={{ width: "250px", marginRight: "-30px" }}
            type="text"
            name="companyId"
            value={userData.companyId}
            onChange={(e) => {
              handleChange(e);
              updateCompanyIcon(e.target.value);
            }}
          />
        ) : (
          <div
            style={{ flexGrow: "1", textAlign: "right", marginRight: "10px" }}
          >
            {userData.companyId}
          </div>
        )}
        <img
          className={"company-icon"}
          src={companyIcon}
          width="34"
          height="34"
        />
      </div>
    );
  };
  const bioField = () => {
    const bio = userData.bio;
    return (
      <div
        className="panel-account-parameter"
        onClick={() => setEditingField("all")}
      >
        <span className="account-editField">Bio: </span>
        {editingField === "all" ? (
          <textarea
            name="bio"
            value={userData.bio}
            rows={4}
            cols={50}
            onChange={handleChange}
          ></textarea>
        ) : (
          <div className={`account-bio ${bioStyle}`}>{userData.bio || "-"}</div>
        )}
      </div>
    );
  };
  const dobField = () => {
    return (
      <div
        className="panel-account-parameter"
        onClick={() => setEditingField("all")}
      >
        <span className="account-editField">Date of birth: </span>
        {editingField === "all" ? (
          <input
            style={{ width: "250px", marginRight: "0px" }}
            type="date"
            value={userData.dob}
            name="dob"
            onChange={handleChange}
          />
        ) : (
          <span>{userData.dob}</span>
        )}
      </div>
    );
  };
  return (
    <>
      {id === auth.currentUser?.uid ? <h1>My account</h1> : <h1>Account</h1>}

      <div className="panel-account panel-rounded panel-shadow">
        <img
          className="img-circle panel-shadow"
          src={userData.picUrl}
          width="128"
          height="128"
          onClick={handleOnEdit}
        />
        {editingField === "all" ? (
          <input
            style={{ width: "83%", marginLeft: "35px" }}
            type="text"
            value={userData.picUrl}
            name="picUrl"
            onChange={handleChange}
          />
        ) : (
          <></>
        )}
        {editingField === "all" ? (
          <div className="panel-account-topEdit">
            <div>
              <span
                className="account-editField text-align-left"
                style={{ marginLeft: "10px" }}
              >
                Name:
              </span>
              <input
                type="text"
                value={userData.name}
                style={{ width: "auto" }}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <span
                className=" account-editField text-align-left"
                style={{ marginLeft: "10px" }}
              >
                Surname:
              </span>
              <input
                type="text"
                value={userData.surname}
                style={{ width: "auto" }}
                name="surname"
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <h2 className="pointer" onClick={() => setEditingField("all")}>
            {userData.name} {userData.surname}
          </h2>
        )}
        <hr />
        <div className="panel-account-content">
          <div className="panel-account-parameter">
            <span className="account-editField">AuthID: </span>
            {userData.id}
          </div>
          <div className="panel-account-parameter">
            <span className="account-editField">Email: </span>
            {userData.email}
          </div>
          {companyField()}
          {dobField()}
          {bioField()}
          <br />
          <br />
        </div>
        {editingField !== "" ? (
          <div className="centered">
            <button
              className={canSave ? "" : "innactive"}
              onClick={saveChanges}
            >
              Save
            </button>
            <button
              className="red panel-shadow"
              onClick={() => {
                setEditingField("");
                resetChanges();
              }}
            >
              Revert
            </button>
          </div>
        ) : (
          <></>
        )}
        {isAdmin(getAuthUser()?.id || "") && (
          <RoleDropdown x={0} y={0} current={0} cb={hanldeRoleChange} />
        )}
      </div>
    </>
  );
}
