import './App.scss';
import Card from "./components/Card/Card";
import { useEffect, useState } from "react";
import api from "./api";
import SubCard from "./components/SubCard/Subcard";
import logo from "./assets/factory-img.png"

function App() {
  const [temperatureFactors, setTemperatureFactors] = useState([]);

  useEffect(() => {
   api.getTemperatureFactors()
      .then(response => setTemperatureFactors(response))
      .catch(error => {
        console.log(error)
        setTemperatureFactors([])
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Our factory eco factors</h1>
      </header>
      <main className="main">
        <img className="logo" alt="Factory" src={logo} />
        <div className="cards-container">
          <div className="cards-group">
            <Card title="Storage" />
            <SubCard />
          </div>
          <div className="cards-group">
            <Card title="Packaging" />
            <SubCard />
          </div>
          <div className="cards-group">
            <Card title="Security" />
            <SubCard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
