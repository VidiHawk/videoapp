import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import { ButtonLink } from '../Elements/ButtonLink'
import { useHistory } from 'react-router-dom'
import EditIcon from '../../../../public/images/edit_icon.svg'
import DeleteIcon from '../../../../public/images/delete_icon.svg'
const { Meta } = Card
import AddBillingMethod from './../MyArea/AddBillingMethod';

const BillingMethods = (props) => {
  const [page, setPage] = useState('list');

  useEffect(() => {
    const pathname = props.location.pathname.split('/');
    if(pathname && (pathname[2] === 'add-billing-method')){
      setPage('add')
    }
  },[props?.location])

  if(page == 'list') return <BillingMethodList {...props} setPage={setPage}/>
  else if(page == 'add') return <AddBillingMethod {...props} setPage={setPage}/>
  else return null;

}

const BillingMethodList = (props) =>{
  const onClickAdd = () => {
    props.setPage('add');
    props.history.push('/my-area/add-billing-method')
  }

  return (
    <div className="luxe-slidecard billing-method-container">
      <div className="container-terms">
        <Row justify="center">
          <Col md={10} xxl={8} span={24}>
            <div style={{ display: 'block' }}>
              <BillingMethodItem />
              <BillingMethodItem />
              <BillingMethodItem />
            </div>
            <ButtonLink className="add-btn" onClick={onClickAdd}>
              + Add Billing Method
            </ButtonLink>
          </Col>
        </Row>
      </div>
    </div>
  )
}

const BillingMethodItem = () => (
  <Card hoverable className="delivery-address-section" bodyStyle={{ padding: '0px' }}>
    <Row>
      <Col span={21}>
        <div className="address-discription">
          <h3>Mastercard ****9098</h3>
          <p>Izabela Lawrence</p>
          <address>
            <span>Expires 09/2023</span>
          </address>
          <span className="dft-btn">DEFAULT</span>
        </div>
      </Col>
      <Col span={3} className="top-btm-center">
        <DeleteIcon />
      </Col>
    </Row>
    <Row>
      <ButtonLink className="default-btn">Define as default</ButtonLink>
    </Row>
  </Card>
)

export default BillingMethods;
