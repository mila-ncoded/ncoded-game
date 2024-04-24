import React from "react";
import Button from "../Button/Button.component";
import "./StartScreen.styles.scss";

type StartScreenProps = {
  score: number;
  onStartGame: () => void;
  duration: number;
};

const StartScreen = ({ score, onStartGame, duration }: StartScreenProps) => (
  <div className="intro">
    <img src="falcon-logo.png" />
    <h1 className="title">
      {score > -1 ? "Game over!" : "Ncoded memory game"}
    </h1>
    {score > -1 ? (
      <p className="description">
        {`You scored ${
          score === 0 ? "nothing" : `${score} ${score > 1 ? "points" : "point"}`
        }`}
      </p>
    ) : (
      <p className="description">
        Test your memory and skills...
      </p>
    )}
    <div className="action">
      <Button onClick={onStartGame} width={"wide"}>
        {score > -1 ? "Play again" : "Start Game"}
      </Button>
    </div>
  </div>
);

export default StartScreen;
