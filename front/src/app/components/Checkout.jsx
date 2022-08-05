import React, { useEffect, useState, Fragment, useContext } from 'react'
import AuthContext from './../helpers/authContext'
import { StaticLogoHeader } from './Partials/Header'
import { Row, Col, Switch, Divider, Collapse, Input, Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import AddressSelection from './Checkout/AddressSelection';
import ContactInformation from './Checkout/ContactInformation';
import ShippingMethod from './Checkout/ShippingMethod';
import CartItems from './Cart/CartItems';
import ApplyCoupon from './Cart/ApplyCoupon';
import { NoItems } from './Common/EmptyPages';
import AppleIcon from './../../../public/images/small-apple.svg'
import ShopPayIcon from './../../../public/images/shopPay.svg'
import AmazonIcon from './../../../public/images/amazon.svg'
import PaypalIcon from './../../../public/images/paypal.svg'
import DotIcon from './../../../public/images/dot.svg'
import CollapsedIcon from './../../../public/images/panel-collapsed.svg'
import ExpandIcon from './../../../public/images/panel-expand.svg'
import CartIcon from './../../../public/images/icon_bag_light.svg';
import { clearCart } from './../helpers/helpers';
const { Panel } = Collapse

const Checkout = (props) => {
  if (props.loading) return null
  const [activeLink, setActiveLink] = useState(props.activeLink)
  const [iseditInformation, setIsEditInformation] = useState(true)
  const [iseditShipping, setIsEditShipping] = useState(true)

  useEffect(() => {
    if (activeLink == 'information') setIsEditInformation(true)
    else if (activeLink == 'shipping') setIsEditShipping(true)
  }, [activeLink])

  useEffect(() => {
    setActiveLink(props.activeLink)
  }, [props.activeLink])

  const editContact = () => {
    setActiveLink('information')
  }

  const editAddress = () => {
    setActiveLink('information')
  }

  if (
    props &&
    props.cartItems &&
    props.cartItems.node &&
    props.cartItems.node.lineItems &&
    props.cartItems.node.lineItems.edges &&
    props.cartItems.node.lineItems.edges.length
  ) {
    return (
      <div className="cart-checkout">
        <StaticLogoHeader {...props} />
        <div className="cart-container">
        <TopLinks {...props} activeLink={activeLink} setActiveLink={setActiveLink} />
        <Divider />
        <OrderSummary {...props} />
        <Divider />
        {activeLink == 'information' && (
          <Information {...props} setActiveLink={setActiveLink} iseditInformation={iseditInformation} />
        )}
        {activeLink == 'shipping' && (
          <Shipping
            {...props}
            setActiveLink={setActiveLink}
            editContact={editContact}
            editAddress={editAddress}
            iseditShipping={iseditShipping}
          />
        )}

        {/* UNCOMMENT THIS LINE WHEN ADMIN PANEL IS READY AND WE WILL GO WITH OUR OWN CHECKOUR  */}

        {/* {activeLink == 'payment' && <Payment {...props} setActiveLink={setActiveLink} />} */}
        </div>
      </div>
    )
  } else return <NoItems {...props} />
}

const Information = (props) => {
  const [contactForm] = Form.useForm()
  const [addressForm] = Form.useForm()

  const submitInformation = () => {
    contactForm.submit()
    addressForm.submit()
  }

  return (
    <Fragment>
      {/* <ExpressCheckout {...props} />
      <Divider>OR</Divider> */}
      <div className="cart-form">
        <ContactInformation {...props} form={contactForm} />
      </div>
      <Divider />
      <div className="cart-form">
        <AddressSelection {...props} form={addressForm} />
        <Button onClick={() => submitInformation()} className="primary-btn">Continue to shipping</Button>
      </div>
      <Divider />
    </Fragment>
  )
}

const Shipping = (props) => {
  const context = useContext(AuthContext)
  const [shippingMethod, setShippingMethod] = useState('')
  const webURL =
    props.cartItems && props.cartItems.node && props.cartItems.node.webUrl ? props.cartItems.node.webUrl : ''

  useEffect(() => {
    if (
      props.cartItems &&
      props.cartItems.node &&
      props.cartItems.node.shippingLine &&
      props.cartItems.node.shippingLine.handle
    ) {
      setShippingMethod(props.cartItems.node.shippingLine.handle)
    }
  }, [props.cartItems])

  const goToPayment = () => {
    if (shippingMethod) {
      props.saveShippingMethod(shippingMethod, () => {
        clearCart();
        props.history.push('/cart');
        if (webURL) window.open(webURL, '_blank')
        else context.showToastMessage({ message: 'Something went wrong', type: 'error' })
      })
    }
    else{
      context.showToastMessage({ message: 'Please select a shipping method', type: 'error' })
    }
  }

  return (
    <div>
      <div className="shipping cart-form">
        <ContactInformation {...props} allowOnlyEdit={true} />
        <Divider />
        <AddressSelection {...props} allowOnlyEdit={true}/>
        <Divider />
        <ShippingMethod {...props} setShippingMethod={setShippingMethod} />
        <Button onClick={() => goToPayment()}>Continue to payment</Button>
      </div>
    </div>
  )
}

//DO NOT REMOVE THIS COMMENTED CODE, IT NEEDS TO BE ADDED BACK ONCE OUR ADMIN PANEL IS READY FOR DYNAMIC CHECKOUT

// const Payment = (props) => {
//   const initialValues = {}

//   const onFinish = (values) => {
//     props.payNow(values, () => {})
//   }

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo)
//   }

