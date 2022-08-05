import React, { Fragment } from 'react'
import { Row, Col } from 'antd'
import { removeShopifyPid, formatPrice } from './../../helpers/helpers';


const CartItems = (props) => {
  const { items } = props

  const incrementCart = (quantity, pid, variantId) => {
    updateQuantity(quantity + 1, pid, variantId)
  }

  const decrementCart = (quantity, pid, variantId) => {
    updateQuantity(quantity - 1, pid, variantId)
  }

  const updateQuantity = (quantity, pid, variantId) => {
    if(quantity<1) removeShopifyPid(variantId);
    let lineItem = [
      {
        id: pid,
        variantId,
        quantity,
      },
    ]
    props.updateQuantity(lineItem)
  }

  if (items && items.length) {
    return (
      <Fragment>
        <div className="cart-items">
          {items.map((item, index) => {
            const imgURL =
              item.node.variant && item.node.variant.image && item.node.variant.image.originalSrc
                ? item.node.variant.image.originalSrc
                : ''
            return (
              <Row className="single-item" key={index}>
                <Col span="12">
                  <img className="single-item-image" src={imgURL} alt={item.node.title} />
                </Col>
                <Col span="12">
                  <div className="single-item-title">{item.node.title}</div>
                  <div className="single-item-quantity">
                    <div className="single-item-quantity-action">
                      <button
                        className="action-button"
                        onClick={() => decrementCart(item.node.quantity, item.node.id, item.node.variant.id)}
                      >
                        -
                      </button>
                      <span>{item.node.quantity}</span>
                      <button
                        className="action-button"
                        onClick={() => incrementCart(item.node.quantity, item.node.id, item.node.variant.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="single-item-price">
                    <div>${formatPrice(item.node.variant.priceV2.amount * item.node.quantity)}</div>

                    {item.node.discountAllocations &&
                      item.node.discountAllocations.length > 0 &&
                      item.node.discountAllocations.map((discount, index) => {
                        return (
                          <div key={index} className="single-item-discount">
                            - ${formatPrice(discount.allocatedAmount.amount)}
                          </div>
                        )
                      })}
                  </div>
                </Col>
              </Row>
            )
          })}
        </div>
      </Fragment>
    )
  } else return null
}


export default CartItems;
