import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Input, Form } from 'antd'
import { ButtonLink, LuxeSpin, PrimarySwitch } from './../Elements'
import AuthContext from './../../helpers/authContext'
import BackArrowBlack from '../../../../public/images/back_arrow_light.svg'
import BackArrowWhite from '../../../../public/images/back_arrow_light.svg'
import { ADD_ADDRESS, MARK_DEFAULT_ADDRESS, UPDATE_ADDRESS } from '../../graphql/mutations'
import ShopifyGraphClient from '../../graphql/client'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_ADDRESSES } from '../../graphql/queries'
import { useHistory } from 'react-router'
import { PrimaryButton } from '../Elements/Button'
const shopifyClient = ShopifyGraphClient()

const AddAddress = (props) => {
  const context = React.useContext(AuthContext)
  const { theme, showToastMessage } = context
  const [form] = Form.useForm()
  const handleClickClose = () => {
    props.setPage('list')
    props.history.push('/my-area/address-details')
  }
  const [selectedAddress, setSelectedAddress] = useState(undefined)
  const [isDefaultAddress, setIsDefaultAddress] = useState(undefined)
  const [addAddress, { loading: addAddressLoading }] = useMutation(ADD_ADDRESS, { client: shopifyClient })
  const customerAccessToken = Util.getLocalstorage('customerAccessToken')
  const [getAddresses, { data: addressList }] = useLazyQuery(GET_ADDRESSES, {
    client: shopifyClient,
  })
  const [markDefaultAddress] = useMutation(MARK_DEFAULT_ADDRESS, { client: shopifyClient })
  const [updateAddress, { loading: updateAddressLoading }] = useMutation(UPDATE_ADDRESS, { client: shopifyClient })


  useEffect(() => {
    if (props.editId) {
      getAddresses({
        variables: {
          customerAccessToken,
          first: 10,
        },
      })
    }
  }, [props.editId])

  useEffect(() => {
    if (addressList) {
      const selectedAddress = addressList?.customer?.addresses?.edges.find(
        (item) => item.cursor === props.editId
      )
      setSelectedAddress({selectedAddress: selectedAddress, defaultAddress: selectedAddress?.node?.id === addressList?.customer?.defaultAddress?.id });
      selectedAddress?.node?.id === addressList?.customer?.defaultAddress?.id && setIsDefaultAddress(true)
    }
  }, [addressList])

  const handleSubmitForm = (values) => {
    if (selectedAddress && selectedAddress?.selectedAddress) {
      updateAddress({
        variables: {
          customerAccessToken,
          id: selectedAddress?.selectedAddress?.node?.id,
          address: values,
        },
      })
        .then((response) => {
          if (response?.data.customerAddressUpdate?.customerAddress?.id) {
            if (isDefaultAddress && !selectedAddress?.defaultAddress) {
              markDefaultAddress({
                variables: {
                  customerAccessToken,
                  addressId: selectedAddress?.selectedAddress?.node?.id,
                },
              })
            }
            showToastMessage({
              message: 'Address updated successfully',
              type: 'success',
            })
            props.refreshList();
            props.history.push('/my-area/address-details');
          } else {
            showToastMessage({
              message: response?.data?.customerAddressUpdate.customerUserErrors[0].message,
              type: 'error',
            })
          }
        })
        .catch((error) => {
          showToastMessage({
            message: "Something went wrong!",
            type: 'error',
          })
        })
    } else {
      addAddress({
        variables: {
          customerAccessToken,
          address: values,
        },
      })
        .then((response) => {
          if (response?.data.customerAddressCreate?.customerAddress?.id) {
            if (isDefaultAddress) {
              markDefaultAddress({
                variables: {
                  customerAccessToken,
                  addressId: response?.data.customerAddressCreate?.customerAddress?.id,
                },
              })
            }
            showToastMessage({
              message: 'Address added successfully',
              type: 'success',
            })
            props.refreshList();
            props.history.push('/my-area/address-details');
          } else {
            showToastMessage({
              message: response?.data?.customerAddressCreate.customerUserErrors[0].message,
              type: 'error',
            })
          }
        })
        .catch((error) => {
          showToastMessage({
            message: error.networkError.result.errors[0].message,
            type: 'error',
          })
        })
    }
  }

  useEffect(() => {
    if (selectedAddress && selectedAddress?.selectedAddress) {
      form.setFieldsValue({
        firstName: selectedAddress?.selectedAddress?.node?.firstName || '',
        lastName: selectedAddress?.selectedAddress?.node?.lastName || '',
        address1: selectedAddress?.selectedAddress?.node?.address1 || '',
        address2: selectedAddress?.selectedAddress?.node?.address2 || '',
        city: selectedAddress?.selectedAddress?.node?.city || '',
        zip: selectedAddress?.selectedAddress?.node?.zip || '',
        country: selectedAddress?.selectedAddress?.node?.country || '',
      })
    }
  }, [selectedAddress?.selectedAddress])

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
            onClick={handleClickClose}
            onKeyPress={handleClickClose}
            role="button"
            tabIndex="0"
          >
            {theme === 'light' ? <BackArrowWhite /> : <BackArrowBlack />}
            {(addAddressLoading || updateAddressLoading) && <LuxeSpin/>}
            {(!addAddressLoading && !updateAddressLoading) && (
              <ButtonLink btntype={'primary'} onClick={() => form.submit()} style={{ float: 'right' }}>
                Save
              </ButtonLink>
            )}
          </div>
          {(!addAddressLoading && !updateAddressLoading) && (
            <div className="form-modal-container">
              <h3>{props.editId ? 'Edit' : 'New'} address</h3>
              <span>This is an example of title´s subtitle and can be longer until two lines so far.</span>
              <Form
                className={`form-container ${selectedAddress && 'add-address-form'}`}
                onFinish={handleSubmitForm}
                form={form}
                name="Login"
              >
                <Form.Item
                  label={selectedAddress && 'First Name'}
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your First Name!',
                    },
                  ]}
                >
                  <Input placeholder="First Name" className="form-input-set" />
                </Form.Item>
                <Form.Item
                  label={selectedAddress && 'Last Name'}
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Last Name!',
                    },
                  ]}
                >
                  <Input placeholder="Last Name" className="form-input-set" />
                </Form.Item>

                <Form.Item
                  label={selectedAddress && 'Address'}
                  name="address1"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Address!',
                    },
                  ]}
                >
                  <Input placeholder="Address" className="form-input-set" />
                </Form.Item>

                <Form.Item label={selectedAddress && 'Further information (optional)'} name="address2">
                  <Input placeholder="Further information (optional)" className="form-input-set" />
                </Form.Item>

                <Form.Item
                  label={selectedAddress && 'City'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your City!',
                    },
                  ]}
                  name="city"
                >
                  <Input placeholder="City" className="form-input-set" />
                </Form.Item>

                <Form.Item
                  label={selectedAddress && 'Zip/Postcode'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Zip/Postcode!',
                    },
                  ]}
                  name="zip"
                >
                  <Input placeholder="Zip/Postcode" className="form-input-set" />
                </Form.Item>

                <Form.Item
                  label={selectedAddress && 'Country'}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Country!',
                    },
                  ]}
                  name="country"
                >
                  <Input placeholder="Country" value="Spain" className="form-input-set" />
                </Form.Item>

                <div className="settings-sub-container">
                  <span>Define as default</span>
                  <PrimarySwitch disabled={selectedAddress && selectedAddress?.defaultAddress} onChange={() => setIsDefaultAddress(!isDefaultAddress)} checked={isDefaultAddress} />
                </div>
                {/*<div className="settings-sub-container">
              <span>Use as billing address</span>
              <PrimarySwitch onChange={() => {}} />
            </div>*/}
              </Form>
              <PrimaryButton btnClassname={"ant-btn primary-btn desktop-btn"} onClick={() => form.submit()}>Save</PrimaryButton>
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}


export default AddAddress;
