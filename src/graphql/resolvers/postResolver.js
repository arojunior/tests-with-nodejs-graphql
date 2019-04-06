import postRepository from '../../repository/postRepository';

const post = (_, { id }) => {
  return postRepository.findById(id);
};

const posts = () => {
  return postRepository.findAll();
};

const addPost = (_, { postInput }) => {
  return postRepository.create(postInput);
};

export default {
  Query: {
    post,
    posts,
  },
  Mutation: {
    addPost,
  },
};
