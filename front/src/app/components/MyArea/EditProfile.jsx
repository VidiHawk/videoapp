import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { Row, Col, Input, Form, Alert, Avatar, Drawer, Upload } from 'antd'
import { ButtonLink, Calendar, LuxeSpin } from './../Elements'
import AuthContext from './../../helpers/authContext'
import BackArrowWhite from '../../../../public/images/back_arrow_light.svg'
import BackArrowBlack from '../../../../public/images/back_arrow_light.svg'
import PenAerrow from '../../../../public/images/pen.svg'
import FemaleIcon from '../../../../public/images/female_icon.svg'
import MaleIcon from '../../../../public/images/male_icon.svg'
import OtherIcon from '../../../../public/images/other_icon.svg'
import NotpreferIcon from '../../../../public/images/notprefer_icon.svg'
import AvatarImage from '../../../../public/images/avatar-svg.svg'
import moment from 'moment'
import { useHistory } from 'react-router'
import { editProfile, changePassword } from './../../data/ducks/user/actions';
import { PrimaryButton } from '../Elements/Button'

const DetailForm = (props) => {
  const history = useHistory()
  const context = useContext(AuthContext)
  const { theme, showToastMessage } = context
  const {setPasswordChange} = props;
  const [form] = Form.useForm()
  const [genderValue, setGenderValue] = useState(undefined)
  const [uploadedFile, setUploadedFile] = useState(undefined)
  const [drawerState, setDrawerState] = useState(false)
  const [uploadedFileUrl, setUploadedFileUrl] = useState(undefined)
  const [loader,setLoader] = useState(false);
  const profilePhoto = uploadedFileUrl
    ? uploadedFileUrl
    : props.user?.me?.avatar
    ? props.user?.me?.avatar
    : ''



  const handleClickClose = () => {
    props.setPage('profile')
    props.history.push('/my-area/personal-details')
  }

  const handleGenderChange = (gender) => {
    setGenderValue(gender)
    form.setFieldsValue({ gender: gender })
  }

  useEffect(() => {
    props.user.me?.gender && setGenderValue(props.user.me?.gender)
  },[props.user.me?.gender])

  function onChange(value) {
     form.setFieldsValue({ dob: moment(value).format('MMMM D, YYYY') })
    setDrawerState((prevDrawerState) => !prevDrawerState)
  }

  const DrawerItem = (props) => {
    return (
      <Drawer
        title="Birth Date"
        placement="bottom"
        closable={false}
        onClose={() => setDrawerState(false)}
        visible={drawerState}
        key={'bottom'}
        height={400}
      >
        <Calendar defaultValue={props.selectedDate ? moment(props.selectedDate) : moment()} className="form-input-set" onChange={onChange} />
      </Drawer>
    )
  }

  const validateMessages = {
    require: {
      email: '${label} is required!',
    },
    types: {
      email: '${label} is not a valid E-mail!',
    },
  }

  const handleSubmitForm = () =>{
    getAllParams((params)=>{
      props.editProfile(params).then((response) => {
        if (response) {
          setLoader(false);
          showToastMessage({
            message: "Profile updated successfully!",
            type: 'success',
          })
          setUploadedFile(undefined);
          props.me();
          history.push('/my-area/personal-details')
        } 
        else {
          setLoader(false);
          showToastMessage({
            message: "Something went wrong!",
            type: 'error',
          })
        }
      })
      .catch((error) => {
        showToastMessage({
          message: "Something went wrong!",
          type: 'error',
        })
      })
    })
  }

  const getAllParams = (cb) => {
    const formValue = {...form.getFieldsValue(), dob: moment(form.getFieldValue('dob')).format( `YYYY-MM-DD`)}
    setLoader(true)
    checkAndUploadAvatar((avatar)=>{
      cb({ ...formValue, avatar })
    })
  }

  const checkAndUploadAvatar = (cb) =>{
    if(uploadedFile?.name){
      props.generateSignedUrl(uploadedFile.name, 'avatar').then(res=>{
        if(res?.[0].result?.url){
          fetch(res[0].result.url, {
            method: 'PUT',
            headers: {
              ...res[0].result.headers,
              'Content-Type': 'ignore',
              'Access-Control-Allow-Origin': '*'
            },
            body: uploadedFile,
          }).then((resp) => {
            if (resp.ok) {
              let attachementsUrl = resp.url.split('?')[0]
              cb(attachementsUrl);
            }
            else cb(profilePhoto);
          })
        }
        else cb(profilePhoto);
      })
    }
    else cb(profilePhoto);
  }

  return (
    <>
      {loader && <LuxeSpin/>}
      {!loader && <>
      <div className="top-nav-container">
        <div onClick={handleClickClose} role="button" tabIndex="0">{theme === 'light' ? <BackArrowWhite /> : <BackArrowBlack />}</div>
        <ButtonLink onClick={() => form.submit()} className="text-primary">
          Save
        </ButtonLink>
      </div>

      <div className="form-modal-container">
        <h3 className="common-title">Edit personal details</h3>
        <div className="avtar-set-center">
          <Avatar size={88} src={profilePhoto ? profilePhoto : <AvatarImage/>}/>
          <div className="Edit-image">
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={(file) => {
                setUploadedFile(file)
                let src = URL.createObjectURL(file)
                setUploadedFileUrl(src)
                return false
              }}
            >
              <PenAerrow/>
            </Upload>
          </div>
        </div>
        {props.user.me && props.user.me.user_id && (
          <Form
            form={form}
            className="form-container edit-form edit-profile-form"
            name="basic"
            onFinish={handleSubmitForm}
            validateMessages={validateMessages}
            initialValues={{
              firstName: props.user.me.first_name || '',
              email: props.user.me.email || '',
              dob: props.user.me.dob
                ? moment(props.user.me.dob).format('MMMM D, YYYY')
                : '',
              phone: props.user.me.phone || '',
              gender: props.user.me.gender || ''
            }}
          >
            <Form.Item label="Name" name="firstName" rules={[{ required: true, message: 'Please input your Name!' }]}>
              <Input placeholder="Name" className="form-input-set"/>
            </Form.Item>

            <Form.Item label="E-mail" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Email" className="form-input-set"/>
            </Form.Item>

            <ButtonLink htmlType="" onClick={() => setPasswordChange(true)} className="margin-set-btn ed-pw">
              Edit password
            </ButtonLink>

            <Form.Item name="phone" label="Phone Number">
              <Input maxLength={10} placeholder="Phone Number" className="form-input-set"/>
            </Form.Item>

            <Form.Item name="dob" label="Birth Date">
              <Input onClick={() => setDrawerState(true)} placeholder="Birth Date" className="form-input-set"/>
            </Form.Item>

            <Form.Item hidden name="gender">
              <Input className="form-input-set"></Input>
            </Form.Item>

            <div className="Gender-details">
              <h4>Gender</h4>
              <div className="main-box">
                <div
                  onClick={() => handleGenderChange('female')}
                  className={`gender-box ${genderValue === 'female' ? 'active' : ''}`}
                >
                  <div>
                    <FemaleIcon/>
                  </div>
                  <div>
                    <p>Female</p>
                  </div>
                </div>
                <div
                  onClick={() => handleGenderChange('male')}
                  className={`gender-box ${genderValue === 'male' ? 'active' : ''}`}
                >
                  <div>
                    <MaleIcon/>
                  </div>
                  <div>
                    <p>Male</p>
                  </div>
                </div>
              </div>
              <div className="main-box">
                <div
                  onClick={() => handleGenderChange('other')}
                  className={`gender-box ${genderValue === 'other' ? 'active' : ''}`}
                >
                  <div>
                    <OtherIcon/>
                  </div>
                  <div>
                    <p>Other</p>
                  </div>
                </div>
                <div
                  onClick={() => handleGenderChange('preferNotToSay')}
                  className={`gender-box ${genderValue === 'preferNotToSay' ? 'active' : ''}`}
                >
                  <div>
                    <NotpreferIcon/>
                  </div>
                  <div>
                    <p>Prefer not to say </p>
                  </div>
                </div>
              </div>
            </div>
            {drawerState && (
              <DrawerItem
                selectedDate={form.getFieldValue('dob')}
                onselect={(value) => form.setFieldsValue({ dob: value })}
              />
            )}
            {/*<div className="resend-mail-set">
              <h2>
                Please, check your <br /> inbox email
              </h2>
              <p>An email has been sent to mail@example.com with a link to confirm your email address</p>
              <button type="submit" className="ant-btn ant-btn-link resend-btn">
                Resend email
              </button>
            </div>
          */}
          </Form>
        )}
        <PrimaryButton btnClassname={"ant-btn primary-btn desktop-btn"} onClick={() => form.submit()}>Save</PrimaryButton>
      </div>
      </>}
    </>
  )
}

