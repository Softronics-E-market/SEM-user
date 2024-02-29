import dbConn from '../config/Database/Database';
import { AddUserInput, Address, User } from '../types/users/userTypes';
import { User as UserEntity } from '../entities/user/userEntity';
import { UserOrder } from '../entities/user/userOrderEntity';
import { Logger } from '../plugins/logging.plugin';
import { ErrorEvents } from '../enums/errorEvents.enum';
import { LogEvent } from '../enums/logEvents.enum';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'loadsh';
import HelperService from '../common/helper';

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
          message: `User not found`,
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

      return { ...user, address: user.address.address};
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

  public addUser = async ({
    addUserInput,
  }: {
    addUserInput: AddUserInput;
  }): Promise<User> => {
    try {
      const userRepo = (await dbConn()).getRepository(UserEntity);

      if (addUserInput?.email) {
        if (!new HelperService().validateEmail(addUserInput.email)) {
          throw new Error('Invalid email address');
        }
      }

      if (addUserInput?.phone) {
        if (!new HelperService().validatePhone(addUserInput.phone)) {
          throw new Error('Invalid phone number');
        }
      }

      const addressRecord = map(addUserInput.address, (address) => {
        return { ...address, addressId: uuidv4() };
      });

      const savedUser = await userRepo.save({
        firstName: addUserInput.firstName,
        lastName: addUserInput.lastName,
        userUuid: uuidv4(),
        email: addUserInput.email,
        phone: addUserInput.phone,
        address: { address: addressRecord },
      });

      return {...savedUser, address: savedUser.address.address};
    } catch (error) {
      const customError = {
        action: LogEvent.ADD_USER,
        message: `Failed to add the user`,
        error: JSON.stringify(error),
      };
      this.logger.log(customError);

      if(error instanceof Error){
        throw Error(error.message)
      }

      throw Error(customError.message);
    }
  };
}
