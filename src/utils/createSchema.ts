import { buildSchema } from 'type-graphql';

import { ChangePasswordResolver } from './../modules/user/ChangePassword';
import { ConfirmUserResolver } from './../modules/user/ConfirmUser';
import { CreateUserResolver } from './../modules/user/CreateUser';
import { ForgotPasswordResolver } from './../modules/user/ForgotPassword';
import { LoginResolver } from './../modules/user/Login';
import { LogoutResolver } from './../modules/user/Logout';
import { MeResolver } from './../modules/user/Me';
import { RegisterResolver } from './../modules/user/Register';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      CreateUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
    ],
    authChecker: ({ context: { req } }) => !!req.session.userId,
  });
