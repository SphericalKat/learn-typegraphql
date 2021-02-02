import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcryptjs'
import { User } from "../../entities/User";
import { AuthContext } from "../../types/AuthContext";

@Resolver()
export class LoginResolver {

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: AuthContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return null
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return null
    }

    ctx.req.session!.userId = user.id

    return user
  }
}