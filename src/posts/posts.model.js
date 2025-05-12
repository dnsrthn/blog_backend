import {Schema, model} from 'mongoose'
import '../comments/comments.model.js'

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        maxlength: [5000, 'Content cannot exceed 5000 characters']
    },
    date: {
        type: Date,
        default: Date.now
    },
    course: {
        type: String,
        required: [true, 'Class is required'],
        enum: ['Technology', 'Taller', 'Practica Supervisada']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Web Development', 'Infographics', 'Presentation', 'Artificial Intelligence']       
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments',
        default: []
    }]
}, 
{ 
    versionKey: false,
    timestamps: false
})

postSchema.methods.toJSON = function() {
    const {__id, ...post} = this.toObject()
    post.pId = __id
    return post
}

export default model('Posts', postSchema)

