import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
    ]
}

const userLoginValidator = () => {
    return [
        body("email")
            .optional()
            .isEmail()
            .withMessage("Email is invalid"),
        body("password")
            .notEmpty()
            .withMessage("Password is required"),
        body("username")
            .optional()
            .trim()
    ]
}

const itemValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Item name is required"),
        body("sku")
            .trim()
            .optional(),
        body("quantity")
            .isNumeric()
            .withMessage("Quantity must be a numeric value")
            .notEmpty()
            .withMessage("Quantity is not defined"),
        body("price")
            .isNumeric()
            .withMessage("Price must be a numeric value")
            .notEmpty()
            .withMessage("Price is not defined"),
        body("category")
            .trim()
            .optional()
    ]
}

export {
    userLoginValidator,
    userRegisterValidator,
    itemValidator,
}