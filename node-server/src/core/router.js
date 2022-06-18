import Router from "express";
import EcoFactorsController from "../controllers/EcoFactorsController";
import ActionsController from "../controllers/ActionsController";

const router = new Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/ecofactors", EcoFactorsController.create);
router.get("/ecofactors", EcoFactorsController.getAll);
router.get(
  "/actions/:action",
  ActionsController.handleActions.bind(ActionsController)
);
router.post(
  "/setclimate",
  ActionsController.setClimateConfig.bind(ActionsController)
);
router.get(
  "/climate",
  ActionsController.getClimateConfig.bind(ActionsController)
);

export default router;
