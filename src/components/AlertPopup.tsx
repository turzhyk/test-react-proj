
import { time } from "console";
import React, { useEffect, useState } from "react";

export const AlertPopup = (props: {
  isVisible?: boolean;
  text: string;
  color?: string;
  timer?: number;
}) => {
  const [visible, setVisible] = useState(false);
  let colorTag = `popup panel-shadow ${visible ? "" : "popup-hidden"}`;
  if (props.color === "green") colorTag = `popup-created_event panel-shadow ${visible ? "" : "popup-created_event-hidden"}`;
  
  const waitTimeout = async () => {
    await timeout((props.timer||0)*1000);
    setVisible(false);
  };
  useEffect(()=>{
    setVisible(props.isVisible || false);
    if ((props.timer || props.timer!=0) && props.isVisible) waitTimeout();
  }, [props.isVisible])
  // waitTimeout();
  return (
    <div className={colorTag}>
      {props.text}
    </div>
  );
};
function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
