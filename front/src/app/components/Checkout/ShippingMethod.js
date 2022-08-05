import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import EditIcon from './../../../../public/images/edit-icon.svg'

const ShippingMethod = (props) => {
  const [editShipping, setEditShipping] = useState(props.iseditShipping)
  const [savedShippingMethod, setSavedShippingMethod] = useState({})

  useEffect(() => {
    setEditShipping(false)
    if (props.cartItems && props.cartItems.node && props.cartItems.node.shippingLine) {
      setSavedShippingMethod(props.cartItems.node.shippingLine)
    }
  }, [props.cartItems])

  useEffect(() => {
    setEditShipping(props.iseditShipping)
  }, [props.iseditShipping])

  return (
    <Fragment>
      {savedShippingMethod && savedShippingMethod.title && !editShipping ? (
        <ShippingMethodDetail {...props} setEditShipping={setEditShipping} savedShippingMethod={savedShippingMethod} />
      ) : (
        <ShippingMethodForm {...props} savedShippingMethod={savedShippingMethod} />
      )}
    </Fragment>
  )
}

const ShippingMethodDetail = (props) => {
  const { savedShippingMethod } = props

  const editShipping = () => {
    props.setActiveLink('shipping')
    props.setEditShipping(true)
  }

  return (
    <div>
      <div className="contact-information">
        <Row>
          <Col span="20">
            <div className="cart-title">Shipping method</div>
            <div className="cart-description">
              {savedShippingMethod.title}
              {Number(savedShippingMethod.priceV2.amount) > 0 ? (
                <span> . ${savedShippingMethod.priceV2.amount}</span>
              ) : (
                <span></span>
              )}
            </div>
          </Col>
          <Col span="4" className="text-right">
            <EditIcon onClick={() => editShipping()} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

const ShippingMethodForm = (props) => {
  const { shippingMethods } = props
  const [selectedShipping, setSelectedShipping] = useState('')

  const selectShippingMethod = (handle) => {
    setSelectedShipping(handle)
    props.setShippingMethod(handle)
  }

  useEffect(() => {
    if (props.savedShippingMethod && props.savedShippingMethod.handle) {
      setSelectedShipping(props.savedShippingMethod.handle)
    }
  }, [props.savedShippingMethod])

  if (
    shippingMethods &&
    shippingMethods.node &&
    shippingMethods.node.availableShippingRates &&
    shippingMethods.node.availableShippingRates.shippingRates &&
    shippingMethods.node.availableShippingRates.shippingRates.length
  ) {
    const shippingMethodList = shippingMethods.node.availableShippingRates.shippingRates
    return (
      <div>
        <div className="shipping-area">
          <div className="cart-title">Select shipping method</div>
          {shippingMethodList &&
            shippingMethodList.length &&
            shippingMethodList.map((shippingMethod, key) => {
              return (
                <div
                  key={key}
                  className={`shipping-method ${selectedShipping == shippingMethod.handle && 'active'}`}
                  onClick={() => selectShippingMethod(shippingMethod.handle)}
                  onKeyDown={() => selectShippingMethod(shippingMethod.handle)}
                  aria-hidden="true"
                >
                  <span className="">{shippingMethod.title}</span>
                  <span className="pull-right">
                    {Number(shippingMethod.priceV2.amount) > 0 ? (
                      <span>${shippingMethod.priceV2.amount}</span>
                    ) : (
                      <span>FREE</span>
                    )}
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    )
  } else return null
}


export default ShippingMethod;