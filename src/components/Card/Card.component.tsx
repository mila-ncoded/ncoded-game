import React from "react";
import './Card.styles.scss';

type CardProps = {
    index: number;
    firstCardIndex: number | null;
    secondCardIndex: number | null;
    remainingCards: number[];
    item: number;
    handleClick: (index: number, item: number) => void;
};

const Card = ({ index, firstCardIndex, secondCardIndex, remainingCards, item, handleClick }: CardProps) => {
  return (
    <div
      key={index}
      className={`card ${
        (firstCardIndex === index ||
          secondCardIndex === index ||
          !remainingCards.includes(item)) &&
        "flipped"
      }`}
      onClick={() => handleClick(index, item)}
    >
      <div className="back-side"></div>
      <img alt={`ncoded ${index}`} src={`ncoded${item}.png`} />
    </div>
  );
};

export default Card;