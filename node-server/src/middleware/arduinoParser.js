import EcoFactorsController from "../controllers/EcoFactorsController";

const formatData = (data) => {
  if (data.startsWith("{")) return JSON.parse(data);
  else return data;
};

const arduinoParser = (data) => {
	// const formattedData = formatData(data);

	console.log("incoming data: ");
  console.log(data);
};

export default arduinoParser;
