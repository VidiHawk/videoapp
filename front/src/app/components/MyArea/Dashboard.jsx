import React, {useContext} from 'react'
import { Avatar, Badge, Card, Col, Row, Tag } from 'antd'
import AuthContext from '../../helpers/authContext'
import { PrimaryButton } from '../Elements/Button'

const Dashboard = (props) => {
  const { authenticated } = useContext(AuthContext)
  return (
    <div className="dashboard-container">
      <div className="container-terms">{authenticated ? <WithAuth /> : <WithoutAuth />}</div>
    </div>
  )
}

const WithoutAuth = () => {
  const context = useContext(AuthContext);
  return (
    <>
      <PointSection />
      <row className="unauth-container">
        <Col span={24}>
          <p>Sign in to access the loyalty program and win incredible gifts!</p>
          {/*<a href="#" className="sign-btn">
            Sign In
          </a>*/}
          <PrimaryButton onClick={()=>context.openLoginPopup()}>Sign In</PrimaryButton>
        </Col>
      </row>
    </>
  )
}

const WithAuth = () => {
  return (
    <>
      <HeaderSection />
      <PointSection />
      <ProgressSection />
    </>
  )
}

const HeaderSection = () => {
  return (
    <Row>
      <Col span={6}>
        <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Col>
      <Col span={18}>
        <div className="settings-title-container">
          Lazeblea L.
          <Badge count={5} offset={[10, 10]}></Badge>
        </div>
        <p>Member since 25, Mar 2019</p>
      </Col>
    </Row>
  )
}

const PointSection = () => {
  return (
    <Card>
      <Row>
        <Col span={12}>
          <p>Your Point Balance </p>
          <p className="text-bold">5000</p>
        </Col>
        <Col span={12}>
          <Tag color="#2db7f5">GLOW GETTER</Tag>
          <p className="text-date">Valid through 12/31/20</p>
        </Col>
      </Row>
    </Card>
  )
}

const ProgressSection = () => {
  return (
    <>
      <Row className="icon-section">
        <Row>
          <Col span={6}>
            <Avatar size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Col>
          <Col span={18}>
            <p>You are $70 away from activating your Glow Getter status throught 2021</p>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Avatar size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Col>
          <Col span={18}>
            <p>You are $720 away from activating your A-lister status through 2021</p>
          </Col>
        </Row>

        <Row>
          <Col span={6}>
            <Avatar size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Col>
          <Col span={18}>
            <p>
              You are 5,000 point away from getting this<span className="dark-col"> special gift</span>
            </p>
          </Col>
        </Row>
      </Row>
      <Row className="box-section">
        <Col span={12}>
          <Card>
            <div className="box-txt-bold">8,050</div>
            <div>
              Total lifetime <br />
              points earned
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div className="box-txt-bold">3,050</div>
            <div className="card-text">
              Points
              <br /> Redeemed
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard;
