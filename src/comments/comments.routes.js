import { Router } from "express"
import { addCommentValidator } from "../middlewares/comments-validator.js"
import { addComment, deleteComment, editComment } from "./comments.controller.js"

const router = Router()

/**
 * @swagger
 * /addComment/{pId}:
 *   post:
 *     summary: Add a new comment to a publication
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: pId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the publication to add the comment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - content
 *             properties:
 *               author:
 *                 type: string
 *                 example: Juan Pérez
 *               content:
 *                 type: string
 *                 example: Este es un comentario.
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/addComment/:pId", addCommentValidator, addComment)

/**
 * @swagger
 * /deleteComment/{cId}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: cId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteComment/:cId", deleteComment)

/**
 * @swagger
 * /editComment/{cId}:
 *   put:
 *     summary: Edit an existing comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: cId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - author
 *               - content
 *             properties:
 *               author:
 *                 type: string
 *                 example: Juan Pérez
 *               content:
 *                 type: string
 *                 example: Comentario editado.
 *     responses:
 *       200:
 *         description: Comment edited successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
router.put("/editComment/:cId", addCommentValidator, editComment)


export default router