
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink,ApolloClient, InMemoryCache,ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { getAccessToken } from '../utils/auth';

// const httpLink = new HttpLink({
//     uri: 'http://localhost:4000/graphql'
//   });

  const httpLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
      const token = getAccessToken();
      if (token) {
        operation.setContext({headers: {'authorization': `Bearer ${token}`}});
      }
      return forward(operation);
    }),
    new HttpLink({uri: 'http://localhost:4000/graphql'})
  ]);

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}));

function isSubscription(operation:any) {
    const definition = getMainDefinition(operation.query);
    return definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription';
  }

const client = new ApolloClient({
    cache: new InMemoryCache({
        addTypename:false
    }),
    link: split(isSubscription, wsLink, httpLink),
    defaultOptions: {query: {fetchPolicy: 'no-cache'}}
  });
  
  export default client;