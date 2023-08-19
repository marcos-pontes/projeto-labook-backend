import { Request, Response } from "express-serve-static-core"
import { PostsBusiness } from "../business/PostBusiness";

export class PostsController {
    constructor(
        private postsBusiness : PostsBusiness
    ){}
    public createPost = async (req:Request, res:Response):Promise <void>=>{
        try {
           const input =  { id:req.body.id,
             creatorId:req.body.creatorId,
              content:req.body.content,
              likes:req.body.likes,
              deslikes:req.body.deslikes
              }
              console.log("aqui controller")
              const result = await this.postsBusiness.createPost(input);
              res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error)
        }
    }
    public getPosts = async (req:Request, res:Response):Promise <void>=>{
        try {
            const output = await this.postsBusiness.getPost()
            res.status(200).send(output)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    public updatePost = async (req:Request, res:Response):Promise <void>=>{
        try {
            
        } catch (error) {
            res.status(400).send(error)
        }
    }
    public deletePost = async (req:Request, res:Response):Promise <void>=>{
        try {
            
        } catch (error) {
            res.status(400).send(error)
        }
    }
}