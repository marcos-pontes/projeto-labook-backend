import z from "zod"
import { UserMDL } from "../../types"

export interface GetUsersInputDTO {
  name:string;
}


export const GetUsersSchema = z.object({
  name: z.string().min(3).optional()
}).transform(data => data as GetUsersInputDTO)