import { Request, Response } from "express";
import { UserBusiness } from "../business/UsersBusiness";
import { BaseError } from "../error/BaseError";
import { GetUsersSchema } from "../dtos/Users/getUsers.dto";
import { LoginSchema } from "../dtos/Users/login.dto";
import { SignupSchema } from "../dtos/Users/signup.dto";
import { ZodError } from "zod"

export class UserController {
  constructor(
    private userBusiness: UserBusiness
  ){}
  public getUsers = async (req: Request, res: Response) => {
    try {
      const input = GetUsersSchema.parse({
        name: req.query.name
      })
      
      const output = await this.userBusiness.getUsers(input);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }; 

  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
       })
 
       const output = await this.userBusiness.signup(input)
 
       res.status(201).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input =  LoginSchema.parse({
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.userBusiness.login(input);
      res.status(200).send(output);
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}
