import React from "react";
import Game from "./components/Game/Game";
import Constants from "./utils/constants";

import "./App.css";

function App() {
  return <Game gameDuration={Constants.gameDuration} />;
}

export default App;
