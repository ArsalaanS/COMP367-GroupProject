 import CommunityPost from '../models/CommunityPost.js';
import HelpRequest from '../models/HelpRequest.js';

const resolvers = {
  Query: {
    getCommunityPosts: async () => await CommunityPost.find(),
    getCommunityPost: async (_, { id }) => await CommunityPost.findById(id),
    getHelpRequests: async () => await HelpRequest.find(),
    getHelpRequest: async (_, { id }) => await HelpRequest.findById(id)
  },

  Mutation: {
    createCommunityPost: async (_, { author, title, content, category }) => {
      const post = await CommunityPost.create({ author, title, content, category });
      return post;
    },
    updateCommunityPost: async (_, { id, title, content, category }) => {
      return await CommunityPost.findByIdAndUpdate(
        id,
        { title, content, category, updatedAt: new Date() },
        { new: true }
      );
    },
    deleteCommunityPost: async (_, { id }) => {
      await CommunityPost.findByIdAndDelete(id);
      return 'Post deleted successfully';
    },

    createHelpRequest: async (_, { author, description, location }) => {
      const request = await HelpRequest.create({ author, description, location });
      return request;
    },
    updateHelpRequest: async (_, { id, isResolved, location }) => {
      return await HelpRequest.findByIdAndUpdate(
        id,
        { isResolved, location, updatedAt: new Date() },
        { new: true }
      );
    },
    volunteerForHelpRequest: async (_, { id, userId }) => {
      return await HelpRequest.findByIdAndUpdate(
        id,
        { $addToSet: { volunteers: userId } },
        { new: true }
      );
    },
    deleteHelpRequest: async (_, { id }) => {
      await HelpRequest.findByIdAndDelete(id);
      return 'Help request deleted successfully';
    }
  }
};

export default resolvers;
