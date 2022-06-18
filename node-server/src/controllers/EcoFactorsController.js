import EcoFactor from "../models/EcoFactor.js";

class EcoFactorsController {
  async create(req, res) {
    try {
      const ecofactor = EcoFactor.create({
        type: req.body.type,
        value: req.body.value,
      });
      res.status(200);
      res.json({
        message: "Successfully created",
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const ecofactors = await EcoFactor.find({});
      res.status(200);
      res.json(ecofactors);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new EcoFactorsController();
