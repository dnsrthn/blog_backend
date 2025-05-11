import { body, param } from "express-validator"
import { validarCampos } from "./validar-campos.js"

export const addPostValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('course').notEmpty().withMessage('Class is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('course').isIn(['Technology', 'Taller', 'Practica Supervisada']).withMessage('Class must be Technology, Taller or Practica Supervisada'),
    body('category').isIn(['Web Development', 'Infographics', 'Presentation', 'Artificial Intelligence']).withMessage('Category must be Web Development, Infographics, Presentation or Artificial Intelligence'),
    validarCampos
]

export const getPostValidator = [
    param('id').notEmpty().isMongoId().withMessage('Invalid post ID'),
    validarCampos
]