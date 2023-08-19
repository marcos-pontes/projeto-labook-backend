import { Posts } from "../models/Post";
import { PostsDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {
  public static TABLE_NAME = "posts";
  public async insertPost(newPost: PostsDB) {
    await BaseDatabase.connection(PostsDatabase.TABLE_NAME).insert(newPost);
  }
  public async getPosts () : Promise<PostsDB[]>{
    const result : PostsDB[] = await BaseDatabase
    .connection(PostsDatabase.TABLE_NAME);
    return result
  }
  public async findPostsById(id:any){
    const result = await BaseDatabase.connection(
      PostsDatabase.TABLE_NAME
    ).where({ id: id });
    return result
  }

  public async updatePost(newPost: Posts) {}
}
