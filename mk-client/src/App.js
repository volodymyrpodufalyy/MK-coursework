import './App.scss';
import Card from "./components/Card/Card";
import { useEffect, useState } from "react";
import api from "./api";
import SubCard from "./components/SubCard/Subcard";
import logo from "./assets/factory-img.png"

function App() {
  const [climateConfig, setClimateConfig] = useState({ });

  useEffect(() => {
    console.log("PROCESSING REQUEST");

    api.getTemperatureFactors()
      .then(res => {
        console.log(res, "result")
        setClimateConfig(res.response);
      })
      .catch(error => {
        console.log(error)
        setClimateConfig({})
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Our factory climate control</h1>
      </header>
      <main className="main">
        <img className="logo" alt="Factory" src={logo} />
        <div className="cards-container">
          {climateConfig.temperature && (
            <>
              <div className="cards-group">
                <Card title="Humidity" value={climateConfig.humidity} />
                <SubCard />
              </div>
              <div className="cards-group">
                <Card title="Temperature" value={climateConfig.temperature} />
                <SubCard />
              </div>
              <div className="cards-group">
                <Card title="Security"  />
                <SubCard />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
