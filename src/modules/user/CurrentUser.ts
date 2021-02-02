import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { AuthContext } from "src/types/AuthContext";

@Resolver()
export class CurrentUserResolver {

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: AuthContext) : Promise<User | undefined>{
    if (!ctx.req.session!.userId) {
      return undefined
    }

    return User.findOne(ctx.req.session.userId)
  }
}