import { gql } from '@apollo/client'

export const GET_SHOPIFY_PRODUCT = gql`
  query products($first: Int, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          variants(first: 250) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`

export const GET_CUSTOMER_DETAILS = gql`
  query customer($customerAccessToken: String!){
    customer(customerAccessToken: $customerAccessToken){
      id
      email
      firstName
      lastName
    }
  }
`

export const GET_CART = gql`
  query node($id: ID!) {
    node(id: $id) {
      id
      ... on Checkout {
        id
        webUrl
        currencyCode
        totalPriceV2 {
          amount
          currencyCode
        }
        email
        requiresShipping
        shippingAddress {
          address1
          address2
          city
          company
          country
          countryCodeV2
          firstName
          formatted
          formattedArea
          id
          lastName
          latitude
          longitude
          name
          phone
          province
          provinceCode
          zip
        }
        shippingLine {
          priceV2 {
            amount
            currencyCode
          }
          title
          handle
        }

        lineItems(first: 100) {
          edges {
            node {
              id
              title
              quantity
              unitPrice {
                amount
                currencyCode
              }
              discountAllocations {
                allocatedAmount {
                  amount
                  currencyCode
                }
                discountApplication {
                  value
                  targetSelection
                  targetType
                  allocationMethod
                }
              }
              variant {
                id
                title
                weight
                sku
                image {
                  id
                  originalSrc
                }
                selectedOptions {
                  name
                  value
                }
                priceV2 {
                  amount
                  currencyCode
                }
                unitPrice {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                product{
                  id
                }
              }
            }
          }
        }
        order {
          id
          name
          orderNumber
          processedAt
          fulfillmentStatus
        }
      }
    }
  }
`

export const GET_SHIPPING_METHOD = gql`
  query node($id: ID!) {
    node(id: $id) {
      id
      ... on Checkout {
        id
        webUrl
        availableShippingRates {
          ready
          shippingRates {
            handle
            priceV2 {
              amount
            }
            title
          }
        }
      }
    }
  }
`

export const GET_ADDRESSES = gql`
  query customer($customerAccessToken: String!, $first: Int!, $after: String) {
    customer(customerAccessToken: $customerAccessToken) {
      addresses(first: $first, after: $after) {
        edges {
          cursor
          node {
            address1
            address2
            city
            company
            country
            countryCodeV2
            firstName
            formatted
            formattedArea
            id
            lastName
            latitude
            longitude
            name
            phone
            province
            provinceCode
            zip
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      defaultAddress {
      id
      }
    }
  }
`
export const GET_ORDERS_LIST = gql`
  query customer($customerAccessToken: String!, $first: Int!, $after: String) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            orderNumber
            fulfillmentStatus
            processedAt
            cancelReason
            canceledAt
            currentSubtotalPrice {
              amount
              currencyCode
            }
            currentTotalPrice {
              amount
              currencyCode
            }
            currentTotalTax {
              amount
              currencyCode
            }
            originalTotalPrice {
              amount
              currencyCode
            }
            subtotalPriceV2 {
              amount
              currencyCode
            }
            lineItems(first: 50) {
              edges {
                cursor
                node {
                  title
                  discountedTotalPrice {
                    amount
                    currencyCode
                  }
                  originalTotalPrice {
                    amount
                    currencyCode
                  }
                  variant {
                    id
                    title
                    image {
                      id
                      originalSrc
                    }
                    selectedOptions {
                      name
                      value
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                    unitPrice {
                      amount
                      currencyCode
                    }
                    compareAtPriceV2 {
                      amount
                      currencyCode
                    }
                    product{
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GET_ORDER_DETAIL = gql`
  query node($id: ID!) {
    node(id: $id) {
      id
      ... on Order {
        id
        orderNumber
        fulfillmentStatus
        processedAt
        cancelReason
        canceledAt
        currentSubtotalPrice {
          amount
          currencyCode
        }
        currentTotalPrice {
          amount
          currencyCode
        }
        currentTotalTax {
          amount
          currencyCode
        }
        originalTotalPrice {
          amount
          currencyCode
        }
        subtotalPriceV2 {
          amount
          currencyCode
        }
        shippingAddress {
          id
          address1
          address2
          city
          company
          country
          countryCodeV2
          firstName
          lastName
          formatted
          name
          phone
          province
          zip
        }
        lineItems(first: 50) {
          edges {
            cursor
            node {
              title
              discountedTotalPrice {
                amount
                currencyCode
              }
              originalTotalPrice {
                amount
                currencyCode
              }
              variant {
                id
                title
                image {
                  id
                  originalSrc
                }
                selectedOptions {
                  name
                  value
                }
                priceV2 {
                  amount
                  currencyCode
                }
                unitPrice {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                product{
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`
