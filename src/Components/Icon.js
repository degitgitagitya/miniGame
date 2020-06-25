import React from "react";

import "./Icon.css";

const Icon = () => {
  return (
    <div className="pokemon">
      <div className="head">
        <div className="eye-container"></div>
        <div className="eye"></div>
        <div className="inner-eye"></div>
        <div className="inner-eye-white"></div>
        <div className="nose"></div>
        <div className="nose-2"></div>
        <div className="nose-3"></div>
        <div className="nose-4"></div>
        <div className="upper-mouth"></div>
        <div className="mouth"></div>
      </div>
      <div className="body">
        <div className="chest-main"></div>
        <div className="chest"></div>
        <div className="chest-2"></div>
        <div className="right-hand"></div>
        <div className="stomach"></div>
        <div className="stomach-2"></div>
      </div>
      <div className="cape"></div>
      <div className="cape-2"></div>
      <div className="cape-3"></div>
      <div className="left-hand"></div>
      <div className="leg"></div>
      <div className="leg-2"></div>
    </div>
  );
};

export default Icon;
