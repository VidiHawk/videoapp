import React, { useState, useCallback, useEffect } from 'react'
import { PrimarySwitch, DownloadButton, Button } from './../Elements'
import { languages } from './../../../@constants/languages.json'

const CustomizePanelOld = (props) => {
  const { settingsDataList, language, forwardedRef, inViewport } = props

  const [activeHand, setActiveHand] = useState('right')
  const [dataSaver, setDataSaver] = useState(false)
  const [darkContrast, setDarkContrast] = useState(false)

  const onSave = useCallback(() => {
    const handMode = activeHand.toUpperCase()
    const code = languages.filter((lang) => lang.name.toLowerCase().indexOf(language.toLowerCase()) > -1)[0].code
   //UPDTATATATATA
  }, [dataSaver, darkContrast, language, activeHand])

  useEffect(() => {
    // setActiveHand(settingsDataList.handMode ? settingsDataList.handMode.toLowerCase() : 'right')
    // setDataSaver(settingsDataList.dataSaver)
    // setDarkContrast(settingsDataList.darkContrast)
  }, [settingsDataList])

  return (
    <div className="settings-container-section more-padding" ref={forwardedRef} id={props.id}>
      <div className="container-terms">
        <div>Hand use</div>
        <div className="settings-sub-container">
          <span>Data saver mode</span>
          <PrimarySwitch onChange={setDataSaver} checked={dataSaver} />
        </div>
        <div className="settings-sub-container">
          <span>Language</span>
        </div>
        <div className="settings-sub-container">
          <span>Dark contrast mode</span>
          <PrimarySwitch onChange={setDarkContrast} checked={darkContrast} />
        </div>
        <DownloadButton>Download PWA</DownloadButton>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  )
}

export default CustomizePanelOld;
