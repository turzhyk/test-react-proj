import React, { useEffect, useLayoutEffect, useState } from "react";
import { RoleTag } from "../components/RoleTag";
import "../index.css";
import { IRole, getRoles } from "../store/RoleManager";
import { RoleItem } from "../components/RoleItem";
import { isAdmin, getAuthUser } from "../store/UsersManager";
import { auth } from "../firebaseSetup";

export const Roles = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [updatedRoles, setUpdatedRoles] = useState(false);

  const fetch = async () => {
    let data = await getRoles();
    setRoles(data);
  };

  const handleChangeRoleParam = () => {
    fetch();
  };
  useEffect(() => {
    fetch();
    
  }, []);
  const getRolesList = (isAdmin: boolean) => {
    return isAdmin ? (
      roles !== undefined && (
        <div className="centered">
          <div className="roles-container">
            {roles !== undefined &&
              roles.map((item) => {
                return (
                  <RoleItem
                    id={item.id}
                    key={item.id}
                    cb={handleChangeRoleParam}
                  />
                );
              })}
          </div>
        </div>
      )
    ) : (
      <div className="centered roles-container">
        {roles !== undefined &&
          roles.map((item) => {
            return <RoleTag id={item.id} key={item.id} />;
          })}
      </div>
    );
  };
  return (
    <>
      <div className="centered">
        <h1>Roles:</h1>
      </div>
      {getRolesList(isAdmin(auth.currentUser?.uid || ""))}
    </>
  );
};
