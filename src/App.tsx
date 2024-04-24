import React from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Constants from "./utils/constants";

function App() {
  return (
    <div className="App">
      {/* <GameGrid /> */}
      <Game gameDuration={Constants.gameDuration} />
    </div>
  );
}

export default App;
