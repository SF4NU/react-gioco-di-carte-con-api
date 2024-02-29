import Header from "./Header";
import FetchCards from "./FetchCards";
import { useState } from "react";
import StartGame from "./StartGame";
import SeeRules from "./SeeRules";
import Countdown from "./Countdown";

function App() {

  const [started, setStarted] = useState(false)
  const [rules, setRules] = useState(false)
  const [finished, setFinished] = useState(false)

  return (
    <>
      <Header></Header>
      {!started && !rules && <StartGame setStarted={setStarted} setRules={setRules}/>}
      {rules && <SeeRules setRules={setRules}/>}
      {started && !finished && <Countdown started={started} setFinished={setFinished}/>}
      {started && finished && <FetchCards/>}
    </>
  );
}

export default App;
