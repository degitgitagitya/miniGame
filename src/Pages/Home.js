import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";

let socket;

const Home = ({ location }) => {
  const [name, setName] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);

    socket.emit("join", { name });
  }, [ENDPOINT, location.search]);

  return <div className="container">Home</div>;
};

export default Home;
