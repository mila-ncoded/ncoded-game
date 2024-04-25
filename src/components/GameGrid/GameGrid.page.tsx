import React, { useState, useRef, useEffect } from "react";
import shuffle from "./utils/shuffle";
import Constants from "../../utils/constants";
import Card from "../Card/Card.component";

import "./GameGrid.styles.scss";

type CardState = {
  index: number | null;
  value: number | null;
};

type GameGridProps = {
  setScore: (mov: number) => void;
};

const items = [1, 2, 3, 4, 5, 6, 7, 8];
const allItems = shuffle([...items, ...items]);
const defaultState: CardState = {
  index: null,
  value: null,
};

const GameGrid = ({ setScore }: GameGridProps) => {
  const [firstCard, setFirstCard] = useState<CardState>(defaultState);
  const [secondCard, setSecondCard] = useState<CardState>(defaultState);
  const [remainingCards, setRemainingCards] = useState<number[]>(items);
  const [moves, setMoves] = useState<number>(0);

  const timer = useRef<NodeJS.Timer | number | null>(null);

  const handleClick = (index: number, value: number) => {
    if (
      firstCard.index === null ||
      (firstCard.index !== null && secondCard.index !== null)
    ) {
      setSecondCard(defaultState);
      setFirstCard({ index, value });
      setMoves((prev) => prev + 1);
    } else if (secondCard.index === null && firstCard.index !== index) {
      setSecondCard({ index, value });
      setMoves((prev) => prev + 1);

      if (firstCard.value === value) {
        setTimeout(
          () =>
            setRemainingCards(remainingCards.filter((card) => card !== value)),
          500
        );
      }
    }
  };

  useEffect(() => {
    if (moves > -1) {
      setScore(Constants.gameCells - remainingCards.length);
    }
  }, [moves, remainingCards.length, setScore]);

  useEffect(() => {
    if (
      firstCard.index !== undefined &&
      firstCard.index !== null &&
      secondCard.index !== undefined &&
      secondCard.index !== null
    ) {
      timer.current = setTimeout(() => {
        setFirstCard(defaultState);
        setSecondCard(defaultState);
      }, 1000);
    }
  }, [firstCard, secondCard]);

  return (
    <div className="game-grid">
      {remainingCards.length > 0 ? "Remaining cards: " : "Victory!"}
      <div className="game-grid__remaining">
        {remainingCards.map((card, index) => {
          return (
            <img
              key={index}
              alt={`ncoded ${index}`}
              src={`ncoded${card}.png`}
            />
          );
        })}
      </div>
      <div className="game-grid__cards-container">
        {allItems.map((item, index) => {
          return (
            <Card
              index={index}
              firstCardIndex={firstCard?.index}
              secondCardIndex={secondCard?.index}
              remainingCards={remainingCards}
              item={item}
              handleClick={handleClick}
            />
          );
        })}
      </div>
      Moves used: {moves}
    </div>
  );
};

export default GameGrid;
