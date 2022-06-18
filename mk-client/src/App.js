import './App.scss';
import Card from "./components/Card/Card";
import React, { useEffect, useRef, useState } from "react";
import api from "./api";
import SubCard from "./components/SubCard/Subcard";
import logo from "./assets/factory-img.png"
import heaterImg from "./assets/heater.jpeg"
import moisturizerImg from "./assets/moisturizer.jpeg"
import fanImg from "./assets/fan.jpeg"
import Form from "./components/Form/Form";
import { Circles } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
	const [climateConfig, setClimateConfig] = useState({});
	const [loading, setLoading] = useState(false);
	const [temperatureFactors, setTemperatureFactors] = useState([]);
	const [humidityFactors, setHumidityFactors] = useState([]);

	const updateClimateConfig = async () => {
		console.log("updating climate config")
		try {
			setLoading(true)
			const response = await api.getTemperatureFactors();
			setClimateConfig(response.data);
		} catch (err) {
			console.log(err, 'err updating')
		} finally {
			setLoading(false)
		}
	}

	const getClimateData = async () => {
		try {
			setLoading(true)
			const response = await api.getEcoFactors();
			setTemperatureFactors(response.filter(i => i.type === "temperature"));
			setHumidityFactors(response.filter(i => i.type === "humidity"));
		} catch (e) {
			console.log(e, "err getClimateData")
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		updateClimateConfig();
		getClimateData();
	}, []);

	console.log(climateConfig, "climateConfig")

	return (
		<div className="App">
			<header className="App-header">
				<h1>Our factory climate control</h1>
			</header>
			<main className="main">
				<div className="top-content">
					<div className="content-group content-group--main">
						<img className="logo" alt="Factory" src={logo}/>
					</div>
					<div className="content-group">
						{!loading && (
							<div className="action-container">
								<Form updateClimateConfig={updateClimateConfig}/>
								<button className="action-btn" onClick={updateClimateConfig}>Refresh</button>
							</div>
						)}
					</div>
				</div>
				<div className="cards-container">
					{!loading ? (
						<React.Fragment>
							{climateConfig.temperature &&
								<>
									<div className="cards-group">
										<Card title="Humidity" subtitle="Current humidity:" value={climateConfig.humidity}>
											<div className="value-row">
												<h4>Set humidity:</h4>
												<span>{climateConfig.setTemperature || 50}</span>
											</div>
										</Card>
										<SubCard ecofactor="Humidity" value={humidityFactors[0].value}/>
									</div>
									<div className="cards-group">
										<Card title="Temperature" subtitle="Current temperature:" value={climateConfig.temperature}>
											<div className="value-row">
												<h4>Set temperature:</h4>
												<span>{climateConfig.setHumidity || 50}</span>
											</div>
										</Card>
										<SubCard ecofactor="Temperature" value={temperatureFactors[0].value}/>
									</div>
									<div className="cards-group">
										<Card title="Heater" subtitle="Heater state:" value={climateConfig.tempStatus}>
											<img className="device-img" alt="heater" src={heaterImg}/>
										</Card>
									</div>
									<div className="cards-group">
										<Card title="Moisturizer" subtitle="Moisturizer state:" value={climateConfig.humStatus}>
											<img className="device-img" alt="Moisturizer" src={moisturizerImg}/>
										</Card>
									</div>
									<div className="cards-group">
										<Card title="Fan" subtitle="Fan state:" value={climateConfig.fanStatus}>
											<img className="device-img" alt="fan" src={fanImg}/>
										</Card>
									</div>
								</>
							}
						</React.Fragment>
					) : <Circles color="#00BFFF" height={80} width={80}/>}
				</div>
			</main>
		</div>
	);
}

export default App;
