import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from './../../entity/User';

@Resolver(User) // Specified user to define type object for FieldResolver
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello world!';
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    // Root is a parent of field resolver
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
