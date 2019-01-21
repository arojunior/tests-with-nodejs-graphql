import supertest from 'supertest';
import graphQLServer from '../server';

const request = supertest(graphQLServer);

describe(`PostResolver`, () => {
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
});
