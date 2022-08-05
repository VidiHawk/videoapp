import React from 'react'
import { Button, SearchBar } from './../../Elements'
import { languages } from './../../../../@constants/languages.json'
import CloseIcon from './../../../../../public/images/close_grey.svg'

export const LanguagePanel = (props) => {
  const { showLanguagePanel, setShowLanguagePanel, language, onChangeLanguage } = props
  const [activeLangauge, setActiveLanguage] = React.useState(language)
  const [languageList, setLanguageList] = React.useState(languages)

  const onChange = React.useCallback(
    (e) => {
      if (!e.target.value) {
        setLanguageList(languages)
      } else {
        setLanguageList(languages.filter((lang) => lang.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1))
      }
    },
    [setLanguageList]
  )

  return (
    <div className={`language-panel-container ${showLanguagePanel && 'visible'}`}>
      <div className="col-0 col-md-8 col-xl-9 p-0 bg-left" />
      <div className="auth-container col-12 col-md-4 col-xl-3">
        <div className="close-icon-container">
          <CloseIcon onClick={() => setShowLanguagePanel(false)} alt="" />
        </div>
        <SearchBar onChange={onChange} placeholder="Search for language" />
        <div className="mb-3 lang-list-container">
          {languageList.map((lang, index) => {
            return (
              <div
                key={index}
                className={`lang-container ${lang.name === activeLangauge && 'active'}`}
                onClick={() => setActiveLanguage(lang.name)}
                onKeyPress={() => setActiveLanguage(lang.name)}
                role="button"
                tabIndex="0"
              >
                {lang.nativeName}
              </div>
            )
          })}
        </div>
        <Button onClick={() => onChangeLanguage(activeLangauge)}>Accept</Button>
      </div>
    </div>
  )
}
