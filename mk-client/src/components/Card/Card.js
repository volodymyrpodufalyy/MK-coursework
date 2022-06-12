import React from 'react';
import styles from "./Card.module.scss"
import "../../App.scss"

const Card = (props) => {
	return (
		<div className={styles.container}>
			<div  className={styles.title}>
				<h3>{props.title}</h3>
			</div>
			<div className="value-row">
				<h4>Current temperature:</h4>
				<span>27 C</span>
			</div>
		</div>
	);
};

export default Card;
