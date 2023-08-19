import { error } from "console";
import { PostsDatabase } from "../database/PostDatabase";
import { PostsDB } from "../types";
import { Posts } from "../models/Post";

export class PostsBusiness {
  constructor(public postsDatabase: PostsDatabase) {}
  public createPost = async (input:any) => {

    try {
        const { id, creatorId, content, likes, deslike} = input;
    const postDBExists = await this.postsDatabase.findPostsById(id);
    
    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();
    
    const newPost = new Posts(
        id,
        creatorId,
        content,
        likes,
        deslike,
        created_at,
        updated_at || created_at
        );
        const newPostDB:PostsDB ={
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            deslike: newPost.getDeslike(),
            created_at: newPost.getCreatedAt(),
            updated_at: newPost.getCreatedAt()
        }
        await this.postsDatabase.insertPost(newPostDB)
        console.log("aquiBusiness")
        const output = {
            messagem : "Post criado com sucesso",
            post: newPost
        }
        return output
    } catch (error) {
        
    }
    
  };
  public  getPost  = async () => {
const result = await this.postsDatabase.getPosts()
return result
  }
}
