import supertest from 'supertest';
import graphQLServer from '../server';
import { waitForMigrations, startContainers, destroyContainers } from '../config/setupTests';

const request = supertest(graphQLServer);
jest.setTimeout(60000);

describe(`PostResolver`, () => {
  beforeAll(async () => {
    await startContainers();
    await waitForMigrations();
  });

  describe(`Query`, () => {
    it(`Should return all posts`, async () => {
      // arrange
      const posts = {
        query: `query {
          posts {
            id
            content
            likes
            dislikes
            created
          }
        }`,
      };

      // act
      const response = await request.post(`/graphql`).send(posts);
      const {
        body: { data },
      } = response;

      // assert
      expect(data.posts).not.toBeNull();
    });
  });

  afterAll(async () => {
    await destroyContainers();
  });
});
