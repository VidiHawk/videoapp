import React, { useState, useEffect, useCallback } from 'react'
import { Form, Input, Typography } from 'antd'
import { Button, PrimarySwitch } from './../../Elements'

import CloseIcon from './../../../../../public/images/close_grey.svg'

export const EmailMarket = (props) => {
  const { isMobile = false } = props

  const isAuthenticated = !!localStorage.getItem('token')
  const [showEmailMarket, setShowEmailMarket] = useState(false)
  useEffect(() => {
    if (!isMobile) {
      const timeOut = setTimeout(() => {
        setShowEmailMarket(true)
      }, 120000) //set to 2 min
      return () => {
        clearTimeout(timeOut)
        setShowEmailMarket(false)
      }
    }
  }, [isMobile])

  const onFinish = useCallback(() => {}, [])

  const onFinishFailed = useCallback(() => {}, [])

  const onChangeNewsletter = useCallback(() => {}, [])
  const classNameEmail = !isMobile ? `club-container ${showEmailMarket && 'visible'}` : ''

  return (
    <>
      {!isMobile ? (
        <div className={classNameEmail}>
          <div className="col-0 col-md-8 col-xl-9 p-0" />
          <div className="auth-container col-12 col-md-4 col-xl-3">
            <div className="close-icon-container">
              <CloseIcon onClick={() => setShowEmailMarket(false)} alt="" />
            </div>
            <div className="page-title mt-5 mb-3 ">
              Get EMK sent straight
              <br /> to your inbox!
            </div>
            <div className="page-sub-title mb-5">
              And get a special 25% off welcome
              <br />
              offer for new subscribers
            </div>
            <Form
              className="form-container mt-3"
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {!isAuthenticated && (
                <>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input placeholder="Name" className="form-input" />
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
                </>
              )}
              <div className="checkbox-container">
                <Typography className="label-checkbox">
                  I acccept receive promotions with <br /> the Newsletter
                </Typography>
                <PrimarySwitch onChange={onChangeNewsletter} />
              </div>

              <div className="checkbox-container">
                <Typography className="label-checkbox">I accept receive push notifications</Typography>
                <PrimarySwitch onChange={onChangeNewsletter} />
              </div>

              <div className="checkbox-container">
                <Typography className="label-checkbox">I acccept receive SMS notifications</Typography>
                <PrimarySwitch onChange={onChangeNewsletter} />
              </div>

              <Form.Item className="mt-5">
                <Button>Join the Club</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative', zIndex: 3 }}>
          <div className="" />
          <div className="auth-container col-12">
            <div className="page-title " style={{ fontSize: '24px' }}>
              Get EMK sent straight
              <br /> to your inbox!
            </div>
            <div className="page-sub-title mb-5">
              And get a special 25% off welcome
              <br />
              offer for new subscribers
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
              {!isAuthenticated && (
                <>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input placeholder="Name" className="form-input" />
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
                </>
              )}
              <div className="checkbox-container">
                <Typography className="label-checkbox">
                  I acccept receive promotions with <br /> the Newsletter
                </Typography>
                <PrimarySwitch onChange={onChangeNewsletter} />
              </div>

              <div className="checkbox-container">
                <Typography className="label-checkbox">I accept receive push notifications</Typography>
                <PrimarySwitch onChange={onChangeNewsletter} />
              </div>

              <div className="checkbox-container">
                <Typography className="label-checkbox">I acccept receive SMS notifications</Typography>
                <PrimarySwitch onChange={onChangeNewsletter} />
              </div>

              <Form.Item>
                <Button>Join the Club</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  )
}
