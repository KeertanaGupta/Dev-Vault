import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        language:{
            type: String,
            required: true,
            default: 'text', 
        },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag', // This points to our new 'Tag' model
      },
    ],
    },
    {
        timestamps: true,  
    }
);

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;