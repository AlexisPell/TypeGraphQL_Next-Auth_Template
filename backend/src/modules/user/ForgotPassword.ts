import { Arg, Mutation, Resolver } from 'type-graphql';
import { v4 } from 'uuid';

import { User } from './../../entity/User';

import { redis } from './../../redis';
import { sendEmail } from '../utils/sendEmail';
import { forgotPasswordPrefix } from './../constants/redisPrefixes';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) return false;

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24); // 1  day expiration

    await sendEmail(email, `${process.env.FRONTEND_URL}/user/change-password/${token}`);

    return true;
  }
}
