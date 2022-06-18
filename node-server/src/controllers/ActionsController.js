import { arduinoSerialPort, parser } from "../..";
import EcoFactor from "../models/EcoFactor";

const climateConfig = {}

class ActionsController {
  onActivate() {
    arduinoSerialPort.write("on");
    res.status(200);
    res.json({
      status: "success",
      message: "activated successfully",
    });
  }

  onDisable(req, res) {
    arduinoSerialPort.write("off");
    res.status(200);
    res.json({
      status: "success",
      message: "turned off successfully",
    });
  }

  async handleActions(req, res) {
    try {
      const action = req.params.action || req.param("action");

      if (action === "on") {
        this.onActivate(req, res);
      } else {
        this.onDisable(req, res);
      }
    } catch (error) {
      res.status(500);
      res.json({
        status: "error",
        message: "Failed to change status of device " + error,
      });
    }
  }

  async setClimateConfig(req, res) {
    try {
      const temperature = req.body.temperature;
      const humidity = req.body.humidity;

      arduinoSerialPort.write("!" + humidity + temperature);
      res.status(200);
      res.json({
        status: "success",
        message: "Climate configuration updated successfully",
      });
    } catch (error) {
      res.status(500);
      res.json({
        status: "error",
        message: "Failed to set climate configuration " + error,
      });
    }
  }

  async getClimateConfig(req, res) {
    try {
      arduinoSerialPort.write("?");

      const getPortInfo = () => new Promise((resolve, reject) => parser.on("data", (data) => {
        const response = data.startsWith("{") ? JSON.parse(data) : null;
        climateConfig.data = response;
        resolve(response);
      }));
      const info = await getPortInfo();
      const ecofactors = await EcoFactor.find({});
      const now = new Date();
      const ONE_HOUR = 60 * 60 * 1000;
      const saveEcoFactors = async (info) => {
        await EcoFactor.create({
          type: "temperature",
          value: info.temperature
        });
        await EcoFactor.create({
          type: "humidity",
          value: info.humidity
        })
      }
      if (ecofactors.length > 0) {
        if ((now - ecofactors[0].createdAt) < ONE_HOUR) {
          await saveEcoFactors(info);
        }
      } else await saveEcoFactors(info);
      res.status(200);
      res.json({
        message: "Climate configuration requested successfully",
        data: info,
      });
    } catch (error) {
      res.status(500);
      res.json({
        status: "error",
        message: "Failed to set climate configuration " + error,
      });
    }
  }
}

export default new ActionsController();
