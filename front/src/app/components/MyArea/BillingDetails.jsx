import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { ButtonLink } from '../Elements/ButtonLink'
import { PrimarySwitch } from '../Elements/Switch'
import EditBillingDetails from './../MyArea/EditBillingDetails';
import AuthContext from '../../helpers/authContext'
import { NoLogin } from "./../Common/EmptyPages";

const BillingDetails = (props) => {
  const [page, setPage] = useState('detail');
  const context = React.useContext(AuthContext)

  useEffect(() => {
    const pathname = props.location.pathname.split('/');
    if(pathname && (pathname[2] === 'billing-details-edit')){
      setPage('edit')
    }
  },[props?.location])

  if(!context.authenticated) {
    return <NoLogin/>
  }
  if(page == 'detail') return <Detail {...props} setPage={setPage}/>
  else if(page == 'edit') return <EditBillingDetails {...props} setPage={setPage}/>
  else return null;
}


const Detail = (props) =>{
  const onClickMore = () => {
    props.setPage('edit')
    props.history.push('/my-area/billing-details-edit')
  }

  return (
    <div className="luxe-slidecard">
      <div className="container-terms">
        <div className="billing-details-container billing-details-form">
          <Row justify="center">
            <Col md={10} xxl={8} span={24}>
              <div className="from-item">
                <span>First Name</span>
                <span>Izabela</span>
              </div>
              <div className="from-item">
                <span>Last Name</span>
                <span>Lawrence</span>
              </div>
              <div className="from-item">
                <span>Address</span>
                <span>E 76th St</span>
              </div>
              <div className="from-item">
                <span>City</span>
                <span>Los Angeles</span>
              </div>
              <div className="from-item">
                <span>Region</span>
                <span>California</span>
              </div>
              <div className="from-item">
                <span>Zip / Postcode</span>
                <span>E90001</span>
              </div>
              <div className="from-item">
                <span>Country</span>
                <span>E.E.U.U.</span>
              </div>

              <div className="settings-sub-container">
                <span>Define as default</span>
                <PrimarySwitch onChange={() => {}} />
              </div>

              <ButtonLink className="billing-details-container-edit" onClick={onClickMore}>
                Edit
              </ButtonLink>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default BillingDetails;