const PasswordChangeForm = (props) => {
  const history = useHistory()
  const { setPasswordChange, setLoader, handleClickClose } = props
  const context = React.useContext(AuthContext)
  const { theme, showToastMessage } = context
  const [form] = Form.useForm()

  const handleSubmitForm = useCallback(() => {
    const params = {
      newPassword: form.getFieldValue('password'),
      oldPassword: form.getFieldValue('currentPassword'),
      email: props.user.me.email
    }
    props.changePassword(params).then((response) => {
      if (response && !response[0]?.error) {
        showToastMessage({
          message: response?.data?.UpdatePassword?.message,
          type: 'success'
        })
        setPasswordChange(false)
      } else {
        showToastMessage({
          message: response && response[0]?.error?.title,
          type: 'error'
        })
      }
    })
      .catch((error) => {
        showToastMessage({
          message: error.networkError.result.errors[0].message,
          type: 'error'
        })
      })
  }, [])

  return (
    <>

      <div className="top-nav-container" onClick={() => handleClickClose()} role="button" tabIndex="0">
        {theme === 'white' ? <BackArrowWhite/> : <BackArrowBlack/>}
        <ButtonLink onClick={handleSubmitForm} className="text-gray">
          Save
        </ButtonLink>
      </div>

      <div className="edit-password-title form-modal-container">
        <h3 className="common-title">Edit password</h3>
        <p className="common-description">This is an example of title´s subtitle and can be longer until two lines so
          far.</p>
        {props.user.me && props.user.me.user_id && (
          <Form form={form} className="form-container" name="basic">
            <Form.Item
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
            >
              <Input.Password placeholder="Current Password" className="form-input-set"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!'
                }
              ]}
            >
              <Input.Password placeholder="New Password" className="form-input-set"/>
            </Form.Item>
          </Form>
        )}
        <PrimaryButton btnClassname={"ant-btn primary-btn desktop-btn"} onClick={handleSubmitForm}>Save</PrimaryButton>
      </div>
    </>
  )
}

