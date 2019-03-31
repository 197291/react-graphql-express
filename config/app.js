import express from 'express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';

import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/schema';

import Recipe from '../models/Recipe';
import User from '../models/User';

import { origin } from './environment';

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

// Connect schemas with GraphQl
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

export default app;
