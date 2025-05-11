import Posts from '../posts/posts.model.js'
import Comments from './comments.model.js'

export const addComment = async (req, res) => {

    try{
        const { author, content } = req.body
        const { pId } = req.params
        const post = await Posts.findById(pId)
        if(!post){
            return res.status(404).json({
                msg: 'Post not found'
            }) }
        const comment = new Comments({ author, content})
        await comment.save()
        post.comments.push(comment._id)
        await post.save()

        res.status(201).json({
            msg: 'Comment added successfully',
            comment
        })
     }catch(err){
        res.status(500).json({
            msg: 'Server error',
            err: err.message
        })
}
}

export const deleteComment = async (req, res) => {
    try{ 
        const { cId } = req.params
        const deletedComment = await Comments.findByIdAndDelete(cId)

        if(!deletedComment){
            return res.status(404).json({
                success : false,
                msg: 'Comment not found'
            })
        }

        await Posts.updateMany(
            { comments: cId },
            { $pull: { comments: cId } }
        )

        res.status(200).json({
            success: true,
            msg: 'Comment deleted successfully',
            data: {
                commentId: deleteComment._id,
                author: deletedComment.author,
                content: deletedComment.content
            }
        })} catch(err){
        res.status(500).json({
            success: false,
            msg: 'Server error',
            err: err.message
        })
    }
}

export const editComment = async (req, res) => {
    try{
        const { cId } = req.params
        const data = req.body

        const updatedComment = await Comments.findByIdAndUpdate(
            cId,
            { $set: data },
            { new: true }
        )
        if(!updatedComment){
            return res.status(404).json({
                success: false,
                msg: 'Comment not found'
            })
        }
        res.status(200).json({
            success: true,
            msg: 'Comment updated successfully',
            data: {
                commentId: updatedComment._id,
                author: updatedComment.author,
                content: updatedComment.content
            }})
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: 'Server error',
            err: err.message
        })
    }
}
