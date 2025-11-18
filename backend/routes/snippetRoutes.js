import express from 'express';
const router = express.Router();

import {protect} from "../middleware/authMiddleware.js";

import{
    createSnippet,
    getMySnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet,
} from '../controllers/snippetController.js';

router
    .route('/').post(protect, createSnippet)
    .get(protect, getMySnippets);

router
    .route('/:id')
    .get(protect, getSnippetById)
    .put(protect, updateSnippet)
    .delete(protect, deleteSnippet);    

export default router;