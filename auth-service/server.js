 import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

dotenv.config();

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    try {
      const user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      return { user };
    } catch {
      return {};
    }
  }
});

await server.start();
server.applyMiddleware({ app });

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Auth service running at http://localhost:${process.env.PORT}/graphql`);
    });
  })
  .catch(err => console.error(err));
