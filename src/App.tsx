import React from "react";
import Game from "./components/Game/Game";
import Constants from "./utils/constants";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Game gameDuration={Constants.gameDuration} />
    </div>
  );
}

export default App;
