import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      try {
        return await User.findById(user.id);
      } catch (err) {
        throw new Error('Failed to fetch user: ' + err.message);
      }
    },
    getUsers: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error('Failed to fetch users: ' + err.message);
      }
    }
  },
  Mutation: {
    signup: async (_, { username, email, password, role }) => {
      try {
        const existing = await User.findOne({ email });
        if (existing) throw new Error('Email already in use');
        const hashed = await bcrypt.hash(password, 12);
        const user = await User.create({ username, email, password: hashed, role });
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );
        return { token, user };
      } catch (err) {
        throw new Error('Signup failed: ' + err.message);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Incorrect password');
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );
        return { token, user };
      } catch (err) {
        throw new Error('Login failed: ' + err.message);
      }
    },
    logout: () => 'Logged out successfully'
  }
};

export default resolvers;