import UserService from '../../services/user.service';
import { User } from '../../types/users/userTypes';

const userResolver = {
  Query: {
    getUser: (parent: unknown, args: { userUuid: string }): Promise<User> =>
      new UserService().getUser(args.userUuid),
    verifyUserOrder: (
      parent: unknown,
      args: { userUuid: string; orderUuid: string },
    ): Promise<boolean> => new UserService().verifyUserOrder({ ...args }),
  },
};

export default userResolver;
