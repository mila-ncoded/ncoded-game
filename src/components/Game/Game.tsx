import React, { useState, useRef, useEffect } from "react";
import GameGrid from "../GameGrid/GameGrid.page";
import ScoreCard from "../ScoreCard/ScoreCard";
import Button from "../Button/Button.component";
import StartScreen from "../StartScreen/StartScreen.page";

import "./Game.styles.scss";

type GameProps = {
  gameDuration: number;
};

const Game = ({ gameDuration }: GameProps) => {
  const [score, setScore] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStopped, setGameStopped] = useState(false);

  const timerRef = useRef<NodeJS.Timer | number | null>(null);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeRemaining(gameDuration);
    setGameStopped(false);
  };

  const stopGame = () => {
    setGameStarted(false);
    setGameStopped(true);
  };

  useEffect(() => {
    if (gameStarted && !gameStopped) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => {
          if (prevTimeRemaining > 0) {
            return prevTimeRemaining - 1;
          } else {
            clearInterval(Number(timerRef.current));
            setGameStarted(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(Number(timerRef.current));
    };
  }, [gameStarted, gameStopped]);

  const handleSetScore = (value: number) => {
    setScore(value);
  };

  return (
    <div className="game-container">
      {(!gameStarted || gameStopped) && (
        <StartScreen
          score={score}
          onStartGame={startGame}
        />
      )}
      {gameStarted && !gameStopped && (
        <div>
          <div className="game-nav">
            <h1 className="game-title">Ncoded memory game</h1>
            <div className="game-settings">
              <ScoreCard
                score={score}
                time={timeRemaining}
              />
              <Button
                type={"alert"}
                onClick={stopGame}
                width="wide">
                Stop
              </Button>
            </div>
          </div>
          <GameGrid setScore={handleSetScore} />
        </div>
      )}
    </div>
  );
};

export default Game;
