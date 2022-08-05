import React, { useState } from 'react'
import { Button, Switch } from 'antd'
import { Link } from 'react-router-dom'
import CartItems from './Cart/CartItems'
import ApplyCoupon from './Cart/ApplyCoupon'
import { CartBG } from './Common/Preact'
import { NoItems } from './Common/EmptyPages'
import { formatPrice } from '../helpers/helpers'
import { StaticHeader } from './Partials/Header'

const Cart = (props) => {
  const [termsChecked, setTermsChecked] = useState(true)

  if (props.loading) return <CartBG />

  if (
    props &&
    props.cartItems &&
    props.cartItems.node &&
    props.cartItems.node.lineItems &&
    props.cartItems.node.lineItems.edges &&
    props.cartItems.node.lineItems.edges.length
  ) {

    return (
      <div className='full-height overflow-y-scroll'>
        <StaticHeader {...props}/>
        <div className='cart-container'>
          <div className='my-cart'>
            <CartItems updateQuantity={props.updateQuantity} items={props.cartItems.node.lineItems.edges} />
            <Terms {...props} termsChecked={termsChecked} setTermsChecked={setTermsChecked} />
            <ApplyCoupon {...props} />
          </div>
          <Checkout {...props} termsChecked={termsChecked} />
        </div>
      </div>
    )
  } else return <NoItems {...props} />
}

const Terms = (props) => {
  const onChange = () => {
    props.setTermsChecked(!props.termsChecked)
  }
  return (
    <div className='terms'>
      <div>
        I have read and accept the <Link to='/'>Terms of Use</Link> and <Link to='/'>Privacy Policy</Link>.
      </div>
      <Switch onChange={onChange} checked={props.termsChecked} />
    </div>
  )
}

const Checkout = (props) => {
  const itemsCount = props.cartItems.node.lineItems.edges.length
  const price = props.cartItems.node.totalPriceV2.amount
  return (
    <div className='checkout-area'>
      <div className='subtotal-area'>
        <span>Subtotal ({itemsCount} items)</span>
        <span className='subtotal'>${formatPrice(price)}</span>
      </div>
      <div className='info-text'>Shipping & taxes calculated at checkout</div>
      <Link to='/checkout'>
        <Button disabled={!props.termsChecked}>Proceed to Checkout</Button>
      </Link>
    </div>
  )
}

export default Cart
