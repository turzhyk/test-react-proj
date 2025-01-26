import React, { useEffect, useLayoutEffect } from "react";
import { getRole, IRole } from "../store/RoleManager";
import { useState } from "react";
export const RoleTag = (props: {
  id: string;
  cb?: CallableFunction;
  handler?: CallableFunction;
}) => {
  const [state, setState] = useState({ id: "", bgColor: "", color: "" });
  const [isLoading, setIsLoading] = useState(true);

  const fetchRole = async (sendStyle?: boolean) => {
    setIsLoading(true);
    await getRole(props.id).then((role) => {
      setState({
        id: role?.id || "",
        bgColor: role?.bgColor || "",
        color: role?.color || "",
      });
      // when the tag is initialized, sends it's colors to the hodler
      if (props.cb && sendStyle)
        props.cb({ bgColor: role?.bgColor, color: role?.color }); 
    });
    setIsLoading(false);
  };
  useLayoutEffect(() => {
    fetchRole(true);
    console.log("Init");
  }, []);
  // rerenders (gets a new role style data) whenever the holder's states are changed
  useEffect(() => { 
    fetchRole();
  }, [props.handler]);

  return (
    <>
      {!isLoading && (
        <span
          className="role-tag"
          style={{ backgroundColor: state.bgColor, color: state.color }}
        >
          {state.id}
        </span>
      )}
    </>
  );
};
