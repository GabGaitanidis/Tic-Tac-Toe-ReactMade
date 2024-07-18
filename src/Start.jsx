import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TurnContext } from "./App";
import "./start.css";
export default function Start() {
  const { name1, name2, setName1, setName2 } = useContext(TurnContext);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  function handleChange1(e) {
    setValue(e.target.value);
    setName1(e.target.value);
  }

  function handleChange2(e) {
    setValue2(e.target.value);
    setName2(e.target.value);
  }
  function hanldeNames() {
    if (name1 == "" || name2 == "") {
      alert("put a name please");
    }
  }
  return (
    <div className="container-start">
      <div className="h1">
        <h1>Tic-Tac-Toe</h1>
      </div>
      <Link to={name1 && name2 ? "game" : ""} className="start">
        <button onClick={hanldeNames}>Start</button>
      </Link>
      <div className="name-area">
        <div>
          <label>
            Player 1:
            <input
              type="text"
              placeholder="name..."
              value={value}
              onChange={handleChange1}
            />
          </label>
          <div className="player">Player 1(X): {name1}</div>
        </div>
        <div>
          <label>
            Player 2:
            <input
              type="text"
              placeholder="name..."
              value={value2}
              onChange={handleChange2}
            />
            <div className="player">Player 2(O): {name2}</div>
          </label>
        </div>
      </div>
    </div>
  );
}
