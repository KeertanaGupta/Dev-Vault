import Tag from '../models/tagModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const getTags = asyncHandler(async (req, res) => {
    const tags = await Tag.find({user: req.user._id});
    res.status(200).json(tags);
});

const createTag = asyncHandler(async (req, res) => {
    const { name } = req.body;  

    if (!name) {
        res.status(400);
        throw new Error('Tag name is required');
    }

    const tagExists = await Tag.findOne({ 
        user: req.user._id,
        name: name.toLowerCase() 
    });

    if (tagExists) {
        res.status(400);
        throw new Error('Tag already exists');
    }

    const tag = await Tag.create({
        name: name.toLowerCase(),
        user: req.user._id,
    });

    res.status(201).json(tag);
}); 

export { getTags, createTag };