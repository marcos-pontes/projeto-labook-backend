import express from 'express'
import { PostsController } from '../controller/PostsController';
import { PostsBusiness } from '../business/PostBusiness';
import { PostsDatabase } from '../database/PostDatabase';
export const postsRouter = express.Router();
const postsController = new PostsController(new PostsBusiness(new PostsDatabase()))

postsRouter.post('/', postsController.createPost)
postsRouter.get('/', postsController.getPosts)
postsRouter.put('/', postsController.updatePost)
postsRouter.delete('/', postsController.deletePost)