import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";

let socket;

const Home = ({ location, history }) => {
  const [welcome, setWelcome] = useState("");
  const [status, setStatus] = useState(0);
  const [result, setResult] = useState("");
  const [counterResult, setCounterResult] = useState(0);
  const [timer, setTimer] = useState(5);
  const [selected, setSelected] = useState("Random");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        socket.emit("disconnect");
        socket.off();
        history.push("/");
      }
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search, history]);

  useEffect(() => {
    socket.on("message", (message) => {
      setWelcome(message.text);
      setStatus(message.status);
    });
  }, [welcome]);

  useEffect(() => {
    socket.on("seeResult", (winner) => {
      if (winner !== null) {
        if (winner.id === socket.id) {
          setResult(1);
          setCounterResult(counterResult + 1);
        } else {
          setResult(0);
        }
      } else {
        setResult(2);
      }

      if (counterResult === 2) {
        socket.emit("finishMatch", socket.id);
      }
    });
  }, [result, counterResult]);

  useEffect(() => {
    socket.on("timer", ({ countDown }) => {
      setTimer(countDown);
    });
  }, [timer]);

  useEffect(() => {
    socket.on("exitMatch", () => {
      socket.emit("disconnect");
      socket.off();
      let temp;
      if (counterResult === 3) {
        temp = "Menang";
      } else {
        temp = "Kalah";
      }
      history.push(`/end?result=${temp}`);
    });
  }, [history, counterResult]);

  const triggerCalculate = (weapon) => {
    socket.emit("calculate", { weapon });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h3>
          Hello {name}, welcome to {room}
        </h3>
      </div>
      <div className="d-flex justify-content-center">
        {status === 0 ? (
          <h4>Waiting for another Player</h4>
        ) : (
          <div>
            <h2>Time limit: {timer} S</h2>
            <hr />
            You select {selected}
            <hr />
            <button
              onClick={() => {
                setSelected("Rock");
                triggerCalculate(0);
              }}
              className="btn btn-success mr-3"
            >
              Rock
            </button>
            <button
              onClick={() => {
                setSelected("Paper");

                triggerCalculate(1);
              }}
              className="btn btn-secondary mr-3"
            >
              Paper
            </button>
            <button
              onClick={() => {
                setSelected("Scissors");
                triggerCalculate(2);
              }}
              className="btn btn-dark mr-3"
            >
              Scissors
            </button>
            <hr />
            <div className="d-flex justify-content-center">
              <h3>
                You{" "}
                {result === 0 ? (
                  <span className="text-danger">Lose</span>
                ) : result === 1 ? (
                  <span className="text-success">Win</span>
                ) : (
                  <span className="text-warning">Draw</span>
                )}{" "}
                this round{" "}
              </h3>
            </div>
            <br />
            <h4>{counterResult}/3</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
