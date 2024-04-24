import React from "react";
import './ScoreCard.styles.scss';

type ScoreCardProps = {
  score: number;
  time: number;
};

const ScoreCard = ({ score, time }: ScoreCardProps) => {
  return (
    <div className="game-score">
      {score} matches / {time}s remaining
    </div>
  );
};

export default ScoreCard;
