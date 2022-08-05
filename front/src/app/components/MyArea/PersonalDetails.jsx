import React, { useEffect, useState, useContext } from 'react'
import { Avatar, Col, Row } from 'antd'
import { ButtonLink } from '../Elements/ButtonLink'
import { PrimaryButton } from '../Elements/Button'
import AuthContext from '../../helpers/authContext'
import moment from 'moment'
import { NoLogin } from "./../Common/EmptyPages";
import EditProfile from "./EditProfile";
import AvatarImage from '../../../../public/images/avatar-svg.svg'
// import IconLoading from '../../../../public/images/icon_loading.svg'
// import DefaultAvatar from '../../../../public/images/avatar-svg.svg'

const PersonalDetails = (props) => {
  const [page, setPage] = useState('profile');

  useEffect(() => {
    const pathname = props.location.pathname.split('/');
    if(pathname && (pathname[2] === 'edit-profile' || pathname[2] === 'change-password')){
      setPage('edit-profile')
    }
  },[props?.location])

  if(page == 'profile') return <UserProfile {...props} setPage={setPage}/>
  else if(page == 'edit-profile') return <EditProfile {...props} setPage={setPage}/>
  else return null;
}


const UserProfile = (props) =>{
  const context = useContext(AuthContext)
  const onClickMore = () => {
    props.setPage('edit-profile')
    props.history.push('/my-area/edit-profile')
  }

  if(props.user.me && props.user.me.user_id && context.authenticated){
    const userProfile = props.user.me;
    const gender = userProfile?.gender == 'preferNotToSay' ? 'Prefer not to say' : userProfile?.gender;

    return (
      <div className="luxe-slidecard ">
        <div className="container-terms">
            <div className="personal-details-container personal-details-form">
              <Row justify="center">
                <Col md={14} lg={10} xxl={8} span={24}>
                  <div className="form-container">
                     <Avatar size={78} src={userProfile?.avatar ? userProfile.avatar : <AvatarImage />} />
                    <h3 className="user-name">
                      {userProfile.first_name} {userProfile.last_name ? userProfile.last_name.charAt(0).toUpperCase() : ''}
                      .
                    </h3>
                    <ButtonLink className="margin-set-btn" onClick={onClickMore}>
                      Edit Profile
                    </ButtonLink>
                  </div>
                  <FromItem label="E-mail" value={userProfile.email} />
                  <FromItem className="text-capitalise" label="Gender" value={gender} />
                  <FromItem label="Phone" value={userProfile.phone} />
                  <FromItem
                    label="Birth Date"
                    value={
                      userProfile.dob
                        ? moment(userProfile.dob).format('MMMM D, YYYY')
                        : ''
                    }
                  />
                  <div className="btn-register">
                    <PrimaryButton onClick={() => context.logout()}>Log out</PrimaryButton>
                  </div>
                  <div className="register-container">
                    <ButtonLink className="delete-account">Delete Account</ButtonLink>
                  </div>
                </Col>
              </Row>
            </div>
        </div>
      </div>
    )
  }
  else return <NoLogin/>
}

const FromItem = (props) => (
  <div className={`from-item ${props.className ? props.className : ''}`}>
    <span>{props.label}</span>
    <span>{props.value}</span>
  </div>
)

export default PersonalDetails;
