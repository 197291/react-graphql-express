import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';

import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schema';

import Recipe from '../models/Recipe';
import User from '../models/User';

import { origin, jwtOptions } from './environment';

const app = express();

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});

// Create GraphQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

const corsConfig = {
  origin: origin,
  credentials: true
}

app.use(cors(corsConfig));

app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, jwtOptions.secret);
      req._currentUser = currentUser;
    } catch (error) {
      console.error(error);
    }
  }
  next();
});

// Connect schemas with GraphQl
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ _currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser: _currentUser
    }
  }))
);

export default app;
