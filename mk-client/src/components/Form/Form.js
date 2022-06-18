import React, { useState } from 'react';
import styles from "./Form.module.scss"
import api from "../../api/index"
import "../../App.scss"


const Form = (props) => {
	const [temperature, setTemperature] = useState("");
	const [humidity, setHumidity] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await api.setClimateConfig({
				temperature: Number(temperature),
				humidity: Number(humidity)
			});
			await props.updateClimateConfig();
		} catch (err) {
			console.log(err, "error setClimateConfig")
		}
	}

	return (
		<div className={styles.container}>
			<form className={styles.content} onSubmit={onSubmit}>
				<div className={styles.row}>
					<label>
						Temperature:
					</label>
					<input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)}/>
				</div>
				<div className={styles.row}>
					<label>
						Humidity:
					</label>
					<input type="text" value={humidity} onChange={(e) => setHumidity(e.target.value)}/>
				</div>
				<button className="action-btn" type="submit" >
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
