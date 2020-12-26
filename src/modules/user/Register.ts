import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { isAuth } from './../middleware/isAuth';
import { logger } from './../middleware/logger';

import { User } from './../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { sendEmail } from '../utils/sendEmail';

import { createConfirmationUrl } from './../utils/createConfirmationUrl';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger) // or @Authorized()
  @Query(() => String)
  async hello() {
    return 'Hello world!';
  }

  @Mutation(() => User)
  async register(@Arg('data') { firstName, lastName, email, password }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }
}
