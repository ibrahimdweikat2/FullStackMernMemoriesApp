import express from 'express';

import {getPostBySearch,getPost,getPosts,createPost,updatePost,deletePost,likePost } from '../controllers/Posts.js';
import auth from '../middleware/auth.js';
const router=express.Router();

router.get('/search',getPostBySearch)
router.get('/', getPosts);
router.get('/:id',getPost)
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);

export default router;