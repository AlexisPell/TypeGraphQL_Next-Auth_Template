import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import 'colors';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
// import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';

// Dynamic imports
import { createSchema } from './utils/createSchema';
import { queryComplexityPlugin } from './utils/queryComplexity';

// Session
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';

// Non-server functions and declatations
dotenv.config({ path: 'config.env' });

const startServer = async () => {
  await createConnection();

  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    uploads: false, // To enable graphql-upload working correct
    plugins: [queryComplexityPlugin(schema)],
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000,
      maxFiles: 10,
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
    })
  );

  app.use(
    session({
      store: new RedisStore({ client: redis as any }),
      name: 'qid',
      secret: process.env.SESSION_SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.BACKEND_URL} on PORT ${process.env.PORT}`.blue.bold);
  });
};

startServer();
