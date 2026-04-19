 import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type CommunityPost {
    id: ID!
    author: String!
    title: String!
    content: String!
    category: String!
    aiSummary: String
    createdAt: String
    updatedAt: String
  }

  type HelpRequest {
    id: ID!
    author: String!
    description: String!
    location: String
    isResolved: Boolean
    volunteers: [String]
    createdAt: String
    updatedAt: String
  }

  type Query {
    getCommunityPosts: [CommunityPost]
    getCommunityPost(id: ID!): CommunityPost
    getHelpRequests: [HelpRequest]
    getHelpRequest(id: ID!): HelpRequest
  }

  type Mutation {
    createCommunityPost(author: String!, title: String!, content: String!, category: String!): CommunityPost
    updateCommunityPost(id: ID!, title: String, content: String, category: String): CommunityPost
    deleteCommunityPost(id: ID!): String

    createHelpRequest(author: String!, description: String!, location: String): HelpRequest
    updateHelpRequest(id: ID!, isResolved: Boolean, location: String): HelpRequest
    volunteerForHelpRequest(id: ID!, userId: String!): HelpRequest
    deleteHelpRequest(id: ID!): String
  }
`;

export default typeDefs;
