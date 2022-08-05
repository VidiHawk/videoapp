import React from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, Typography } from 'antd'
import { BackButton, Button } from './../Elements'
import EMKLogo from './../../../../public/images/EMK-Logo-white-Linear.svg'
import EMKLogoBlack from './../../../../public/images/EMK-Logo-Black-Linear.svg'
import AuthContext from '../../helpers/authContext'

export const ConfirmPassword = (props) => {
  const history = useHistory()
  const context = React.useContext(AuthContext)
  const { theme } = context

  const handleClickBack = () => props.setPage('login')

  let dynamicClass = 'auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  React.useEffect(() => {}, [])
  return (
    <div>
      <Row>
        <Col md={16} xxl={18} span={0} className="bg-container" />
        <Col md={8} xxl={6} span={24} className={dynamicClass}>
          <div className="position-relative d-md-none d-block">
            <BackButton onClick={handleClickBack} />
            <div className="logo-container">
              {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
            </div>
          </div>
          <div className="d-none d-md-block">
            <BackButton onClick={handleClickBack} />
            <div className="logo-container">
              {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
            </div>
          </div>
          <div className="confirm-container">
            <Typography className="text-explanation">
              An email has been sent to {props.email} with a link to reset your password for your email address
            </Typography>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ConfirmPassword
