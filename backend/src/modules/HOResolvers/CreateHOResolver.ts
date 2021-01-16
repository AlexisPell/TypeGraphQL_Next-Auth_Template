import { Resolver, Mutation, Arg, ClassType, InputType, Field, UseMiddleware } from 'type-graphql';
import { Middleware } from 'type-graphql/dist/interfaces/Middleware';

import { RegisterInput } from './../user/register/RegisterInput';

import { User } from './../../entity/User';
import { Product } from './../../entity/Product';

// // // // // // // // // // //
// Higher Order Resolver:     //
// 1 - name of resolver       //
// 2 - Return Type            //
// 3 - Input Type             //
// 4 - Entity                 //
// 5 - Conditional Middleware //
// // // // // // // // // // //
function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg('data', () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

export const CreateUserResolver = createResolver('User', User, RegisterInput, User);

@InputType()
class ProductInput {
  @Field()
  name: string;
}
export const CreateProductResolver = createResolver('Product', Product, ProductInput, Product);
