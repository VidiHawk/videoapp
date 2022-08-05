import React, { useState } from 'react'
import { Row, Col, Input, Form } from 'antd'
import { ButtonLink, PrimarySwitch } from './../Elements'
import AuthContext from './../../helpers/authContext'
import BackArrowBlack from '../../../../public/images/back_arrow_light.svg'
import BackArrowWhite from '../../../../public/images/back_arrow_light.svg'
import CreditCardWhite from '../../../../public/images/credit_icon_black.svg'
import AppleIconBlack from '../../../../public/images/apple_icon_black.svg'
import PaypleIconBlack from '../../../../public/images/paypal_logo.svg'
import { PrimaryButton } from '../Elements/Button'

const AddBillingMethod = (props) => {
  const context = React.useContext(AuthContext)
  const { theme } = context
  const [stepNo, setStepNo] = useState(1)
  const [cardNo, setCardNo] = useState(undefined)

  const handleClickClose = () => {
    props.setPage('list')
    props.history.push('/my-area/billing-methods')
  }

  const SelectCardSection = () => {
    return (
      <div className="payment-method">
        <CardItem isActive={cardNo === 1} onClick={() => setCardNo(1)} icon={<CreditCardWhite />} methodName={'Credit or Debit card'} />
        <CardItem isActive={cardNo === 2} onClick={() => setCardNo(2)} icon={<AppleIconBlack />} methodName={'Apple Pay'} />
        <CardItem isActive={cardNo === 3} onClick={() => setCardNo(3)} icon={<PaypleIconBlack />} methodName={'Paypal'} />
      </div>
    )
  }

  const CardItem = (props) => {
    return (
      <div onClick={props.onClick} className={`payment-box ${props?.isActive ? 'active' : ''}`}>
        {props.icon}
        <p>{props.methodName}</p>
      </div>
    )
  }

  const MethodFormSection = () => {
    return (
      <Form className="payment-container form-container" name="Login" initialValues={{ remember: true }}>
        <Form.Item
          name="first-name"
          rules={[
            {
              required: true,
              message: 'Please input your Name on Card!',
            },
          ]}
        >
          <Input placeholder="Name on Card" className="form-input" />
        </Form.Item>
        <Form.Item
          name="last-name"
          rules={[
            {
              required: true,
              message: 'Please input your Card Number!',
            },
          ]}
        >
          <Input placeholder="Card Number" className="form-input" />
        </Form.Item>

        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input your Security Number!',
            },
          ]}
        >
          <Input placeholder="Security Number" className="form-input" />
        </Form.Item>
        <Form.Item name="further-information">
          <Input placeholder="Expiriation date (MM/YY)" className="form-input" />
        </Form.Item>

        <div className="settings-sub-container">
          <span>Define as default</span>
          <PrimarySwitch onChange={() => {}} />
        </div>
      </Form>
    )
  }

  let dynamicClass = 'add-address-container auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  return (
    <div className={dynamicClass}>
      <div className="desktop-back-btn" onClick={handleClickClose} role="button" tabIndex="0">{theme === 'light' ? <BackArrowWhite /> : <BackArrowBlack />}</div>
      <Row justify="center">
        {/*<Col md={16} xxl={18} span={0} className="bg-container" />*/}
        <Col md={18} xxl={13} span={24} >
          <div
            className="top-nav-container"
          >
            <div onClick={handleClickClose}
                 onKeyPress={handleClickClose}
                 role="button"
                 tabIndex="0">{theme === 'light' ? <BackArrowWhite /> : <BackArrowBlack />}</div>
            {stepNo === 1 ? (
              <ButtonLink htmlType={''} onClick={() => setStepNo(2)}>
                next
              </ButtonLink>
            ) : (
              <ButtonLink>Save</ButtonLink>
            )}
          </div>
          <div className="form-modal-container">
          <h3>New Payment Method</h3>
          {stepNo === 1 ? <SelectCardSection /> : <MethodFormSection />}
          <PrimaryButton btnClassname={"ant-btn primary-btn desktop-btn"} htmlType={''} onClick={() => {
            stepNo === 1 ? setStepNo(2) : props.history.push('/my-area/billing-methods')
          }}>{stepNo === 1 ? 'Next' : 'save'}</PrimaryButton>
          </div>
        </Col>
      </Row>
    </div>
  )
}


export default AddBillingMethod;
