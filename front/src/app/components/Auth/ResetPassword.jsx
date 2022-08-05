import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Form, Input, Row, Typography } from 'antd'
import { Button, ButtonLink } from './../Elements'
import EMKLogo from './../../../../public/images/EMK-Logo-white-Linear.svg'
import EMKLogoBlack from './../../../../public/images/EMK-Logo-Black-Linear.svg'
import AuthContext from '../../helpers/authContext'

export const ResetPassword = (props) => {
  const context = React.useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const { theme } = context
  const history = useHistory()
  const query = new URLSearchParams(history.location.search)
  const onFinish = (values) => {
    const { newPassword, token } = values
    props.verifyPassword({ password: newPassword, token }).then((resp) => {
      let errorMessage = 'Password reset successfully.';
      let alertType = 'success';
      if (resp && resp.length && resp[0].error) {
        errorMessage = 'Reset Password Failed!';
        alertType = 'error';
      } else {
        props.setPage('login')
      }
      context.showToastMessage({ message: errorMessage, type: alertType })
    }).catch(() => {
      context.showToastMessage({ message: 'Reset Password Failed!', type: 'error' })
    })
  }

  const onFinishFailed = () => {
  }

  const handleClickLogin = () => props.setPage('login')

  let dynamicClass = 'auth-container'
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  return (
    <Row>
      <Col md={16} xxl={18} span={0} className='bg-container' />
      <Col md={8} xxl={6} span={24} className={dynamicClass}>
        <div className='logo-container d-md-none d-block'>
          {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
        </div>
        <div className='logo-container d-none d-md-block mt-5'>
          {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
        </div>
        <Form
          className='form-container'
          name='basic'
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Form.Item
            name='token'
            rules={[
              {
                required: true,
                message: 'Please input your email token!'
              }
            ]}
          >
            <Input placeholder='Email Token' className='form-input' />
          </Form.Item>

          <Form.Item
            name='newPassword'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password placeholder='Password' className='form-input' />
          </Form.Item>

          <Form.Item
            name='confirm'
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('The two passwords that you entered do not match!')
                }
              })
            ]}
          >
            <Input.Password placeholder='Confirm Password' className='form-input' />
          </Form.Item>

          <Form.Item className='btn-register'>
            <Button loading={loading}>Update Password</Button>
          </Form.Item>
          <Form.Item className='signin-container'>
            <Typography>Back to</Typography>
            <ButtonLink htmlType='submit' onClick={handleClickLogin}>
              Sign In
            </ButtonLink>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
