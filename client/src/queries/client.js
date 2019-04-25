import ApolloClient from 'apollo-boost';
import config from '../config';
import { getToken, removeToken } from '../helpers';

const client = new ApolloClient({
  uri: `${config.HOST}:${config.PORT}${config.GRAPHQL_ENDPOINT}`,
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.error('Network Error', networkError);

      if (networkError.statusCode === 401) {
        removeToken();
      }
    }
  }
})

export default client;
