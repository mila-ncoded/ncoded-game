import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  useCallback,
} from "react";
import shuffle from "./utils/shuffle";
import Constants from "../../utils/constants";

import "./GameGrid.styles.scss";
import Card from "../Card";

type CardState = {
  index: number | null;
  value: number | null;
};

type GameGridProps = {
  setScore: (mov: number) => void;
  endGame: () => void;
};

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const allItems = shuffle([...items, ...items]);

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
const chunkedItems = chunkArray(allItems, 4);

const defaultState: CardState = {
  index: null,
  value: null,
};

interface RotationState {
  x: number;
  y: number;
}

const GameGrid = ({ setScore, endGame }: GameGridProps) => {
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

  // Cube's logic:
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: -30, y: -45 });
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotateRef = useRef<NodeJS.Timer | number | null>();

  const handleInteractionStart = () => {
    console.log("clear ");
    clearInterval(Number(rotateRef.current)); // Stop rotation when user interacts
  };

  useEffect(() => {
    rotateRef.current = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: prev.y + 1, // Adjust this value for different speed or direction
      }));
    }, 100); // Adjust interval for smoother or faster rotation

    return () => clearInterval(Number(rotateRef.current));
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    handleInteractionStart();
    e.preventDefault();
    setIsDragging(true);
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    console.log("aaa");
    const dx = e.clientX - lastMousePosition.current.x;
    const dy = e.clientY - lastMousePosition.current.y;
    setRotation((rotation) => ({
      x: rotation.x - dy * 0.5, // Adjust rotation sensitivity here
      y: rotation.y + dx * 0.5,
    }));
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    console.log("stop up");
    setIsDragging(false);
  };

  useEffect(() => {
    if (remainingCards.length <= 0) endGame();
  }, [remainingCards.length]);

  return (
    <div className="game-grid">
      <div className="game-grid__header">
        <p>Remaining cards:</p>
        <div className="game-grid__remaining">
          {remainingCards.map((card, index) => (
            <img
              key={`${card}_${index}`}
              alt={`ncoded logo ${index}`}
              src={`ncoded${card}.png`}
            />
          ))}
        </div>
      </div>
      <div className="game-grid__cube">
        <div
          className="cube"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          
          onPointerDown={handleMouseDown}
          onPointerMove={handleMouseMove}
          onPointerUp={handleMouseUp}
          onPointerLeave={handleMouseUp}

          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          <div className="face front">
            <div className="game-grid__cards-container">
              {chunkedItems[0].map((item, index) => {
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
          </div>
          <div className="face back">
            <div className="game-grid__cards-container">
              {chunkedItems[1].map((item, index) => {
                return (
                  <Card
                    index={index + 1 * 4}
                    firstCardIndex={firstCard?.index}
                    secondCardIndex={secondCard?.index}
                    remainingCards={remainingCards}
                    item={item}
                    handleClick={handleClick}
                  />
                );
              })}
            </div>
          </div>
          <div className="face right">
            <div className="game-grid__cards-container">
              {chunkedItems[2].map((item, index) => {
                return (
                  <Card
                    index={index + 2 * 4}
                    firstCardIndex={firstCard?.index}
                    secondCardIndex={secondCard?.index}
                    remainingCards={remainingCards}
                    item={item}
                    handleClick={handleClick}
                  />
                );
              })}
            </div>
          </div>
          <div className="face left">
            <div className="game-grid__cards-container">
              {chunkedItems[3].map((item, index) => {
                return (
                  <Card
                    index={index + 3 * 4}
                    firstCardIndex={firstCard?.index}
                    secondCardIndex={secondCard?.index}
                    remainingCards={remainingCards}
                    item={item}
                    handleClick={handleClick}
                  />
                );
              })}
            </div>
          </div>
          <div className="face top">
            <div className="game-grid__cards-container">
              {chunkedItems[4].map((item, index) => {
                return (
                  <Card
                    index={index + 4 * 4}
                    firstCardIndex={firstCard?.index}
                    secondCardIndex={secondCard?.index}
                    remainingCards={remainingCards}
                    item={item}
                    handleClick={handleClick}
                  />
                );
              })}
            </div>
          </div>
          <div className="face bottom">
            <div className="game-grid__cards-container">
              {chunkedItems[5].map((item, index) => {
                return (
                  <Card
                    index={index + 5 * 4}
                    firstCardIndex={firstCard?.index}
                    secondCardIndex={secondCard?.index}
                    remainingCards={remainingCards}
                    item={item}
                    handleClick={handleClick}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="game-grid__results">
        <div>Moves used: {moves}</div>
        <div>Matches: {Constants.gameCells - remainingCards.length}</div>
      </div>
    </div>
  );
};

export default GameGrid;
