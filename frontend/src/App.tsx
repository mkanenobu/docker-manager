import { useState } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { Greet } from "../wailsjs/go/main/App";
import { AppContainer } from "./components/AppContainer";
import { DockerPs } from "../wailsjs/go/main/App";
import useSWR from "swr";
import { Containers } from "./components/Containers";

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

  const { data } = useSWR("dockerps", DockerPs, { refreshInterval: 1000 });

  return (
    <AppContainer>
      <img src={logo} id="logo" alt="logo" />
      <div id="result" className="result">
        {resultText}
      </div>
      {data && <Containers containers={data} />}
    </AppContainer>
  );
};

export default App;
