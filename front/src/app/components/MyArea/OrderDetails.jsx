import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Form, Card, Rate } from 'antd'
import { Link } from 'react-router-dom'
import AuthContext from './../../helpers/authContext'
import BackArrowBlack from '../../../../public/images/back_arrow_light.svg'
import BackArrowWhite from '../../../../public/images/back_arrow_light.svg'
import UpDownload from '../../../../public/images/up-download.svg'
import CartEcommerce from '../../../../public/images/icon_bag_light.svg'
import EditIcon from '../../../../public/images/edit_icon.svg'
import StarIcon from '../../../../public/images/star.svg'
import { useLazyQuery } from '@apollo/client'
import { GET_ORDER_DETAIL } from '../../graphql/queries/shopify'
import { ButtonLink, Button, LuxeSpin } from '../Elements'
import ShopifyGraphClient from '../../graphql/client'
import moment from 'moment'
import {getProductIdFromShopifyString} from './../../helpers/helpers';

const shopifyClient = ShopifyGraphClient()

const ShippingInfo = (props) => {
  const { shipingDetail } = props
  const { address1, zip, company } = shipingDetail
  return (
    <div className="ship-address">
      <h3>Shipping Address</h3>
      <address>
        {address1} <br />
        {zip}, {company || ''}
      </address>
    </div>
  )
}

const OrderSummary = (props) => {
  const { currentTotalTax, originalTotalPrice, subtotalPriceV2 } = props.orderInfo
  return (
    <div className="order-summary">
      <Row>
        <Col span={24}>
          {subtotalPriceV2?.amount && (
            <div>
              <p>Subtotal product:</p>
              <span>${subtotalPriceV2?.amount}</span>
            </div>
          )}
          <div>
            <p>Shipping:</p>
            <span>$0.0</span>
          </div>
          {currentTotalTax?.amount && (
            <div>
              <p>Tax:</p>
              <span>${currentTotalTax?.amount}</span>
            </div>
          )}
          {originalTotalPrice?.amount && (
            <div>
              <p>
                <strong>Total amount</strong>
              </p>
              <span>
                <strong>${originalTotalPrice?.amount}</strong>
              </span>
            </div>
          )}
        </Col>
      </Row>
    </div>
  )
}

const OrderInfo = (props) => {
  const { orderNumber, processedAt, canceledAt } = props.orderInfo
  return (
    <div className="order-details">
      <div className="rewards-discription">
        <div className="order-receipt">
          <p>Order #{orderNumber}</p>
          <p className="discriptionprice">
            <span>Order placed on {moment(processedAt).format('MMMM D, YYYY')}</span>
            {canceledAt ? (
              <span>Canceled at {moment(canceledAt).format('MMMM D, YYYY')}</span>
            ) : (
              <span>Delivered May 1, 2020</span>
            )}
          </p>
          {/*<button type="submit" className="ant-btn ant-btn-link return-btn">
            <span>Return Product</span>
          </button>*/}
        </div>
      </div>
    </div>
  )
}