const EditProfile = (props) => {
  const context = React.useContext(AuthContext)
  const { theme } = context
  const [passwordChange, setPasswordChange] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleClickClose = () => {
    if(!passwordChange){
      props.setPage('profile')
      props.history.push('/my-area/personal-details')
    } else {
      setPasswordChange(false)
      props.history.push('/my-area/edit-profile')
    }
  }

  let dynamicClass = 'edit-form-container auth-container';
  if (theme === 'dark') {
    dynamicClass = dynamicClass + ' auth-container-dark'
  }

  useEffect(() => {
    const pathname = props.location.pathname.split('/');
    if(pathname && (pathname[2] === 'change-password')){
      setPasswordChange(true)
    }
  },[props?.location])

  const onChangePassword = (status) => {
    if(status) {
      setPasswordChange(status);
      props.history.push('/my-area/change-password')
    } else {
      props.history.push('/my-area/edit-profile')
    }
  }

  return (
    <div className={`${dynamicClass}`}>
      <div className="desktop-back-btn" onClick={handleClickClose} role="button" tabIndex="0">{theme === 'light' ? <BackArrowWhite /> : <BackArrowBlack />}</div>
      <Row justify="center">
        {/*<Col md={16} xxl={18} span={0} className="bg-container" />*/}
        <Col
          md={18}
          xxl={13}
          span={24}
          className={`${
            passwordChange ? 'myarea-bg-white' : ''
          }`}
        >
          {passwordChange ? (
            <PasswordChangeForm
              {...props}
              handleClickClose={handleClickClose}
              setPasswordChange={onChangePassword}
              setLoader={setIsLoading}
            />
          ) : (
            <DetailForm
              {...props}
              handleClickClose={handleClickClose}
              setPasswordChange={onChangePassword}
              setLoader={setIsLoading}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}


export default EditProfile;
