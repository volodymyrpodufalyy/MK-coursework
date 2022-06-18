import axios from "./axios.ts";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getTemperatureFactors: async () => {
		try {
			const { data } = await axios.get("/api/climate");
			return data;
		} catch (err) {
			throw err;
		}
	},
	setClimateConfig: async (data) => {
		try {
			await axios.post("/api/setclimate", data)
		} catch (err) {
			throw  err;
		}
	},
	getEcoFactors: async () => {
		try {
			const {data } = await axios.get("api/ecofactors")
			return data
		} catch (err) {
			throw  err;
		}
	}
};