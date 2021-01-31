import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../../../entities/User";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistsConstraint implements ValidatorConstraintInterface {
  validate(email: string): boolean | Promise<boolean> {
    return User.findOne({ where: { email } }).then(user => {
      return !Boolean(user)
    })
  }
}

export function IsEmailAlreadyExists(options?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [],
      validator: IsEmailAlreadyExistsConstraint
    })
  }
}