import { body } from "express-validator"
import { AvailableUserRole } from "../utils/Constants.js"
const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("invaild Email"),

        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({ min: 3 })
            .withMessage("Username must be 3 charectors long"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("password is required"),

        body("fullName")
            .optional()
            .trim()
    ]
}

const LoginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("invaild Email"),

        body("password")
            .trim()
            .notEmpty()
            .withMessage("password is required")


    ]
}

const forgotPasswordValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("invaild Email")
    ]
}

const resetPasswordValidator = () => {
    return [
        body("newPassword")
            .notEmpty()
            .withMessage("New password is required")
    ]
}

const changePasswordvalidator = () => {
    return [
        body("oldPassword")
            .notEmpty()
            .withMessage("Old password is required"),

        body("newPassword")
            .notEmpty()
            .withMessage("New password is required")
    ]
}

const createProjectvalidator = () => {
    return [
        body("name")
            .notEmpty()
            .withMessage("Project name is required"),
        body("description")
            .optional()

    ]
}

const addMemberToProjectValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("email is required")
            .isEmail()
            .withMessage("email is invalid"),
        body("role")
            .trim()
            .notEmpty()
            .withMessage("role is required")
            .isIn(AvailableUserRole)
            .withMessage("role is invalid")
    ]
}


export {
    userRegisterValidator, LoginValidator, forgotPasswordValidator, resetPasswordValidator, changePasswordvalidator, createProjectvalidator, addMemberToProjectValidator
}