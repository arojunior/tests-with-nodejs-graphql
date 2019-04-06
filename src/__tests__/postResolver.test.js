import supertest from 'supertest';
import graphQLServer from '../server';

const request = supertest(graphQLServer);

describe(`PostResolver`, () => {
  describe(`Query`, () => {
    it(`Should return all posts`, async () => {
      // arrange
      const postsQuery = {
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
      const response = await request.post(`/graphql`).send(postsQuery);
      const {
        body: { data },
      } = response;

      // assert
      expect(data.posts).not.toBeNull();
      expect(data.posts).not.toHaveLength(0);
    });

    it(`Should return specific post by id`, async () => {
      // arrange
      const postQuery = id => ({
        query: `query {
          post(id: ${id}) {
            id
            content
            likes
            dislikes
            created
          }
        }`,
      });

      // act
      const response = await request.post(`/graphql`).send(postQuery(1));
      const {
        body: { data },
      } = response;

      // assert
      expect(data.post).not.toBeNull();
      expect(data.post.id).toBe(1);
    });
  });

  describe(`Mutation`, () => {
    it(`Should add new post`, async () => {
      // arrange
      const postMutation = post => ({
        query: `mutation {
            addPost(postInput: { content: "${post.content}" }) {
              id
              content
              created
            }
          }`,
      });

      const postInput = {
        id: 0,
        content: `Description test`,
      };

      // act
      const response = await request.post(`/graphql`).send(postMutation(postInput));
      const {
        body: { data },
      } = response;

      // assert
      expect(data.addPost).not.toBeNull();
      expect(data.addPost.content).toBe(postInput.content);
    });
  });
});
