import graphQLServer from './server';
import { SERVER_PORT } from './constants';

graphQLServer.listen({ port: SERVER_PORT }, () => {
  console.log(`🚀 GraphQL is now running on port: ${SERVER_PORT}`);
});
