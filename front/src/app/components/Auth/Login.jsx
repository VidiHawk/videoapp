import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Form, Input, Row, Typography } from 'antd'
import { Button } from './../Elements'
import CloseIcon from './../../../../public/images/close_grey.svg'
import EMKLogo from './../../../../public/images/EMK-Logo-white-Linear.svg'
import EMKLogoBlack from './../../../../public/images/EMK-Logo-Black-Linear.svg'
import AuthContext from './../../helpers/authContext'
import { useLazyQuery } from '@apollo/client'
import { GET_CUSTOMER_DETAILS } from '../../graphql/queries'
import ShopifyGraphClient from '../../graphql/client'

const shopifyClient = ShopifyGraphClient()

const Login = (props) => {
  // const googleProvider = new firebase.auth.GoogleAuthProvider()
  // const facebookProvider = new firebase.auth.FacebookAuthProvider()
  // const appleProvider = new firebase.auth.OAuthProvider('apple.com')
  const context = useContext(AuthContext)
  const { theme } = context

  const [validateStatus, setValidateStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const [customerDetails, { data: customerData }] = useLazyQuery(GET_CUSTOMER_DETAILS, {
    client: shopifyClient,
  })

  useEffect(() => {
    if (customerData && customerData.customer) {
      const password = formRef.current.getFieldValue('password')
      doLogin({
        email: customerData.customer.email,
        password,
        customerId: customerData.customer.id
      }, { 'x-vidiren-shopify-verified': 1 })
    }
  }, [customerData])

  const onFinish = (values) => {
    setValidateStatus('validating')
    props.preLoginActivity(values, (success) => {
      if (success) {
        let customerAccessToken = localStorage.getItem('customerAccessToken')
        customerDetails({ variables: { customerAccessToken } })
      }
      else setValidateStatus('error')
    })
  }

  const doLogin = (values, headers) => {
    props.login(values, headers).then(response=>{
      if(response && response[0]){
        if(response[0].error) context.showToastMessage({ message: response[0].error.title, type: 'error' })
        else if(response[0].registration){//USER IS NOT REGISTERED WITH US BUT IS REGISTERED WITH SHOPIFY
          setValidateStatus('success')
          props.registerShopifyUser(values);
          Util.setCookie('SIGN_UP_TOKEN', response[0].token);

        }
        else{
          Util.setCookie('SSO_TOKEN', response[0].token);
          props.postLoginActivity(values);
        }
      }
      else context.showToastMessage({ message: 'Something went wrong!', type: 'error' })
    })
  }

  // const socialSignIn = (provider) => {
  //   if (!firebase.apps.length) {
  //     firebase.initializeApp(config.FIREBASE_CONFIG)
  //   }
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((res) => {
  //       res.user
  //         .getIdToken(true)
  //         .then((idToken) => {
  //           socialLogin({ variables: { idToken } })
  //             .then((res) => {
  //               if (res.data.SocialLogin.status) {
  //                 localStorage.setItem('token', res.data.SocialLogin.accessToken)
  //                 context.setAuthenticated(true)
  //                 // if (redirectUrl) {
  //                 //   history.push(redirectUrl)
  //                 // } else {
  //                 // }
  //                 history.push('/discover')
  //               }
  //             })
  //             .catch(() => {})
  //         })
  //         .catch(() => {})
  //     })
  //     .catch(() => {})
  // }

  const handleClickClose = () => {
    context.closeLoginPopup();
  }

  const onValuesChange = () => {
    
  }

  let dynamicClass = 'auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  return (
    <div>
      <Row>
        <Col md={16} xxl={18} span={0} />
        <Col md={8} xxl={6} span={24} className={dynamicClass}>
          <div className="position-relative d-md-none d-block">
            <div className="close-icon-container">
              <CloseIcon onClick={handleClickClose} />
            </div>
            <div className="logo-container">
              {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
            </div>
          </div>
          <div className="d-none d-md-block text-right mb-5">
            <div className="close-icon-container">
              <CloseIcon onClick={handleClickClose} />
            </div>
            <div className="logo-container">
              {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
            </div>
          </div>
          <Form
            className="form-container"
            name="Login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            ref={formRef}
          >
            <Form.Item
              name="email"
              hasFeedback={true}
              validateStatus={validateStatus}
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input placeholder="Email" className="form-input" />
            </Form.Item>

            <Form.Item
              name="password"
              hasFeedback={true}
              validateStatus={validateStatus}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Password" className="form-input" />
            </Form.Item>

            <Form.Item className="forgot-container">
              <a role="button" className="btn-link" onClick={()=>props.setPage('forget')}>
                <span>Forgot Password?</span>
              </a>
            </Form.Item>

            <Form.Item className="btn-register">
              <Button loading={loading} htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
            <Form.Item className="register-container">
              <Typography>Do not have an account? </Typography>
              <a role="button" onClick={()=>props.setPage('register')} className="btn-link">
                <span>Register</span>
              </a>
            </Form.Item>
          </Form>
          {/* <Divider className="auth-divider">OR</Divider>
          <Row justify="center">
            <Col span={4} className="icon-container">
              <div className="btn-facebook">
                <FacebookIcon onClick={() => socialSignIn(facebookProvider)} />
              </div>
            </Col>
            <Col span={4} className="icon-container">
              <div className="btn-google">
                <GoogleIcon onClick={() => socialSignIn(googleProvider)} />
              </div>
            </Col>
            <Col span={4} className="icon-container">
              <div className="btn-apple">
                <AppleIcon onClick={() => socialSignIn(appleProvider)} />
              </div>
            </Col>
          </Row> */}
        </Col>
        
      </Row>
    </div>
  )
}



export default Login;
