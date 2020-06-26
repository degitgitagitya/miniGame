import React, { useState, useEffect } from "react";
import queryString from "query-string";

const End = ({ location, history }) => {
  const [result, setResult] = useState("");
  useEffect(() => {
    const { result } = queryString.parse(location.search);

    setResult(result);

    return () => {};
  }, [location.search]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h3>Kamu {result}</h3>
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-info"
        >
          Keluar
        </button>
      </div>
    </div>
  );
};

export default End;
