import { arduinoSerialPort } from "../..";

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
}

export default new ActionsController();
