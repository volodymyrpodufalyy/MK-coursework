export const renderSuffix = (title) => {
	if (title === "Temperature") return "ºC"
	else if (title === "Humidity") return "%"
	else return ""
}
