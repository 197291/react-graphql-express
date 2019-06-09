import ApolloClient from 'apollo-boost';
import { getToken, removeToken } from '../helpers';

const client = new ApolloClient({
  uri: `http://localhost:4444/graphql`,
  fetchOptions: {
    credentials: 'include'
  },
  request: (operation) => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      if (networkError.statusCode === 401) {
        removeToken();
      }
    }
  }
});

export default client;
