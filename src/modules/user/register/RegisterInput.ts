import { Length, IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExists';

import { PasswordInput } from './../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(2, 50, { message: 'The name should contain from 2 to 50 chars :)' })
  firstName: string;

  @Field()
  @Length(2, 50, { message: 'The name should contain from 2 to 50 chars :)' })
  lastName: string;

  @Field()
  @IsEmail({}, { message: 'The email is uncorrect, please, try again :)' })
  @IsEmailAlreadyExist({ message: 'Already registered here :)' })
  email: string;
}
