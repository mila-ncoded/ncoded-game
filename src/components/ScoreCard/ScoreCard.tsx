import React from "react";
import './ScoreCard.styles.scss';

type ScoreCardProps = {
  score: number;
  time: number;
};

const ScoreCard = ({ score = 0, time }: ScoreCardProps) => {
  return (
    <div className="game-score">
      {time}s remaining
    </div>
  );
};

export default ScoreCard;
