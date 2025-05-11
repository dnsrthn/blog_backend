import { body } from "express-validator"
import { validarCampos } from "./validar-campos.js"

export const addCommentValidator = [

    body("author").notEmpty().withMessage("Author is mandatory"),
    body("content").notEmpty().withMessage("Content is mandatory"),
    validarCampos
]