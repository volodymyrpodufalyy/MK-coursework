import EcoFactor from "../models/EcoFactor.js";

class EcoFactorsController {
    async create(req, res) {
        try {
        
            const ecofactor = EcoFactor.create({
                type: req.body.type,
                value: req.body.value
            });
            res.status(200);
            res.json(ecofactor);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            // TODO: implement ...
            return res.json("Hello world");
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
             // TODO: implement ...
             return res.json({});
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
             // TODO: implement ...
             return res.json({});
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
    async delete(req, res) {
        try {
             // TODO: implement ...
             return res.json({});
        } catch (e) {
            res.status(500).json(e)
        }
    }
}


export default new EcoFactorsController();