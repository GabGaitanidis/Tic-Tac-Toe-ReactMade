import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from "./Start";
import GameContainer from "./Game";
import { createContext, useState } from "react";
export const TurnContext = createContext();
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "game",
    element: <GameContainer />,
  },
]);
function App() {
  const [type, setType] = useState("X");
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  return (
    <TurnContext.Provider
      value={{
        type,
        setType,
        board,
        setBoard,
        name1,
        setName1,
        name2,
        setName2,
        score1,
        setScore1,
        score2,
        setScore2,
      }}
    >
      <RouterProvider router={routes} />
    </TurnContext.Provider>
  );
}

export default App;
