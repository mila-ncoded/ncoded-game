import React from "react";
import Button from "../Button/Button.component";
import "./StartScreen.styles.scss";

type StartScreenProps = {
  score: number;
  onStartGame: () => void;
};

const StartScreen = ({ score, onStartGame }: StartScreenProps) => (
  <div className="intro">
    <img src="glitch.gif" />
    <h1 className="title">{score > -1 ? "Game over!" : "Ncubed"}</h1>
    {score > -1 ? (
      <p className="description">
        {`You scored ${
          score === 0
            ? "nothing 💔"
            : `${score} ${score > 1 ? "points" : "point"}`
        }`}
      </p>
    ) : (
      <p className="description">Explore the memory cube and match the logos</p>
    )}
    <div className="action">
      <Button onClick={onStartGame} width={"wide"}>
        {score > -1 ? "Play again" : "Start Game"}
      </Button>
    </div>
  </div>
);

export default StartScreen;
