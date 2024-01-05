import "./App.css";
import { CardListProvider } from "./components/CardListProvider";
import { useState } from "react";
import { Stats } from "./components/Stats";

function App(): JSX.Element {
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

  return (
    <>
      <Stats currentScore={currentScore} bestScore={bestScore} />
      <CardListProvider
        currentScore={currentScore}
        bestScore={bestScore}
        setBestScore={setBestScore}
        setCurrentScore={setCurrentScore}
      />
      ;
    </>
  );
}

export default App;
