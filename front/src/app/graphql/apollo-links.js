import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-fetch'
import config from './../../config/index'

/**
 * TEMPORARY FUNCTIONS FOR SHOPIFY - WILL BE REPLACED WITH ADMIN APIS LATER ON
 */

export const shopifyHttpLink = createHttpLink({ fetch, uri: config.SHOPIFY_CONFIG.API_ENDPOINT })

export const shopifyAuthLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Accept: 'application/json',
      'X-Shopify-Storefront-Access-Token': config.SHOPIFY_CONFIG.STOREFRONT_ACCESS_TOKEN,
    },
  }
})
