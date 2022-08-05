import React, { useState } from 'react'
import handleViewport from './../Elements/HandleViewPort'
import { Avatar, Button, Card, Row, Col } from 'antd'
import { ButtonLink } from '../Elements/ButtonLink'

const Rewards = (props) => {
  const { forwardedRef, inViewport } = props
  const [tabIndex, setTabIndex] = useState(1)
  return (
    <div className="luxe-slidecard">
      <div className="container-terms">
        <div className="reward__btn">
          <Button className={tabIndex === 1 ? 'active' : ''} onClick={() => setTabIndex(1)}>
            Earn
          </Button>
          <Button className={tabIndex === 2 ? 'active' : ''} onClick={() => setTabIndex(2)}>
            Redeem Rewards
          </Button>
        </div>
        {tabIndex === 1 && (
          <div className=" d-block">
            <EranRewardSection />
          </div>
        )}
        {tabIndex === 2 && (
          <div className=" d-block">
            <RedeemRewardSection />
          </div>
        )}
      </div>
    </div>
  )
}

const EranRewardSection = () => {
  return (
    <div className="earn-boxset">
      <EranItemCard />
    </div>
  )
}

const EranItemCard = () => (
  <>
    <Card bordered={false} className="main-card">
      <Row>
        <Col span={4}>
          <Avatar size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Col>
        <Col span={20}>
          <p>Submit a photo review</p>
          <p>150 Angeless Beauty Rewards</p>
        </Col>
      </Row>
    </Card>

    <Card bordered={false} className="main-card">
      <Row>
        <Col span={4}>
          <Avatar size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Col>
        <Col span={14}>
          <p>Submit a photo review</p>
          <p>150 Angeless Beauty Rewards</p>
        </Col>
        <Col span={6} className="top-btm-center">
          <a href="#" className="earn-btn">
            Follow
          </a>
        </Col>
      </Row>
    </Card>

    <Card className="select-card main-card" bordered={false}>
      <Row>
        <Col span={4}>
          <Avatar size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Col>
        <Col span={17}>
          <p>Submit a photo review</p>
          <p>150 Angeless Beauty Rewards</p>
        </Col>
        <Col span={3}>
          <Avatar size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Col>
      </Row>
    </Card>
  </>
)

const RedeemRewardSection = () => {
  return (
    <>
      <RedeemRewardItem />
      <RedeemRewardItem />
      <RedeemRewardItem />
    </>
  )
}
const RedeemRewardItem = () => (
  <Card hoverable className="redeem-rewards-section">
    <Row>
      <Col span={10}>
        <img className="redeem-image" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      </Col>
      <Col span={14}>
        <div className="rewards-discription">
          <p>Free Radical Eye Cream™ coupon</p>
          <p>4,000 Points</p>
          {/*<a className="add-bascket" href="#">
            Add to basket
          </a>*/}
          <ButtonLink btntype="info" className="add-bascket">
            Add to basket
          </ButtonLink>
        </div>
      </Col>
    </Row>
  </Card>
)

export default Rewards;