import express from "express";
import router from "./src/core/router";
import { SerialPort, ReadlineParser } from "serialport";
import "./src/core/db";

const app = express();
app.use(express.json());
app.use(express.static("static"));
app.use("/api", router);

const PORT = 5000;
const ARDUINO_COMPORT = "COM2";

export const arduinoSerialPort = new SerialPort({
  path: ARDUINO_COMPORT,
  baudRate: 9600,
});
export const parser = arduinoSerialPort.pipe(
  new ReadlineParser({ delimiter: "\n" })
);

async function startApp() {
  try {
    app.listen(PORT, () => {
        console.log("SERVER STARTED ON PORT " + PORT);
    });
    arduinoSerialPort.on("open", function () {
      console.log("Serial Port " + ARDUINO_COMPORT + " is opened.");
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
