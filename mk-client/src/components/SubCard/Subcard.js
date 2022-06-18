import React from 'react';
import "../../App.scss"
import styles from "./SubCard.module.scss"
import { renderSuffix } from "../../utils/renderSuffix";

const SubCard = (props) => {
	return (
		<div className={styles.container}>
			<div className="value-row">
				<h4>{props.ecofactor} 1 hour ago: </h4>
				<span>{props.value + renderSuffix(props.ecofactor)}</span>
			</div>
		</div>
	);
};

export default SubCard;
