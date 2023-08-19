import { USER_ROLES } from "./models/User"

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserMDL {
    id: string;
    name: string;
    email: string;
    role: USER_ROLES;
    createdAt: string;
  }

export interface PostsDB{
     id:string,
     creator_id:string,
     content :string,
     likes: number,
     deslike: number,
     created_at: string,
     updated_at : string
}