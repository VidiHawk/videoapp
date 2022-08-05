import React, { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import Cart from './../components/Cart'
import ShopifyGraphClient from './../graphql/client'
import { GET_CART } from '../graphql/queries'
import { APPLY_PROMOCODE, UPDATE_CART_ITEM } from '../graphql/mutations'
import AuthContext from './../helpers/authContext'
import { Col, Row } from 'antd'
const shopifyClient = ShopifyGraphClient()

const CartContainer = (props) => {
  if(typeof Util !== 'undefined'){
  const context = useContext(AuthContext)
    const { theme } = context
  const [getCart, { data: cartItems, loading, refetch: refetchCart }] = useLazyQuery(GET_CART, {
    client: shopifyClient,
  })
  const [updateCart] = useMutation(UPDATE_CART_ITEM, { client: shopifyClient })
  const [applyPromocode] = useMutation(APPLY_PROMOCODE, { client: shopifyClient })

  useEffect(() => {
    getCartCall()
  }, [])

  const getCartCall = () => {
    const checkoutId = Util.getLocalstorage('checkoutId')
    if (checkoutId) {
      getCart({ variables: { id: checkoutId } })
    }
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

  let dynamicClass = 'auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  const outsideClick = () => {
    context.closeCartPopup();
  }

  return (
    <Row>
      <Col md={16} xxl={18} span={0} className='bg-container' onClick={outsideClick}/>
      <Col md={8} xxl={6} span={24} className={dynamicClass}>
        <Cart
          {...props}
          cartItems={cartItems}
          loading={loading}
          updateQuantity={updateQuantity}
          applyCoupon={applyCoupon}
        />
      </Col>
    </Row>
  )
  }
  else return null;
}

export default CartContainer
