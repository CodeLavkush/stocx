import { Router } from "express";
import { getSummary } from "../controllers/dashboard.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()
router.use(verifyJWT)


router
    .route("/summary")
    .get(getSummary)

export default router
