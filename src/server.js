/* eslint-disable-next-line */
import 'babel-polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const graphQLServer = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
  tracing: true,
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = `0`;

graphQLServer.use(bodyParser.json());
apolloServer.applyMiddleware({ app: graphQLServer });

graphQLServer.get(`/`, (_, res) =>
  res.send({
    status: `UP`,
  }),
);

graphQLServer.get(`/playground`, expressPlayground({ endpoint: `/graphql` }));

export default graphQLServer;
