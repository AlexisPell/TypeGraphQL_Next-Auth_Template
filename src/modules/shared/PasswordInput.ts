import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PasswordInput {
  @Field()
  @MinLength(5, { message: 'wtf Password is too short... at least 6 characters :)' })
  password: string;
}
