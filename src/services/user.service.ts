import dbConn from '../config/Database/Database';
import { User } from '../types/users/userTypes';
import { User as UserEntity } from '../entities/user/userEntity';
import { UserOrder } from '../entities/user/userOrderEntity';
import { Logger } from '../plugins/logging.plugin';
import { ErrorEvents } from '../enums/errorEvents.enum';
import { LogEvent } from '../enums/logEvents.enum';

export default class UserService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  public getUser = async (userUuid: string): Promise<User> => {
    try {
      const userRepo = (await dbConn()).getRepository(UserEntity);
      const user = await userRepo.findOne({ where: { userUuid } });

      if (!user) {
        const customError = {
          action: LogEvent.GET_USER,
          message: `User not fount`,
          context: { userId: userUuid },
          error: ErrorEvents.USER_NOT_FOUND,
        };
        this.logger.log(customError);

        throw Error(customError.message);
      }

      this.logger.log({
        action: LogEvent.GET_USER,
        message: `User fetched successfully`,
        context: { userId: userUuid },
      });

      return user;
    } catch (error) {
      const customeError = {
        action: LogEvent.GET_USER,
        message: `Failed to fetch user`,
        error: JSON.stringify(error),
      };
      this.logger.log(customeError);

      throw new Error(customeError.message);
    }
  };

  public verifyUserOrder = async ({
    userUuid,
    orderUuid,
  }: {
    userUuid: string;
    orderUuid: string;
  }): Promise<boolean> => {
    try {
      const userOrderRepo = (await dbConn()).getRepository(UserOrder);
      const userOrder = await userOrderRepo.findOne({
        where: { userUuid, orderUuid },
      });

      if (!userOrder) {
        return false;
      }

      return true;
    } catch (error) {
      const customError = {
        action: LogEvent.VERIFY_USER_ORDER,
        message: `Failed to verify the user order`,
        error: JSON.stringify(error),
      };
      this.logger.log(customError);

      throw Error(customError.message);
    }
  };
}
