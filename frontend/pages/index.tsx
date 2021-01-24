import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

import { Mutation } from 'react-apollo';
import { loginMutation } from '../graphql/user/mutations/login';
import { LoginMutation, LoginMutationVariables } from '../generated/apolloComponents';

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title='Home | Next.js + TypeScript Example'>
      <h1>hello Next.js 👋</h1>
      <p>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </p>
      {/*This is a working example without hooks*/}
      <Mutation<LoginMutation, LoginMutationVariables> mutation={loginMutation}>
        {(mutate) => (
          <button
            onClick={async () => {
              const response = await mutate({
                variables: { email: 'bob17@gmail.com', password: '123123' },
              });
              console.log(response);
            }}
          >
            call login mutation <strong>without</strong> hook
          </button>
        )}
      </Mutation>
    </Layout>
  );
};

export default IndexPage;
