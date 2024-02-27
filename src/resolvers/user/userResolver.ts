import UserService from "../../services/userService";
import { User } from "../../types/userTypes";

const userResolver = {
    Query: {
        getUser: ( parent: unknown, args: {userUuid: string}): Promise<User> => new UserService().getUser(args.userUuid)
    }
}

export default userResolver;