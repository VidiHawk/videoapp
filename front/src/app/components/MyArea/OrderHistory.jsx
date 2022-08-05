import React, { memo, useEffect, useState } from 'react'
import { Card, Col, Row, Collapse, Rate } from 'antd'
import { useHistory } from 'react-router-dom'
import { ButtonLink } from '../Elements/ButtonLink'
import { Button, LuxeSpin } from '../Elements'
import ShopifyGraphClient from '../../graphql/client'
import { useLazyQuery } from '@apollo/client'
import { GET_ORDERS_LIST } from '../../graphql/queries'
import AuthContext from '../../helpers/authContext'
import ArrowDown from '../../../../public/images/arrow_medium_down.svg'
import moment from 'moment'
import { NoPurchase, NoLoginOrderHistory } from './../Common/EmptyPages'
import OrderDetails from './OrderDetails'
import StarIcon from '../../../../public/images/star.svg'
import { OrderListBG } from './../Common/Preact';

const { Panel } = Collapse
const shopifyClient = ShopifyGraphClient()

const PanelHeader = (props) => {
  const { orderNumber, processedAt, originalTotalPrice } = props.orderInfo
  return (
    <div className="order-panel-header">
      <div>
        <span>
          <b># {orderNumber}</b> | {moment(processedAt).format('MMMM D, YYYY')}
        </span>
        <br />
        <h5>$ {+originalTotalPrice?.amount || 0}</h5>
      </div>
      <div>
        <h5>Details <ArrowDown /></h5>
      </div>
    </div>
  )
}


const OrderHistory = memo(function OrderHistory(props) {
  if(typeof Util !== 'undefined') {
    const [page, setPage] = useState('history');
    const [itemId, setItemId] = useState(undefined);

    if (page == 'history') return <OrderHistoryData {...props} setPage={setPage} setItemId={setItemId}/>
    else if (page == 'details') return <OrderDetails {...props} setPage={setPage} itemId={itemId}/>
  }
  else return null;
})

const OrderHistoryData = (props) => {
  const context = React.useContext(AuthContext)
  const customerAccessToken = Util.getLocalstorage('customerAccessToken')

  const [getOrders, { data: orderItems, loading }] = useLazyQuery(GET_ORDERS_LIST, {
    client: shopifyClient,
  })

  useEffect(() => {
    if (context.authenticated) {
      getOrders({ variables: { customerAccessToken, first: 10 } })
    }
  }, [context.authenticated, getOrders])

  const orderItem = []
  orderItems?.customer?.orders?.edges.forEach((order) => {
    const { processedAt, id, lineItems, orderNumber, originalTotalPrice } = order.node
    const itemObj = lineItems?.edges?.map((orderDetails) => {
      const { title, originalTotalPrice, variant } = orderDetails.node
      return {
        title,
        originalTotalPrice,
        variant,
      }
    })
    orderItem.push({
      orderNumber,
      processedAt,
      id,
      lineItems: itemObj,
      originalTotalPrice,
    })
  })

  const onCardClick = (orderId, itemId) => {
    props.setItemId({orderId, itemId});
    props.setPage('details')
  }

  
  if(context.authenticated) {
    return (
      <div className="luxe-slidecard order-history-container">
        <div className="container-terms">
          <Row justify="center">
            <Col md={18} xxl={14} span={24}>
              {loading && <OrderListBG/>}
              {orderItem?.length ? (
                <div className="settings-sub-container" style={{ display: 'block' }}>
                  <Collapse accordion bordered={false} defaultActiveKey={['1']} className="site-collapse-custom-collapse">
                    {orderItem?.map((orderDetails, index) => (
                      <Panel
                        showArrow={false}
                        header={orderDetails && <PanelHeader orderInfo={orderDetails} />}
                        key={index + 1}
                        className="site-collapse-custom-panel"
                      >
                        {orderDetails.lineItems.map((item, itemIndex) => (
                          <ProductItem
                            key={`order_item_${itemIndex}`}
                            onCardClick={onCardClick}
                            itemDetails={{ ...item, title: item.title, id: orderDetails.id }}
                          />
                        ))}
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              ) : (
                !loading && <NoPurchase />
              )}
            </Col>
          </Row>
        </div>
      </div>
    )
  } else {
    return <NoLoginOrderHistory />
  }
}


const ProductItem = (props) => {
  const { title, id, variant } = props.itemDetails
  return (
    <Card
      hoverable
      className="redeem-rewards-section order-history-section"
      bodyStyle={{ padding: '0px', width: '100%' }}
    >
      <Row>
        <Col md={11} span={8}>
          <img className="redeem-image" alt="example" src={variant.image.originalSrc} />
        </Col>
        <Col md={13} span={16}>
          <div className="rewards-discription">
            <p>{title}</p>
            <div className="rating-count">
              <Rate onChange={() => {}} value={5} character={<StarIcon />} />
              <div className="count-total">
                <span>(1234)</span>
              </div>
            </div>
            <div className="order-place-info">
              <span>Order placed on April 29, 2020 for $120.00</span>
              <span>Delivered May 1, 2020</span>
            </div>
            <div className="product-price-info">
              <ButtonLink btntype="info" onClick={() => props.onCardClick(id, variant.id)}>
                View more
              </ButtonLink>
              <span>${variant.priceV2.amount}</span>
              <ButtonLink btntype="info" onClick={() => props.onCardClick(id, variant.id)}>
                View more
              </ButtonLink>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default OrderHistory;
