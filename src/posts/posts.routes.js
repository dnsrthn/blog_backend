import { Router } from "express"
import { addPostValidator, getPostValidator } from "../middlewares/posts-validator.js"
import { getPosts, createPost, deletePost, lookForPost} from "./posts.controller.js"

const router = Router();    

router.post('/addPosts', addPostValidator, createPost)
router.post('/getPosts', getPosts)
router.delete('/deletePosts/:id', deletePost)
router.get('/getPostsById/:id', getPostValidator, lookForPost)

export default router

