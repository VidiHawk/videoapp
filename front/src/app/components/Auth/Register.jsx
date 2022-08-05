import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Input, Alert, Typography, Form } from 'antd'
import { Button, PrimarySwitch, BackButton, ButtonLink } from './../Elements'
import EMKLogo from './../../../../public/images/EMK-Logo-white-Linear.svg'
import EMKLogoBlack from './../../../../public/images/EMK-Logo-Black-Linear.svg'
import AuthContext from '../../helpers/authContext'

const Register = (props) => {
  const context = useContext(AuthContext)
  const { theme } = context
  const history = useHistory()
  const [newsletter, setAcceptNewsletter] = useState(false)
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    props.preRegisterActivity(values, ()=>{
       checkIfAccountExists(values, ()=>{
        registerUser(values, ()=>{
          context.showToastMessage({ message: 'Your account is registered successfully! Logging you in ...', type: 'success' });
          props.postRegisterActivity(values);
        })
      })
    })
  }

  const checkIfAccountExists = (data, cb) =>{
    const { email, password} = data
    props.login({email, password}).then(response=>{
      if(response && response[0]){
        if(response[0].error) context.showToastMessage({ message: response[0].error.title, type: 'error' })
        else if(response[0].registration) {
          Util.setCookie('SIGN_UP_TOKEN', response[0].token);
          cb();
        }
        else{
          Util.setCookie('SSO_TOKEN', response[0].token);
          context.showToastMessage({ message: 'Your account is already registered with us. Logging you in ...', type: 'success' });
          props.postLoginActivity(values);
        }
      }
      else context.showToastMessage({ message: 'Something went wrong!', type: 'error' })
    })
  }

  const registerUser = (data, cb)=>{
    const { email, password, firstName, lastName } = data
    props.register({email, password, firstName, lastName}).then(response=>{
      if(response && response[0]){
        if(response[0].error) context.showToastMessage({ message: response[0].error.title, type: 'error' })
        else{
          Util.setCookie('SSO_TOKEN', response[0].token);
          cb()
        }
      }
      else context.showToastMessage({ message: 'Something went wrong!', type: 'error' })
    })
  }


  const onChangeNewsletter = (value) => {
    setAcceptNewsletter(value)
  }

  const handleClickBack = () => props.setPage('login')

  const Privacy = () => {
    return (
      <div className="label-privacy">
        I acccept <strong>Privacy Policy</strong> and <strong>Terms of use</strong>
      </div>
    )
  }

  let dynamicClass = 'auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  return (
    <div>
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
              privacy: true,
              promotions: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Please input your first name!',
                },
              ]}
            >
              <Input placeholder="First Name" className="form-input" />
            </Form.Item>

            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',
                },
              ]}
            >
              <Input placeholder="Last Name" className="form-input" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid e-mail!',
                },
                {
                  required: true,
                  message: 'Please input your e-mail!',
                },
              ]}
            >
              <Input placeholder="Email" className="form-input" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder="Password" className="form-input" />
            </Form.Item>
            <Form.Item
              name="privacy"
              label={<Privacy />}
              valuePropName="checked"
              // getValueProps={(value) => console.log(value)}
              className="v-privacy-wrapper"
              colon={false}
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('Please accept Privacy Policy and Terms of use'),
                },
              ]}
            >
              <PrimarySwitch />
            </Form.Item>

            <Form.Item name="promotions" valuePropName="checked">
              <div className="privacy-container">
                <Typography className="label-privacy">I acccept to receive promotions with the Newsletter</Typography>
                <PrimarySwitch onChange={onChangeNewsletter} checked />
              </div>
            </Form.Item>

            <Form.Item className="btn-register">
              <Button loading={loading}>Register</Button>
            </Form.Item>
           
          </Form>
          <div className="register-container">
            <Typography>Do you have an account?</Typography>
            <ButtonLink onClick={()=>props.setPage('login')}>Sign In</ButtonLink>
          </div>
        </Col>
      </Row>
    </div>
  )
}


export default Register;