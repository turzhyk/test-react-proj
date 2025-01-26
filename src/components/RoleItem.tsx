import React, { useCallback } from "react";
import { RoleTag } from "./RoleTag";
import { updateRole } from "../store/RoleManager";
import { useState } from "react";
import { time } from "console";
export const RoleItem = (props: { id: string; cb: CallableFunction }) => {
  const [state, setState] = useState({ bgColor: "", color: "" });

  const roleTagCallback = (data: { bgColor: string; color: string }) => {
    setState(data);
  };
  const handleColorChange = (e: any) => {
    setState({ color: e.target.value, bgColor: state.bgColor });
    updateRole(props.id, { color: e.target.value });
    // props.cb();
    changeHandler();
  };
  const changeHandler = useCallback(() => {}, [state]);
  const handleBgChange = (e: any) => {
    setState({ bgColor: e.target.value, color: state.color });
    updateRole(props.id, { bgColor: e.target.value });
    changeHandler();
  };
  return (
    <div className="panel-role panel-shadow">
      <div className="panel-role-container">
        <RoleTag id={props.id} cb={roleTagCallback} handler={changeHandler} />{" "}
        {/*key={state.bgColor+state.color} */}
      </div>
      <br />
      <div className="panel-role-container panel-role-input">
        <label htmlFor="bgColor">Background color</label>
        <input
          className="input-color"
          type="color"
          value={state.bgColor}
          name="bgColor"
          onChange={handleBgChange}
        />
      </div>
      <div className="panel-role-container panel-role-input">
        <label htmlFor="color">Text color</label>
        <input
          className="input-color"
          type="color"
          value={state.color}
          name="color"
          onChange={handleColorChange}
        />
      </div>
      <div className="panel-role-container panel-role-input">
        <label htmlFor="isAdmin">Is admin</label>
        <input className="" type="checkbox" name="bgColor" />
      </div>
      <div className="panel-role-container panel-role-input">
        <label htmlFor="isAdmin">Can modify users data</label>
        <input className="" type="checkbox" name="bgColor" />
      </div>
      <div className="panel-role-container panel-role-input">
        <label htmlFor="isAdmin">Can modify roles </label>
        <input className="" type="checkbox" name="bgColor" />
      </div>
      <div className="panel-role-container panel-role-input">
        <label htmlFor="isAdmin">Can delete events</label>
        <input className="" type="checkbox" name="bgColor" />
      </div>
    </div>
  );
};
