import React from 'react'
import { Row, Col, Input, Form } from 'antd'
import { ButtonLink } from './../Elements'
import AuthContext from './../../helpers/authContext'
import BackArrowBlack from '../../../../public/images/back_arrow_light.svg'
import BackArrowWhite from '../../../../public/images/back_arrow_light.svg'
import { PrimaryButton } from '../Elements/Button'

const EditBillingDetails = (props) => {
  const context = React.useContext(AuthContext)
  const { theme } = context

  const handleClickClose = () => {
    props.setPage('detail')
    props.history.push('/my-area/billing-details')
  }

  let dynamicClass = 'edit-form-container myarea-bg-blank auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  return (
    <div className={dynamicClass}>
      <div className="desktop-back-btn" onClick={handleClickClose} role="button" tabIndex="0">{theme === 'light' ? <BackArrowWhite /> : <BackArrowBlack />}</div>
      <Row justify="center">
        {/*<Col md={16} xxl={18} span={0} className="bg-container" />*/}
        <Col md={18} xxl={13} span={24}>
          <div
            className="top-nav-container"
            onClick={handleClickClose}
            onKeyPress={handleClickClose}
            role="button"
            tabIndex="0"
          >
            {theme === 'white' ? <BackArrowWhite /> : <BackArrowBlack />}
            <ButtonLink className="text-gray" style={{ float: 'right' }}>
              Save
            </ButtonLink>
          </div>
          <div className="form-modal-container">
          <h3 className="common-title">Edit Billing details</h3>
          <Form className="form-container edit-form" name="Login" initialValues={{ remember: true }}>
            <Form.Item
              name="name"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <label>First Name</label>
              <Input placeholder="First Name" className="form-input-set" />
            </Form.Item>
            <Form.Item
              name="email"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <label>Last Name</label>
              <Input placeholder="Last Name" className="form-input-set" />
            </Form.Item>

            <Form.Item
              name="tax-id"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone number!',
                },
              ]}
            >
              <label>Tax ID</label>
              <Input placeholder="Tax ID" className="form-input-set" />
            </Form.Item>

            <Form.Item
              name="address"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone number!',
                },
              ]}
            >
              <label>Address</label>
              <Input placeholder="Address" className="form-input-set" />
            </Form.Item>

            <Form.Item
              name="city"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone number!',
                },
              ]}
            >
              <label>City</label>
              <Input placeholder="City" className="form-input-set" />
            </Form.Item>

            <Form.Item
              name="region"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone number!',
                },
              ]}
            >
              <label>Region</label>
              <Input placeholder="Region" className="form-input-set" />
            </Form.Item>

            <Form.Item
              name="zip-postcode"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone number!',
                },
              ]}
            >
              <label>Zip / Postcode</label>
              <Input placeholder="Zip / Postcode" className="form-input-set" />
            </Form.Item>

            <Form.Item
              name="country"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Phone number!',
                },
              ]}
            >
              <label>Country</label>
              <Input placeholder="Country" className="form-input-set" />
            </Form.Item>
          </Form>
            <PrimaryButton btnClassname={"ant-btn primary-btn desktop-btn"} >Save</PrimaryButton>
          </div>
        </Col>
      </Row>
    </div>
  )
}


export default EditBillingDetails;
