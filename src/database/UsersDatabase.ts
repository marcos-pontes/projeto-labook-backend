import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public async findUsers(name: string | undefined): Promise<UserDB[]> {
        let usersDB

        if (name) {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)
                .where("name", "LIKE", `%${name}%`)

            usersDB = result
        } else {
            const result: UserDB[] = await BaseDatabase
                .connection(UserDatabase.TABLE_USERS)

            usersDB = result
        }

        return usersDB
    }

    public async findUserById(id: string) {
        const [ userDB ]: UserDB[] | undefined[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .where({ id })

        return userDB
    }

    public async findUserByEmail(
        email: string
      ): Promise< UserDB | undefined > {
        const [userDB]: UserDB[] | undefined[] = await BaseDatabase
          .connection(UserDatabase.TABLE_USERS)
          .where({ email })
    
        return userDB
      }
    

    public async insertUser(newUserDB: UserDB):Promise< void >{
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(newUserDB)
    }
}
