import axios from "./axios.ts";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getTemperatureFactors: async () => {
		try {
			const {data} = await axios.get("/ecofactors/temperature");
			return data;
		} catch (err) {
			throw err;
		}
	},
};