import { useState } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { Greet } from "../wailsjs/go/main/App";
import { AppContainer } from "./components/AppContainer";
import { DockerPs } from "../wailsjs/go/main/App";
import useSWR from "swr";

const App = () => {
  const [resultText, setResultText] = useState(
    "Please enter your name below 👇"
  );
  const [name, setName] = useState("");
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  const greet = () => {
    Greet(name).then(updateResultText);
  };

  const { data } = useSWR("dockerps", DockerPs);

  return (
    <AppContainer>
      <img src={logo} id="logo" alt="logo" />
      <div id="result" className="result">
        {resultText}
      </div>
      <div>{JSON.stringify(data, undefined, 2)}</div>
      <div id="input" className="input-box">
        <input
          id="name"
          className="input"
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn" onClick={greet}>
          Greet
        </button>
      </div>
    </AppContainer>
  );
};

export default App;