//   return (
//     <div>
//       <div className="payment cart-form">
//         <ContactInformation {...props} allowOnlyEdit={true} />
//         <Divider />
//         <AddressSelection {...props} allowOnlyEdit={true} />
//         <Divider />
//         <ShippingMethod {...props} allowOnlyEdit={true} />
//         <Divider />

//         <Row>
//           <Col span="24">
//             <div className="cart-title">Payment</div>
//             <div className="cart-description">All transactions are secure and encrypted</div>
//           </Col>
//         </Row>

//         <Form name="basic" initialValues={initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//           <Form.Item
//             name="cardName"
//             rules={[{ required: true, message: 'Enter the name exactly as it’s written on your card' }]}
//           >
//             <Input placeholder="Name on Card" />
//           </Form.Item>

//           <Form.Item name="cardNumber" rules={[{ required: true, message: 'Enter a valid card number' }]}>
//             <Input placeholder="Card number" />
//           </Form.Item>

//           <Form.Item name="cvv" rules={[{ required: true, message: 'Enter the CVV or security code on your card' }]}>
//             <Input placeholder="Security number" />
//           </Form.Item>

//           <Form.Item name="expiry" rules={[{ required: true, message: 'Enter the expiration date on your card' }]}>
//             <Input placeholder="Expiration date (MM/YYYY)" />
//           </Form.Item>

//           <Button htmlType="submit">Pay Now</Button>
//         </Form>
//       </div>
//     </div>
//   )
// }

const TopLinks = (props) => {
  const { activeLink } = props

  return (
    <div>
      <Row className="top-links">
        <Col span="8" className={`top-links-item text-left ${activeLink == 'information' && 'active'}`}>
          <div>Information</div>
          {activeLink == 'information' && (
            <div className="dot-icon dot-icon-first">
              <DotIcon />
            </div>
          )}
        </Col>
        <Col span="8" className={`top-links-item text-center ${activeLink == 'shipping' && 'active'}`}>
          <div>Shipping</div>
          {activeLink == 'shipping' && (
            <div className="dot-icon dot-icon-second">
              <DotIcon />
            </div>
          )}
        </Col>
        <Col span="8" className={`top-links-item text-right ${activeLink == 'payment' && 'active'}`}>
          <div>Payment</div>
          {activeLink == 'payment' && (
            <div className="dot-icon dot-icon-third">
              <DotIcon />
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

const OrderSummary = (props) => {
  const totalPrice =
    props.cartItems &&
    props.cartItems.node &&
    props.cartItems.node.totalPriceV2 &&
    props.cartItems.node.totalPriceV2.amount
      ? props.cartItems.node.totalPriceV2.amount
      : 0
  return (
    <div className="order-summary">
      {/* <CartIcon className="order-summary-cart-icon" /> */}
      <Collapse
        bordered={false}
        className="site-collapse-custom-collapse"
        expandIcon={({ isActive }) => (isActive ? <ExpandIcon /> : <CollapsedIcon />)}
      >
        <div className="total-cart">${totalPrice}</div>
        <Panel header="Show order summary" key="1" className="site-collapse-custom-panel">
          <div className="my-cart">
            <CartItems updateQuantity={props.updateQuantity} items={props.cartItems.node.lineItems.edges} />
            <Terms {...props} />
            <ApplyCoupon {...props} />
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}

const ExpressCheckout = (props) => {
  return (
    <div>
      <div className="express-checkout">
        <div className="cart-title">Express checkout</div>
        <div className="express-checkout-option">
          <AppleIcon /> Apple Pay
        </div>
        <div className="express-checkout-option">
          <PaypalIcon /> Paypal
        </div>
        <div className="express-checkout-option">
          <AmazonIcon /> pay
        </div>
        <div className="express-checkout-option">
          <ShopPayIcon />
        </div>
      </div>
    </div>
  )
}

const Terms = (props) => {
  const onChange = () => {}
  return (
    <div className="terms">
      <div>
          I have read and accept the <Link to="/">Terms of Use</Link> and <Link to="/">Privacy Policy</Link>.
      </div>
      <Switch onChange={onChange} />
    </div>
  )
}

export default Checkout
