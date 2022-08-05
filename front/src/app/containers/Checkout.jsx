import React, { useEffect, useContext, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import Checkout from './../components/Checkout'
import { GET_CART, GET_SHIPPING_METHOD } from './../graphql/queries'
import Util from './../../client/custom'
import {
  CHECKOUT_ADD_ADDRESS,
  UPDATE_CART_ITEM,
  CHECKOUT_EMAIL_UPDATE,
  ADD_SHIPPING_METHOD,
  APPLY_PROMOCODE,
} from './../graphql/mutations'
import ShopifyGraphClient from './../graphql/client'
import AuthContext from './../helpers/authContext'

const shopifyClient = ShopifyGraphClient()

const CheckoutContainer = (props) => {
  const context = useContext(AuthContext)
  const [activeLink, setActiveLink] = useState('information')
  const [contactSubmit, setContactSubmit] = useState(false)
  const [addressSubmit, setAddressSubmit] = useState(false)
  const [shippingSubmit, setShippingSubmit] = useState(false)
  const [cart, setCart] = useState({})

  const [getCart, { data: cartItems, loading, refetch: refetchCart }] = useLazyQuery(GET_CART, {
    client: shopifyClient,
  })

  const [
    getShippingMethod,
    { data: shippingMethods, loading: loadingShipping, refetch: refetchShipping },
  ] = useLazyQuery(GET_SHIPPING_METHOD, {
    client: shopifyClient,
  })

  const [addAddress] = useMutation(CHECKOUT_ADD_ADDRESS, { client: shopifyClient })
  const [addEmail] = useMutation(CHECKOUT_EMAIL_UPDATE, { client: shopifyClient })
  const [updateCart] = useMutation(UPDATE_CART_ITEM, { client: shopifyClient })
  const [updateShippingMethod] = useMutation(ADD_SHIPPING_METHOD, { client: shopifyClient })
  const [applyPromocode] = useMutation(APPLY_PROMOCODE, { client: shopifyClient })

  useEffect(() => {
    getCartCall()
  }, [])

  useEffect(() => {
    if (addressSubmit && contactSubmit) {
      setActiveLink('shipping')
    }
  }, [contactSubmit, addressSubmit])

  useEffect(() => {
    if (shippingSubmit) {
      setActiveLink('payment')
    }
  }, [shippingSubmit])

  useEffect(() => {
    if (cartItems && cartItems.node) {
      if (cartItems.node.order && cartItems.node.order.id) {
        setCart({})
        Util.removeLocalstorage('checkoutId')
        Util.removeLocalstorage('emkProducts')
      } else if (cartItems.node.shippingAddress && cartItems.node.shippingAddress.id) {
        const checkoutId = Util.getLocalstorage('checkoutId')
        getShippingMethod({ variables: { id: checkoutId } })
        setCart(cartItems)
      } else setCart(cartItems)
    }
  }, [cartItems])

  const getCartCall = () => {
    const checkoutId = Util.getLocalstorage('checkoutId')
    if (checkoutId) {
      getCart({ variables: { id: checkoutId } })
    }
  }

  /**
   * Create or update user's shipping address in shopify
   * @param {*} params
   * @param {*} cb
   */
  const createAddress = (params, cb) => {
    const checkoutId = Util.getLocalstorage('checkoutId')
    addAddress({ variables: { checkoutId, shippingAddress: params } }).then((resp) => {
      const errors = resp.data.checkoutShippingAddressUpdateV2.userErrors
      if (errors && errors.length) {
        context.showToastMessage({ message: errors[0].message, type: 'error' })
      } else {
        setAddressSubmit(true)
        refetchCart({ variables: { id: checkoutId } })
        refetchShipping({ variables: { id: checkoutId } })
        cb(resp)
      }
    })
  }

  /**
   * This function will save user's email as a customer in shopify
   * @param {*} params
   */
  const saveCustomerEmail = (params) => {
    const checkoutId = Util.getLocalstorage('checkoutId')
    addEmail({ variables: { checkoutId, email: params.email } }).then((resp) => {
      const errors = resp.data.checkoutEmailUpdate.checkoutUserErrors
      if (errors && errors.length) {
        context.showToastMessage({ message: errors[0].message, type: 'error' })
      } else {
        setContactSubmit(true)
        refetchCart({ variables: { id: checkoutId } })
      }
    })
  }

  /**
   * Function to be used to save/modify shipping method
   * @param {*} handle
   * @param {*} cb
   */
  const saveShippingMethod = (handle, cb) => {
    const checkoutId = Util.getLocalstorage('checkoutId')
    updateShippingMethod({ variables: { checkoutId, shippingRateHandle: handle } }).then((resp) => {
      setShippingSubmit(true)
      refetchCart({ variables: { id: checkoutId } })
      cb()
    })
  }

  const updateQuantity = (lineItems) => {
    context.showSpinner()
    const checkoutId = Util.getLocalstorage('checkoutId')
    updateCart({ variables: { checkoutId, lineItems } }).then((resp) => {
      refetchCart({ variables: { id: checkoutId } })
      context.hideSpinner()
    })
  }

  const applyCoupon = (coupon, cb) => {
    context.showSpinner()
    const checkoutId = Util.getLocalstorage('checkoutId')
    applyPromocode({ variables: { checkoutId, discountCode: coupon } }).then((resp) => {
      refetchCart({ variables: { id: checkoutId } })
      context.hideSpinner()
      cb(resp)
    })
  }

  return (
    <Checkout
      {...props}
      cartItems={cart}
      shippingMethods={shippingMethods}
      loading={loading}
      createAddress={createAddress}
      saveCustomerEmail={saveCustomerEmail}
      saveShippingMethod={saveShippingMethod}
      updateQuantity={updateQuantity}
      // payNow={payNow}
      applyCoupon={applyCoupon}
      activeLink={activeLink}
    />
  )
}

export default CheckoutContainer
