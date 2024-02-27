import dbConn from "../config/Database/Database";
import { User } from "../types/userTypes";
import { User as UserEntity } from "../entities/user/userEntity";

export default class UserService {
  public getUser = async (userUuid: string): Promise<User> => {
    try {
      const userRepo = (await dbConn()).getRepository(UserEntity);
      const user = await userRepo.findOne({ where: { userUuid } });

      if (!user) {
        throw Error("User not found");
      }

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        userUuid: user.userUuid,
        email: user.email,
        phone: user.phone,
      };
    } catch (error) {
      console.error({
        action: "GET_USER",
        message: "Failed to get the user",
        error: JSON.stringify(error),
      });
      
      throw error;
    }
  };
}
