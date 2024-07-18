import { useContext, useRef, useState } from "react";
import "./game.css";
import { TurnContext } from "./App";
import { Link } from "react-router-dom";
export default function GameContainer() {
  return (
    <div className="container-game center">
      <div className="start-header">
        <Link to="/" className="back">
          <button>Back</button>
        </Link>
      </div>
      <div className="container">
        <div className="row1 row">
          <Box row={0} col={0}></Box>
          <Box row={0} col={1}></Box>
          <Box row={0} col={2}></Box>
        </div>
        <div className="row2 row">
          <Box row={1} col={0}></Box>
          <Box row={1} col={1}></Box>
          <Box row={1} col={2}></Box>
        </div>
        <div className="row3 row">
          <Box row={2} col={0}></Box>
          <Box row={2} col={1}></Box>
          <Box row={2} col={2}></Box>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Box({ row, col }) {
  const { type, setType, board, setBoard } = useContext(TurnContext);
  const btn = useRef(null);
  function handleClick(row, col) {
    if (!CheckWin(board)) {
      if (board[row][col] === "") {
        const newBoard = board.map((rowArr, rowIndex) =>
          rowArr.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? type : cell
          )
        );

        setBoard(newBoard);
        setType(type === "X" ? "O" : "X");
        CheckWin(newBoard);
      }
    }
  }
  return (
    <button className="Box" ref={btn} onClick={() => handleClick(row, col)}>
      {board[row][col]}
    </button>
  );
}
function Footer() {
  const {
    board,
    setBoard,
    setType,
    name1,
    name2,
    setScore1,
    score1,
    score2,
    setScore2,
  } = useContext(TurnContext);
  function checkWinner() {
    if (CheckWin(board) == "X") {
      setScore1((score) => score + 1);
    } else if (CheckWin(board) == "O") {
      setScore2((score) => score + 1);
    }
  }
  return (
    <div className="Footer">
      {CheckWin(board) == "X" || CheckWin(board) == "O"
        ? `${CheckWin(board) == "X" ? name1 : name2} wins`
        : ""}
      {CheckWin(board) == "draw" ? "Draw" : ""}
      {CheckWin(board) ? (
        <div>
          <button
            onClick={() => {
              setBoard([
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
              ]);
              setType("X");
              checkWinner();
            }}
            className="button"
          >
            PlayAgain
          </button>
          <button
            onClick={() => {
              setScore1(0);
              setScore2(0);
              setBoard([
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
              ]);
            }}
            className="button"
          >
            Restart
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="scores">
        <div className="score1">
          {name1}'s (X) score: {score1}
        </div>
        <div className="score2">
          {name2}'s (O) score: {score2}
        </div>
      </div>
    </div>
  );
}
function CheckWin(board) {
  const winningCombinations = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return board[a[0]][a[1]];
    }
  }
  if (board.flat().every((cell) => cell !== "")) {
    return "draw";
  }
  return null;
}
