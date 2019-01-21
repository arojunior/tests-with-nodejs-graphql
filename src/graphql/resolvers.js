import { mergeResolvers } from 'merge-graphql-schemas';
import postResolver from './resolvers/postResolver';

export default mergeResolvers([postResolver]);
