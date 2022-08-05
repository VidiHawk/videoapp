import React, { Fragment, useState, useEffect } from 'react'
import { Input, Row, Col, Switch, Form } from 'antd'
import EditIcon from './../../../../public/images/edit-icon.svg'

const ContactInformation = (props) => {
  const { cartItems } = props
  const [editContact, setEditContact] = useState(props.iseditInformation)
  const [cartEmail, setCartEmail] = useState('')

  useEffect(() => {
    if (cartItems && cartItems.node && cartItems.node.email) {
      setCartEmail(cartItems.node.email)
    }
  }, [cartItems])

  return (
    <Fragment>
      {cartEmail && !editContact ? (
        <ContactDetail {...props} cartEmail={cartEmail} setEditContact={setEditContact} />
      ) : (
        <ContactForm {...props} cartEmail={cartEmail} />
      )}
    </Fragment>
  )
}

const ContactDetail = (props) => {
  const { cartEmail } = props
  const editContact = () => {
    props.setActiveLink('information')
  }

  return (
    <div>
      <div className="contact-information">
        <Row>
          <Col span="20">
            <div className="cart-title">Contact</div>
            <div className="cart-description">{cartEmail}</div>
          </Col>
          <Col span="4" className="text-right">
            <EditIcon onClick={() => editContact()} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

const ContactForm = (props) => {
  const initialValues = { email: props.cartEmail }
  const [newsLetters, setNewsLetters] = useState(true);

  useEffect(() => {
    if (props.form) props.form.setFieldsValue({ email: props.cartEmail })
  }, [props.form, props.cartEmail])

  const onFinish = (values) => {
    props.saveCustomerEmail(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Error:', errorInfo)
  }

  const onChange = () => {
    setNewsLetters(!newsLetters);
  }

  return (
    <div>
      <div className="contact-information">
        <div className="cart-title">Contact information</div>
        {/* <div className="contact-information-desc">
          You can also pay by credit card but you need to <a>Log in</a> first
        </div> */}
        <Form
          form={props.form}
          name="contactForm"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[
              { type: 'email', message: 'Please input valid email!' },
              { required: true, message: 'Please input your email!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Form>
        <Row>
          <Col span="20">Keep me up to date on news and exclusive offers</Col>
          <Col span="4">
            <Switch onChange={onChange} checked={newsLetters}/>
          </Col>
        </Row>
      </div>
    </div>
  )
}


export default ContactInformation;