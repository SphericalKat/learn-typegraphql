import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExists } from "./isEmailAlreadyExists";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 100)
  firstName: string

  @Field()
  @Length(1, 100)
  lastName: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExists({ message: "A use with this email already exists" })
  email: string

  @Field()
  password: string
}