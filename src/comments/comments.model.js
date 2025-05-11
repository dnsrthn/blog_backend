import {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [50, 'Author name cannot exceed 50 characters'] 
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        maxlength: [500, 'Content cannot exceed 500 characters']
    },
    postId: {
        type: Date,
        default: Date.now
    }

})

export default model('Comments', commentSchema)