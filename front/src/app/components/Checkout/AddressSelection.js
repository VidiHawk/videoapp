import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Input, Row, Col, Switch, Form, Select } from 'antd'
import EditIcon from './../../../../public/images/edit-icon.svg'
import AuthContext from './../../helpers/authContext'
import config from './../../../config';

const AddressSelection = (props) => {
  const [editAddress, setIsEditAddress] = useState(props.iseditInformation)
  const [address, setAddress] = useState({})

  useEffect(() => {
    if (props.cartItems && props.cartItems.node && props.cartItems.node.shippingAddress) {
      setAddress(props.cartItems.node.shippingAddress)
    }
  }, [props.cartItems])

  return (
    <div>
      {address && address.id && !editAddress ? (
        <AddressList {...props} address={address} setIsEditAddress={setIsEditAddress} />
      ) : (
        <AddressForm {...props} address={address} setIsEditAddress={setIsEditAddress} />
      )}
    </div>
  )
}

const AddressList = (props) => {
  const { address } = props
  return (
    <div className="">
      <div className="address-selection">
        <Row>
          <Col span="20">
            <div className="cart-title">Ship to</div>
            <div className="cart-description">
              <div>
                <strong>
                  {address.firstName} {address.lastName}
                </strong>
              </div>
              <div>
                {address.formatted.map((miniAddress, key) => {
                  return (
                    <Fragment key={key}>
                      {miniAddress}
                      <br />
                    </Fragment>
                  )
                })}
              </div>
            </div>
          </Col>
          <Col span="4" className="text-right">
            <EditIcon onClick={() => props.setActiveLink('information')} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

const AddressForm = (props) => {
  const context = useContext(AuthContext)
  const { setIsEditAddress} = props;

  const onChange = () => {}
  const initialValues = props.address

  useEffect(() => {
    if (props.form) props.form.setFieldsValue(props.address)
  }, [props.form, props.address])


  /**
   * Specifically for google maps auto suggestions
   */
  useEffect(()=>{
    addGoogleMapsScript(()=>{
      const addressElement = document.getElementById('addressForm_address1');
      const autocomplete = new google.maps.places.Autocomplete(addressElement, {
        types: ["address"],
        fields: ["address_components", "geometry"]
      });
      addressElement.focus();
      autocomplete.addListener("place_changed", ()=>{
        fillInAddress(autocomplete)
      });
    })
  }, [])

  /**
   * This function will render google maps script in code. If alredy rendered once then it will be skipped
   * @param {*} cb 
   */
  const addGoogleMapsScript = (cb) =>{
    const checkoutScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_KEY}&libraries=places`;
    if(!document.querySelectorAll(`script[src="${checkoutScriptUrl}"]`).length){
      Util.loadScript(checkoutScriptUrl, true, ()=>{
        cb();
      })
    }
    else cb();
  }

  /**
   * Function to fill google address in form fields
   * @param {*} e 
   */
  const fillInAddress = (e) =>{
    const place = e.getPlace()
    let address1 = "";
    let zip = "";
    let city = "";
    let province = "";
    let country = "";
    if(place && place.address_components){
      for (const component of place.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
          case "sublocality_level_2": {
            address1 = `${component.long_name} ${address1}`;
            break;
          }
          case "street_number": {
            address1 = `${address1} ${component.long_name}`;
            break;
          }
          case "route": {
            address1 += component.short_name;
            break;
          }
          case "postal_code": {
            zip = `${component.long_name}${zip}`;
            break;
          }
          case "postal_code_suffix": {
            zip = `${zip}-${component.long_name}`;
            break;
          }
          case "locality":
            city = component.long_name;
            break;
    
          case "administrative_area_level_1": {
            province = component.long_name;
            break;
          }
          case "country":
            country = component.long_name;
            break;
        }
      }
      props.form.setFieldsValue({
        address1,
        city,
        province,
        country,
        zip
      })
    }
  }

  const onFinish = (values) => {
    props.createAddress(values, (res) => {
      if (
        res &&
        res.data &&
        res.data.checkoutShippingAddressUpdateV2 &&
        res.data.checkoutShippingAddressUpdateV2.userErrors &&
        res.data.checkoutShippingAddressUpdateV2.userErrors[0] &&
        res.data.checkoutShippingAddressUpdateV2.userErrors[0].message
      ) {
        const errorMessage = res.data.checkoutShippingAddressUpdateV2.userErrors[0].message
        context.showToastMessage({ message: errorMessage, type: 'error' })
      }
      else{
        props.setActiveLink('shipping');
        setIsEditAddress(false);
      }
    })
  }


  return (
    <div>
      <div className="cart-title">Shipping Address</div>
      <Form
        form={props.form}
        name="addressForm"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
          <Input placeholder="First name" />
        </Form.Item>

        <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
          <Input placeholder="Last name" />
        </Form.Item>

        <Form.Item id="address1" name="address1" rules={[{ required: true, message: 'Please input your Street and house number!' }]}>
          <Input placeholder="Street and house number" />
        </Form.Item>

        <Form.Item name="address2">
          <Input placeholder="Apartment, suite, etc. (optional)" />
        </Form.Item>

        <Form.Item name="zip" rules={[{ required: true, message: 'Please input your Postal code!' }]}>
          <Input placeholder="Zip/Postal code" />
        </Form.Item>

        <Form.Item name="city" rules={[{ required: true, message: 'Please input your City!' }]}>
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item name="province" rules={[{ required: true, message: 'Please input your Province!' }]}>
          <Input placeholder="Province" />
        </Form.Item>

        <Form.Item name="country" rules={[{ required: true, message: 'Please input your Country!' }]}>
          <Input placeholder="Country / Region" />
        </Form.Item>

        <Form.Item name="phone" rules={[{ required: true, message: 'Please input your Phone!' }]}>
          <Input placeholder="Phone" />
        </Form.Item>

        <Row>
          <Col span="20">Set as default address</Col>
          <Col span="4">
            <Switch onChange={onChange} />
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default AddressSelection;