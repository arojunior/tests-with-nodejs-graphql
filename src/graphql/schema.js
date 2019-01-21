import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const types = fileLoader(path.join(__dirname, `./types`));
const typeDefs = mergeTypes([...types], { all: true });

export default typeDefs;
