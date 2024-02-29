import Header from "./Header";
import FetchCards from "./FetchCards";
import { useState } from "react";
import StartGame from "./StartGame";
import SeeRules from "./SeeRules";
import Countdown from "./Countdown";
import GameOver from "./GameOver";

function App() {
  const [started, setStarted] = useState(false);
  const [rules, setRules] = useState(false);
  const [finished, setFinished] = useState(false);
  const [checkHowManyCards, setCheckHowManyCards] = useState(1);
  const [finalScore, setFinalScore] = useState(0);

  return (
    <>
      <Header></Header>
      {!started && !rules && (
        <StartGame setStarted={setStarted} setRules={setRules} />
      )}
      {rules && <SeeRules setRules={setRules} />}
      {started && !finished && (
        <Countdown started={started} setFinished={setFinished} />
      )}
      {started && finished && checkHowManyCards > 0 && (
        <FetchCards setCheckHowManyCards={setCheckHowManyCards} setFinalScore={setFinalScore} />
      )}
      {checkHowManyCards === 0 && <GameOver finalScore={finalScore} setCheckHowManyCards={setCheckHowManyCards} setStarted={setStarted}/>}
    </>
  );
}

export default App;
