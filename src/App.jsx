import Header from "./Header";
import FetchCards from "./FetchCards";
import { useState } from "react";
import PlayGame from "./PlayGame";
import StartGame from "./StartGame";
import SeeRules from "./SeeRules";

function App() {

  const [started, setStarted] = useState(false)
  const [rules, setRules] = useState()

  return (
    <>
      <Header></Header>
      {!started && !rules && <StartGame setStarted={setStarted} setRules={setRules}/>}
      {rules && <SeeRules setRules={setRules}/>}
      {started && <FetchCards/>}
    </>
  );
}

export default App;
