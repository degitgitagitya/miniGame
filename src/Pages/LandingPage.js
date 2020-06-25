import React, { useState } from "react";
import { Link } from "react-router-dom";

import Icon from "../Components/Icon";

const LandingPage = () => {
  const [name, setName] = useState("");

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-5">
        <h3>Welcome</h3>
      </div>
      <div className="d-flex">
        <Icon></Icon>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Input Name"
          type="text"
          className="form-control w-25 mb-3"
        />
      </div>
      <div className="d-flex justify-content-center">
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          className="btn btn-info w-25"
          to={`/home?name=${name}`}
        >
          Start
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
