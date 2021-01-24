import React from 'react';
import { Field, Formik } from 'formik';

import Layout from './../components/Layout';
import { InputField } from '../components/fields/InputField';
import { Mutation } from 'react-apollo';
import { RegisterMutation, RegisterMutationVariables } from '../generated/apolloComponents';
import { registerMutation } from '../graphql/user/mutations/register';

const Register = () => {
  return (
    <Layout title='Register form'>
      <Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutation}>
        {(register) => (
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
            }}
            onSubmit={async (data, { setErrors }) => {
              try {
                const response = await register({ variables: { data } });
                console.log(response);
              } catch (e) {
                console.log('error:', Object.entries(e)[0][1]);

                const errors: { [key: string]: string } = {};
                setErrors(errors);
              }
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name='email' placeholder='email' type='email' component={InputField} />
                <Field name='firstName' placeholder='first name' component={InputField} />
                <Field name='lastName' placeholder='last name' component={InputField} />
                <Field name='password' placeholder='password' type='password' component={InputField} />
                <button type='submit'>submit form</button>
              </form>
            )}
          </Formik>
        )}
      </Mutation>
    </Layout>
  );
};

export default Register;
