import React, { useContext, useState } from 'react'
import { Col, Form, Input, Row, Typography } from 'antd'
import { BackButton, Button } from './../Elements'
import EMKLogo from './../../../../public/images/EMK-Logo-white-Linear.svg'
import EMKLogoBlack from './../../../../public/images/EMK-Logo-Black-Linear.svg'
import AuthContext from '../../helpers/authContext'
import { FORGOT_PASSWORD } from '../../graphql/mutations/shopify'
import ShopifyGraphClient from '../../graphql/client'
import { useMutation } from '@apollo/client'

const shopifyClient = ShopifyGraphClient()

const ForgotPassword = (props) => {
  const context = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const { theme } = context

  const [forgotPassword] = useMutation(FORGOT_PASSWORD, {
    client: shopifyClient,
  })

  const onFinish = (values) => {
    const { email } = values
    props.setPage('confirmPassword')
    sendEmail(email)
  }

  const sendEmail = (email) => {
    forgotPassword({ variables: { email } }).then((shopifyRes) => {
      if (shopifyRes && shopifyRes.data && shopifyRes.data.customerRecover
        && shopifyRes.data.customerRecover.customerUserErrors && shopifyRes.data.customerRecover.customerUserErrors.length) {
        let error = shopifyRes.data.customerRecover.customerUserErrors[0]
        context.showToastMessage({ message: error.message, type: 'error' })
      } else {
        props.setPage('confirmPassword')
      }
    }).catch(() => {
      context.showToastMessage({ message: 'Something went wrong', type: 'error' })
    })
  }

  const onFinishFailed = () => {
    //console.log('Failed:', errorInfo)
  }

  const handleClickBack = () => props.setPage('login')

  let dynamicClass = 'auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  return (
    <Row>
      <Col md={16} xxl={18} span={0} className="bg-container" />
      <Col md={8} xxl={6} span={24} className={dynamicClass}>
        <div className="position-relative d-md-none d-block">
          <BackButton onClick={handleClickBack} />
          <div className="logo-container">
            {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
          </div>
        </div>
        <div className="d-none d-md-block">
          <BackButton onClick={handleClickBack} />
          <div className="logo-container">
            {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
          </div>
        </div>
        
        <Form
          className="form-container"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item className="mt-5 pt-5">
            <Typography className="text-explanation">
              Please enter your email address below to receive a password reset link.
            </Typography>
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder="Email" className="form-input" />
          </Form.Item>

          <Form.Item className="btn-register">
            <Button loading={loading}>Reset Password</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}


export default ForgotPassword;
