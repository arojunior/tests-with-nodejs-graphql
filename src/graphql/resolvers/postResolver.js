import postRepository from '../../repository/postRepository';

const post = (_, { id }) => {
  return postRepository.findById(id);
};

const posts = () => {
  return postRepository.findAll();
};

export default {
  Query: {
    post,
    posts,
  },
};
