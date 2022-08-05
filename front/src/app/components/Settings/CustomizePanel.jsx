import React, { useCallback, useState, useEffect } from 'react'
import { PrimarySwitch, Button } from './../Elements'
import handleViewport from './../Elements/HandleViewPort'
import AuthContext from './../../helpers/authContext'
import CustomizePanelOld from './CustomizePanelOld'

const CustomizePanel = (props) => {
  const context = React.useContext(AuthContext)

  const { forwardedRef, inViewport, settingsDataList } = props
  const [darkMode, setDarkMode] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [showPicture, setShowPicture] = useState(false)
  const [showName, setShowName] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [showOrder, setShowOrder] = useState(false)

  const onSwitchShowAll = useCallback((value) => {
    setShowAll(value)
    setShowName(value)
    setShowOrder(value)
    setShowPicture(value)
    setShowReview(value)
  }, [])

  const onSave = useCallback(() => {
    //UPDATE SETTINGS HERE
  }, [showPicture, showName, showReview, showOrder])

  const onLogout = () => {
    context.logout();
  }

  const onLogin = () => {
    context.openLoginPopup();
  }

  useEffect(() => {
    if (showPicture && showName && showReview && showOrder) {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }, [showPicture, showName, showReview, showOrder])

  useEffect(() => {
    // setShowName(settingsDataList.showName)
    // setShowOrder(settingsDataList.showOrder)
    // setShowPicture(settingsDataList.showPicture)
    // setShowReview(settingsDataList.showReview)
  }, [settingsDataList])

  const onSwitchOn = () => {
    context.changeTheme(!darkMode ? 'dark' : 'light')
  }

  useEffect(() => {
    setDarkMode(context.theme !== 'light')
  }, [context.theme])

  const logoutBtn = !context.authenticated ? 'disabled' : false
  return (
    <div className="settings-container-section" ref={forwardedRef} id={props.id}>
      <div className="container-terms theme-page">
        {/* <div className="settings-sub-title">Customize</div> */}
        <div className="settings-sub-container">
          <span className="contrast-text">Dark contrast</span>
          <PrimarySwitch onChange={onSwitchOn} checked={darkMode} />
        </div>
        {context.authenticated && (
          <div className="settings__btn">
            <Button btntype="secondary" onClick={onLogout} disabled={logoutBtn} theme={context.theme}>
              Log Out
            </Button>
          </div>
        )}
        {!context.authenticated && (
          <div className="settings__btn">
            <Button btntype="secondary" onClick={onLogin} theme={context.theme}>
              Log In
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomizePanel;
