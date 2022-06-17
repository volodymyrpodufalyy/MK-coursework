import EcoFactorsController from "../controllers/EcoFactorsController";


const formatData =(data) => {
   const jsonObj = JSON.parse(data);
   return jsonObj;
}

const arduinoParser = (data) => {
    const formattedData = formatData(data);

    console.log(formattedData);
}

export default arduinoParser;