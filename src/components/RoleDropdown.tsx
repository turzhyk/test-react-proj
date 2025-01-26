import React, { useEffect, useState } from "react";
import { RoleTag } from "./RoleTag";
import { IRole } from "../store/RoleManager";
import { getRoles } from "../store/RoleManager";
import "../index.css";

export const RoleDropdown = (props: {
  x: number;
  y: number;
  current: number;
  cb?: CallableFunction
}) => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [selected, setSelected] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetch = async () => {
    let data = await getRoles();
    setRoles(data);
    setIsLoaded(true);
  };
  useEffect(() => {
    fetch();
    setSelected(props.current);
  }, []);
  const handleOpen = () => {
    setIsVisible(!isVisible);
  };
  const handleChange = (i: number) => {
    setSelected(i);
    if(props.cb)
        props.cb(roles[i].id);
    setIsVisible(false);
  };
  return (
    <ul className="dropdown" onClick={handleOpen}>
      <li className="dropdown-head centered">
        {isLoaded && <RoleTag key={selected} id={roles[selected].id} />}
      </li>
      {isVisible &&
        roles.map((item, index) => (
          <li onClick={() => handleChange(index)}>
            <div className="centered" >
              <RoleTag id={item.id} />
            </div>
          </li>
        ))}
    </ul>
  );
};
