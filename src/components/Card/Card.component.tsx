import React from "react";
import classNames from "classnames";

import "./Card.styles.scss";

type CardProps = {
  index: number;
  firstCardIndex: number | null;
  secondCardIndex: number | null;
  remainingCards: number[];
  item: number;
  handleClick: (index: number, item: number) => void;
};
const Card = (props: CardProps) => {
  const {
    index,
    item,
    handleClick,
    firstCardIndex,
    secondCardIndex,
    remainingCards,
  } = props;

  const classes = classNames([
    "ng-cube",
    {
      "ng-cube--flipped":
        firstCardIndex === index ||
        secondCardIndex === index ||
        !remainingCards.includes(item),
    },
  ]);

  return (
    <div
      className={classes}
      onClick={() => handleClick(index, item)}>
      <div className={classNames(["ng-cube__side", "ng-cube__side__front"])}>
        <img
          alt="falcon"
          src="back.png"
        />
      </div>
      {/* <div className={classNames(["ng-cube__side", "ng-cube__side__right"])} /> */}
      <div className={classNames(["ng-cube__side", "ng-cube__side__back"])}>
        <img
          alt={`ncoded ${index}`}
          src={`ncoded${item}.png`}
        />
      </div>
      {/* <div className={classNames(["ng-cube__side", "ng-cube__side__left"])} /> */}
      {/* <div className={classNames(["ng-cube__side", "ng-cube__side__up"])} /> */}
      {/* <div className={classNames(["ng-cube__side", "ng-cube__side__down"])} /> */}
    </div>
  );
};

export default Card;
