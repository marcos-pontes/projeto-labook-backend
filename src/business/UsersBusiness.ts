import { UserDatabase } from "../database/UsersDatabase";
import { GetUsersInputDTO } from "../dtos/Users/getUsers.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/Users/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/Users/signup.dto";
import { BadRequestError } from "../error/BadRequestError";
import { USER_ROLES, User } from "../models/User";
import { IdGenerator } from "../service/IdGenerator";
import { TokenManager } from "../service/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}
  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input;

    const userDBExists = await this.userDatabase.findUserByEmail(email);

    if (userDBExists) {
      throw new BadRequestError("'Email' already registered");
    }

    const id = this.idGenerator.generatorId();

    const newUser = new User(
      id,
      name,
      email,
      password,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newUserDB = newUser.toDBModel();
    await this.userDatabase.insertUser(newUserDB);
    const token = this.tokenManager.createToken({
      id: newUser.getId(),
      role: newUser.getRole(),
      name: newUser.getName(),
    });

    const output:SignupOutputDTO = {
      message: "Registration done successfully",
      token: token,
    };

    return output;
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;
    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new BadRequestError('"email" not found');
    }

    if (password !== userDB.password) {
      throw new BadRequestError('Incorrect "email" or "password"');
    }

    const token = this.tokenManager.createToken({
      id: userDB.id,
      name: userDB.name,
      role: userDB.role,
    });

    const output = {
      message: "Login successful",
      token: token,
    };

    return output;
  };

  public getUsers = async (input: GetUsersInputDTO) => {
    const { name } = input;

    const usersDB = await this.userDatabase.findUsers(name);

    const users = usersDB.map(
      (userDB) =>
        new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
        )
    );

    const output = {
      Users: users,
    };

    return output;
  };
}
