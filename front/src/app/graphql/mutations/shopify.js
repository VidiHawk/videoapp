import { gql } from '@apollo/client'

export const CREATE_SHOPIFY_CUSTOMER = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const CREATE_SHOPIFY_TOKEN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const INITIATE_CHECKOUT = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const ADD_TO_CART = gql`
  mutation checkoutLineItemsAdd($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const UPDATE_CART_ITEM = gql`
  mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const CHECKOUT_ADD_ADDRESS = gql`
  mutation checkoutShippingAddressUpdateV2($shippingAddress: MailingAddressInput!, $checkoutId: ID!) {
    checkoutShippingAddressUpdateV2(shippingAddress: $shippingAddress, checkoutId: $checkoutId) {
      userErrors {
        field
        message
      }
      checkout {
        id
        shippingAddress {
          id
          firstName
          lastName
          address1
          province
          country
          zip
        }
      }
    }
  }
`

export const CHECKOUT_EMAIL_UPDATE = gql`
  mutation checkoutEmailUpdate($checkoutId: ID!, $email: String!) {
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const APPLY_PROMOCODE = gql`
  mutation checkoutDiscountCodeApplyV2($discountCode: String!, $checkoutId: ID!) {
    checkoutDiscountCodeApplyV2(discountCode: $discountCode, checkoutId: $checkoutId) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const REMOVE_PROMOCODE = gql`
  mutation checkoutDiscountCodeRemove($checkoutId: ID!) {
    checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const ADD_SHIPPING_METHOD = gql`
  mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
    checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const CHECKOUT_CREDIT_CARD = gql`
  mutation checkoutCompleteWithTokenizedPaymentV3($checkoutId: ID!, $payment: TokenizedPaymentInputV3!) {
    checkoutCompleteWithTokenizedPaymentV3(checkoutId: $checkoutId, payment: $payment) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      payment {
        id
        errorMessage
        nextActionUrl
        test
        transaction {
          kind
          statusV2
          test
        }
      }
    }
  }
`

export const UPDATE_SHIPPING_RATE = gql`
  mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
    checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const ASSOCIATE_CUSTOMER = gql`
  mutation associateCustomerWithCheckout($checkoutId: ID!, $customerAccessToken: String!) {
    checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`

export const ADD_ADDRESS = gql`
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const UPDATE_ADDRESS = gql`
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const DELETE_ADDRESS = gql`
  mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
    customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`

export const MARK_DEFAULT_ADDRESS = gql`
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`
