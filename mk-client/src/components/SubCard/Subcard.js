import React from 'react';
import "../../App.scss"
import styles from "./SubCard.module.scss"

const SubCard = () => {
	return (
		<div className={styles.container}>
			<div className="value-row">
				<h4>Current temperature 1 hour ago: </h4>
				<span>24 C</span>
			</div>
		</div>
	);
};

export default SubCard;
