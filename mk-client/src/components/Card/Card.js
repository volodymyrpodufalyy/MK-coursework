import React from 'react';
import styles from "./Card.module.scss"
import "../../App.scss"
import { renderSuffix } from "../../utils/renderSuffix";

const Card = (props) => {


	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h3>{props.title}</h3>
			</div>
			<div className={styles.content}>
				{props.children}
				<div className="value-row">
					<h4>{props.subtitle}</h4>
					<span>{props.value + renderSuffix(props.title)}</span>
				</div>
			</div>
		</div>
	);
};

export default Card;
