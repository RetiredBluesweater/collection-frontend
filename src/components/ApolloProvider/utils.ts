import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

interface CreateApolloClientOptions {
  httpURI: string;
  launchParams: string;
}

/**
 * Creates ApolloClient with websocket- and http-link
 * @param {CreateApolloClientOptions} options
 * @returns {ApolloClient<any>}
 */
export function createApolloClient(options: CreateApolloClientOptions): ApolloClient<any> {
  const { httpURI, launchParams } = options;

  // We can authenticate users only with launch parameters sent from VKontakte.
  // To check them on server side, we send them in header
  const link = new HttpLink({
    uri: httpURI,
    headers: { 'x-launch-params': launchParams },
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
}
