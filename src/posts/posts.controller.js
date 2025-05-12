import Posts from './posts.model.js'
import Comments from '../comments/comments.model.js'
import { format } from 'date-fns'

export const getPosts = async (req, res) => {
    try{
const { category, course } = req.body || req.query || {};
        let filter = {}

        if (category) filter.category = category
        if (course) filter.course = course
    
    const rawPosts = await Posts
        .find(filter)
        .populate({ path: 'comments', select: 'author content date -_id'})
        .sort({date: -1})

    const posts = rawPosts.map(pos => {
        const obj = pos.toObject()
        return {
            ...obj,
            date: format(new Date(obj.date), 'dd/MM/yyyy HH:mm'),
            comments: (obj.comments || []).map(comment => ({
                ...comment,
                date: format(new Date(comment.date), 'dd/MM/yyyy HH:mm')
            }))
        }
    })
    res.status(200).json({
        success: true,
        posts
    })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        })}
}

export const createPost = async (req, res) => {
    try{
        const {title, content, course, category} = req.body
        const newPost = await Posts.create({
            title,
            content,
            course,
            category
        })
        res.status(201).json({
            message: 'Post created successfully',
            post: newPost
        })
    }catch(err){
        res.status(500).json({
            error : "Server error while creating post",
            message: err.message
        })
    }
}

export const deletePost = async (req, res) => {

    try{
        const {id} = req.params
        const post = await Posts.findByIdAndDelete(id)

        if(!post){
            return res.status(404).json({
                message: 'Post not found'
            })
        }
        await Comments.deleteMany({_id : {$in: post.comments}})
        res.status(200).json({
            message: 'Post deleted successfully',
            detail: {
                title: post.title,
                id: post._id
            }
        })
    } catch(err){
        res.status(500).json({
            error: 'Server error while deleting post',
            message: err.message
        })
    }
}

export const lookForPost = async (req, res) => {
    try{
        const {id} = req.params
        const post = await Posts.findById(id).populate({ path: 'comments', select: 'author content date -_id'})
        if(!post){
            return res.status(404).json({
                message: 'Post not found'
            })
        }
        const obj = post.toObject()
        const formattedPost = {
            ...obj,
            date: format(new Date(post.date), 'dd/MM/yyyy HH:mm'),
            comments: (obj.comments || []).map(comment => ({
                ...comment.toObject(),
                date: format(new Date(comment.date), 'dd/MM/yyyy HH:mm')
            }))
        }
        res.status(200).json({
            message: 'Post found',
            post: formattedPost
        })
    }catch(err){
        res.status(500).json({
            error: 'Server error while looking for post',
            message: err.message
        })
    }
}