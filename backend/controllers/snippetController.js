import Snippet from '../models/snippetModel.js';
import Tag from '../models/tagModel.js'; // <-- 1. IMPORT THE TAG MODEL
import asyncHandler from '../middleware/asyncHandler.js';

// --- This is a new helper function ---
// It takes an array of tag names (strings) and the user ID
// It finds or creates the tags in the database
// And returns an array of their _id's
const findOrCreateTags = async (tagNames = [], userId) => {
  const tagIds = [];

  for (const name of tagNames) {
    // 1. Try to find the tag (lowercase)
    let tag = await Tag.findOne({
      name: name.toLowerCase(),
      user: userId,
    });

    // 2. If it doesn't exist, create it
    if (!tag) {
      tag = await Tag.create({
        name: name.toLowerCase(),
        user: userId,
      });
    }
    // 3. Add its ID to our array
    tagIds.push(tag._id);
  }
  return tagIds;
};

// @desc    Create a new snippet
// @route   POST /api/snippets
// @access  Private
const createSnippet = asyncHandler(async (req, res) => {
  // 1. Get the data, including the new 'tags' array (of strings)
  const { title, content, language, description, tags } = req.body;

  // 2. Use our helper function to get the Tag IDs
  const tagIds = await findOrCreateTags(tags, req.user._id);

  // 3. Create the new snippet in memory
  const snippet = new Snippet({
    title,
    content,
    language,
    description,
    user: req.user._id,
    tags: tagIds, // <-- 4. Save the array of Tag IDs
  });

  // 5. Save it to the database
  const createdSnippet = await snippet.save();

  // 6. Send it back
  res.status(201).json(createdSnippet);
});

// @desc    Get all snippets for the logged-in user
// @route   GET /api/snippets
// @access  Private
const getMySnippets = asyncHandler(async (req, res) => {
  // --- THIS IS THE UPDATE ---
  // Find all snippets for the user
  // And also 'populate' (fetch) the full data for the tags
  const snippets = await Snippet.find({ user: req.user._id }).populate(
    'tags', // <-- The field to populate
    'name' //  <-- We only care about the 'name' of the tag
  );
  res.status(200).json(snippets);
});

// @desc    Get a single snippet by its ID
// @route   GET /api/snippets/:id
// @access  Private
const getSnippetById = asyncHandler(async (req, res) => {
  // --- THIS IS THE UPDATE ---
  // Find the snippet by its ID
  // And also 'populate' the tags
  const snippet = await Snippet.findById(req.params.id).populate(
    'tags',
    'name'
  );

  if (snippet) {
    // --- Security Check ---
    if (snippet.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this snippet');
    }
    res.status(200).json(snippet);
  } else {
    res.status(404);
    throw new Error('Snippet not found');
  }
});

// @desc    Update a snippet
// @route   PUT /api/snippets/:id
// @access  Private
const updateSnippet = asyncHandler(async (req, res) => {
  const { title, content, language, description, tags } = req.body;

  const snippet = await Snippet.findById(req.params.id);

  if (snippet) {
    // --- Security Check ---
    if (snippet.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this snippet');
    }

    // --- THIS IS THE UPDATE ---
    // If new tags were sent, find/create them
    if (tags) {
      snippet.tags = await findOrCreateTags(tags, req.user._id);
    }

    // Update the other fields
    snippet.title = title || snippet.title;
    snippet.content = content || snippet.content;
    snippet.language = language || snippet.language;
    snippet.description = description || snippet.description;

    const updatedSnippet = await snippet.save();
    res.status(200).json(updatedSnippet);
  } else {
    res.status(404);
    throw new Error('Snippet not found');
  }
});

// @desc    Delete a snippet
// @route   DELETE /api/snippets/:id
// @access  Private (Needs login)
const deleteSnippet = asyncHandler(async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);

  if (snippet) {
    // --- Security Check ---
    if (snippet.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this snippet');
    }

    // Note: This does NOT delete the tags, which is good.
    // The tags can still be used by other snippets.
    await Snippet.deleteOne({ _id: snippet._id });
    res.status(200).json({ message: 'Snippet deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Snippet not found');
  }
});

export {
  createSnippet,
  getMySnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
};