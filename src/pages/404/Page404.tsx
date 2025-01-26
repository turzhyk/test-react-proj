import React from "react";
import { useNavigate } from "react-router-dom";
import "./404.css";

export const Page404 = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page not found</h2>
      <a href="/">Return to home</a>
    </div>
  );
};
