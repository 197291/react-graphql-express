import jwt from 'jsonwebtoken';

import { jwtOptions } from '../config/environment';

const createToken = (user, secret, expiresIn) => {
  const { username, email} = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
}

const resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find();
      return allRecipes;
    }
  },
  Mutation: {
    addRecipe: async (
      root,
      {
        name, category, description,
        instructions, username
      },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        category,
        description,
        instructions,
        username
      })
      .save();
      return newRecipe;
    },
    signupUser: async (root, { username, email, password }, { User }) => {
        const user = await User.findOne({ username });
        if (user) {
          throw new Error('User already exists')
        }
        const newUser = await new User({
          username,
          email,
          password
        })
        .save();
        return { token: createToken(newUser, jwtOptions.secret, jwtOptions.exp) }
    }
  }
};

export default resolvers;
