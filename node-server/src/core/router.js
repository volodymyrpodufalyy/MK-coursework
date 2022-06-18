import Router from "express";
import EcoFactorsController from "../controllers/EcoFactorsController";
import ActionsController from "../controllers/ActionsController";

const router = new Router();

router.post("/ecofactors", EcoFactorsController.create);
router.get("/ecofactors", EcoFactorsController.getAll);
router.get("/ecofactors/:id", EcoFactorsController.getOne);
router.put("/ecofactors", EcoFactorsController.update);
router.delete("/ecofactors/:id", EcoFactorsController.delete);
router.get('/actions/:action', ActionsController.handleActions.bind(ActionsController));
router.post('/setclimate', ActionsController.setClimateConfig.bind(ActionsController));
router.get('/climate', ActionsController.getClimateConfig.bind(ActionsController));

export default router;
