import { GraphQLUpload, FileUpload } from 'graphql-upload'; //non-npm indepence. already included in apollo server
import { Resolver, Mutation, Arg } from 'type-graphql';
import { createWriteStream } from 'fs';
import { v4 } from 'uuid';

// Just an example without file validation
@Resolver()
export class ProfilePictureResolver {
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg('picture', () => GraphQLUpload)
    { createReadStream, filename }: FileUpload
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../images/${v4()}-${filename}`))
        .on('finish', () => resolve(true))
        .on('finish', () => reject(false));
    });
  }
}