const ReturnProduct = () => {
  return (
    <div className="return-product">
      <h3>Why are you returning this product?</h3>

      <form>
        <Form.Item name="Damage due to poor packaging">
          <Input placeholder="Damage due to poor packaging" className="form-input" />
        </Form.Item>

        <Form.Item name="Comments">
          <textarea placeholder="Comments" rows={5} className="form-textarea" />
        </Form.Item>

        <h3 className="mb-0">Pickup</h3>
        <p>
          Your package will be picked up by a courier service. Printer not required - the courier will bring your label.
        </p>

        <Form.Item name="calender">
          <Input placeholder="October 5, 2020" className="form-input" />
        </Form.Item>
      </form>

      <div className="pick-address">
        <h3>Pickup Address</h3>

        <Card hoverable className="delivery-address-section" bodyStyle={{ padding: '0px' }}>
          <Row>
            <Col span={21}>
              <div className="address-discription">
                <address>
                  <b>Izabela Lawrence</b>,<br />
                  Lorem Ipsum dolor sit amet, 2A
                  <br />
                  932034, Lorem ipsum
                </address>
              </div>
            </Col>
            <Col span={3} className="top-btm-center">
              <EditIcon />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

const CartItem = (props) => {
  const { items } = props
  return (
    <div className="cart-items">
      <h3>
        <CartEcommerce /> Your Order &nbsp;<span> ({items.length} items)</span>
      </h3>
      {items.map((item, index) => {
        const imgURL =
          item.node.variant && item.node.variant.image && item.node.variant.image.originalSrc
            ? item.node.variant.image.originalSrc
            : ''
        return (
          <Row className="single-item" key={index}>
            <Col md={6} span={8}>
              <div className="">
                <img className="single-item-image" src={imgURL} alt={item.node.title} />
              </div>
            </Col>
            <Col md={18} span={16}>
              <div className="single-item-title">{item.node.title}</div>
              <div className="single-item-price-tag">
                <div className="single-item-review">
                  <Link to="/my-reviews/pending">Add a review</Link>
                </div>
                <div className="single-item-price">
                  ${item.node.variant.priceV2.amount * (item.node.quantity || 1)}
                  {item.node.discountAllocations &&
                    item.node.discountAllocations.length > 0 &&
                    item.node.discountAllocations.map((discount, index) => {
                      return (
                        <div key={index} className="single-item-discount">
                          - ${discount.allocatedAmount.amount}
                        </div>
                      )
                    })}
                </div>
              </div>
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

export const OrderDetails = (props) => {
  const { history, itemId: item } = props
  const context = React.useContext(AuthContext)
  const [isReceiptShow, setIsReceiptShow] = useState(false)
  const [selectedItem, setSelectedItem] = useState(undefined)
  const { theme } = context
  const customerAccessToken = Util.getLocalstorage('customerAccessToken')

  useEffect(() => {
    if (!Object.keys(item).length) history.push('/my-area')
  }, [item])

  useEffect(() => {
    const pageElement = document.querySelector('.myarea-container'); 
    if (pageElement) {
      pageElement.addEventListener('click', onClick);
    }
  }, []);

  const onClick = (event) => {
    const detailContainer = document.querySelector('.order-details-container-main');
    if(detailContainer && !detailContainer.contains(event.target)) {
      props.setPage('history');
      const pageElement = document.querySelector('.myarea-container'); 
      if (pageElement) {
        pageElement.removeEventListener('click', onClick);
      }
    }
  }

  const checkAndGetReviewId = (pid) =>{
    const productId = getProductIdFromShopifyString(pid);
    context.showSpinner();
    props.checkAndGetReviewId(productId).then(res=>{
      context.hideSpinner();
      const reviewId = res?.[0]?.result?.reviewId;
      if(reviewId){
        props.history.push(`/my-reviews/pending/${reviewId}`)
      }
      else context.showToastMessage({message: 'Something went wrong!', type: 'error'});
    })
  }

  const handleClickClose = () => {
    if (isReceiptShow) setIsReceiptShow(false)
    else props.setPage('history')
  }

  const [getOrderDetail, { data: orderDetail, loading }] = useLazyQuery(GET_ORDER_DETAIL, {
    client: shopifyClient,
  })

  useEffect(() => {
    if (orderDetail) {
      const currentItem = orderDetail?.node?.lineItems?.edges.find(
        (oItem) => oItem?.node?.variant?.id === item.itemId)
      setSelectedItem(currentItem)
    }
  }, [item.itemId,orderDetail])

  useEffect(() => {
    if (context.authenticated) {
      getOrderDetail({
        variables: {
          id: item.orderId,
          customerAccessToken: customerAccessToken,
          first: 10,
        },
      })
    }
  }, [context.authenticated, getOrderDetail])

 // const bgImgClass = !isReceiptShow && !loading ? 'order-bg-img' : ''

  let dynamicClass = 'auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  const backgroundImg = !isReceiptShow && !loading ? selectedItem?.node?.variant?.image?.originalSrc : '';
  const overlayClass = !isReceiptShow && !loading ?  "black-overlay" : "pt-2";

  return (
    <div>
      <Row>
        <Col md={16} xxl={18} span={0} className="bg-container" />
        <Col
         style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'contain',
          backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: `${backgroundImg ? '#ffffff' : ''}` }}
          md={8}
          xxl={6}
          span={24}
          className={`order-details-container order-details-container-main order-details-container-p0 ${dynamicClass}`}
        >
          <div className={`${overlayClass}`}>
          <div
            className="top-nav-container"
            onClick={handleClickClose}
            onKeyPress={handleClickClose}
            role="button"
            tabIndex="0"
            style={{ zIndex: 1 }}
          >
            {theme === 'light' ? <BackArrowWhite /> : <BackArrowBlack />}
            {isReceiptShow && (
              <ButtonLink style={{ float: 'right' }}>
                <UpDownload />
              </ButtonLink>
            )}
          </div>

          {loading && <LuxeSpin/>}
          {!loading && orderDetail?.node && (
            <>
              {!isReceiptShow ? (
                <div className={`order-details-light-theme order-detail-${theme}`}>
                  <div className="rewards-discription">
                    <p className={`luxe-pd-${theme}__title`}>{selectedItem?.node?.title}</p>
                    <div className="rating-count">
                      <Rate onChange={() => {}} value={5} character={<StarIcon />} />
                      <div className="count-total">
                        <span>(1234)</span>
                      </div>
                    </div>
                    <p className={`luxe-pd-${theme}__weight`}> 1 oz net wt / 28.4 g </p>
                    <a href="#" className={`add-price luxe-pd-${theme}__price`}>
                      ${selectedItem?.node?.variant?.priceV2?.amount}
                    </a>
                  </div>
                  <div className={`luxe-content`}>
                   
                    <Button btnClassname={`luxe-pd-${theme}__more`} onClick={() => checkAndGetReviewId(selectedItem?.node?.variant?.product?.id)}>
                      Add a review
                    </Button>
                    <Button btnClassname={`luxe-pd-${theme}__more`} onClick={() => setIsReceiptShow(true)}>
                      View receipt
                    </Button>
                    <a href="mailto:info@emkbh.com" target="_blank">
                      <Button btnClassname={`luxe-pd-${theme}__more`} onClick={() => {}}>
                        Contact us
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <OrderInfo orderInfo={orderDetail?.node} />
                  <hr />
                  <ShippingInfo shipingDetail={orderDetail?.node?.shippingAddress} />
                  <hr />
                  <CartItem items={orderDetail?.node?.lineItems?.edges} />
                  <OrderSummary orderInfo={orderDetail?.node} />
                </>
              )}
            </>
          )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default OrderDetails
