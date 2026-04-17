import { Router } from "express";
import {
    createItem,
    deleteItem,
    getItemById,
    getItems,
    updateItem,
} from "../controllers/item.controllers.js"
import { validate } from "../middlewares/validator.middleware.js";
import { itemValidator } from "../validators/index.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.use(verifyJWT)


router
    .route("/")
    .post(itemValidator(), validate, createItem)
    .get(getItems)

router
    .route("/:itemId")
    .get(getItemById)
    .put(itemValidator(), validate, updateItem)
    .delete(deleteItem)


export default router