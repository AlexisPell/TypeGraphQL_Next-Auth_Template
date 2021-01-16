import { Connection } from 'typeorm';
import faker from 'faker';

import { testConn } from './../../../test-utils/testConn';
import { gqlCall } from './../../../test-utils/gqlCall';

import { User } from './../../../entity/User';

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const meQuery = `
{
  me { 
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe('Me', () => {
  it('get user', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(), // no worry about hashing
    }).save();

    const response = await gqlCall({
      source: meQuery,
      userId: user.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          firstName: user.firstName,
          lastName: user.lastName,
          id: `${user.id}`,
          email: user.email,
        },
      },
    });
  });

  it('return null', async () => {
    const response = await gqlCall({
      source: meQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
