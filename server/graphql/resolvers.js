import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { jwtOptions } from '../config/environment';

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find().sort({ createdDate: 'desc' });
      return allRecipes;
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id });
      return recipe;
    },
    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find(
          {
            $text: { $search: searchTerm, $caseSensitive: false }
          },
          {
            score: { $meta: 'textScore' }
          }
        ).sort({ score: { $meta: 'textScore' } });

        return searchResults;
      } else {
        const recipes = await Recipe.find().sort({ likes: 'desc', createdDate: 'desc' });

        return recipes;
      }
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) return null;

      const user = await User.findOne({ username: currentUser.username }).populate({
        path: 'favorites',
        model: 'Recipe'
      });
      return user;
    },
    getUserRecipes: async (root, { username }, { Recipe }) => {
      if (!username) return null;

      const userRecipes = await Recipe.find({ username });
      return userRecipes;
    }
  },
  Mutation: {
    addRecipe: async (
      root,
      { name, category, description, instructions, username, imageUrl },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        imageUrl,
        category,
        description,
        instructions,
        username
      }).save();
      return newRecipe;
    },
    likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      await User.findOneAndUpdate({ username }, { $addToSet: { favorites: _id } });
      const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
      return recipe;
    },
    unlikeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      await User.findOneAndUpdate({ username }, { $pull: { favorites: _id } });
      const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
      return recipe;
    },
    deleteUserRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOneAndRemove({ _id });
      return recipe;
    },
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });

      if (!user) throw new Error('User not found');

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) throw new Error('Invalid user or password');

      return { token: createToken(user, jwtOptions.secret, jwtOptions.exp) };
    },
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) throw new Error('User already exists');

      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, jwtOptions.secret, jwtOptions.exp) };
    }
  }
};

export default resolvers;
