import { arduinoSerialPort, parser } from "../..";

const climateConfig = {};

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

      parser.on("data", (data) => {
        climateConfig.data = JSON.parse(data);
        console.log(climateConfig.data, "set response\n");
        if (climateConfig.data) {
          res.status(200);
          res.json({
            message: "Climate configuration requested successfully",
            response: climateConfig.data,
          });
        }
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
