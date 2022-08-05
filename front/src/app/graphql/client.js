import { ApolloClient } from '@apollo/client'
import { shopifyHttpLink, shopifyAuthLink } from './apollo-links'
import { InMemoryCache } from 'apollo-cache-inmemory'

let shopifyClient


const ShopifyGraphClient = () => {
  if (shopifyClient) return shopifyClient
  else {
    shopifyClient = new ApolloClient({
      link: shopifyAuthLink.concat(shopifyHttpLink),
      cache: new InMemoryCache(),
    })
    return shopifyClient
  }
}

export default ShopifyGraphClient;
