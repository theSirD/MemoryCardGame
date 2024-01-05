type PropsType = {
  currentScore: number;
  bestScore: number;
};

export const Stats = ({ currentScore, bestScore }: PropsType): JSX.Element => {
  return (
    <div className="stats">
      <div className="current-score">
        <p>Current score</p>
        <p>{currentScore}</p>
      </div>
      <div className="best-score">
        <p>Best score</p>
        <p>{bestScore}</p>
      </div>
    </div>
  );
};
