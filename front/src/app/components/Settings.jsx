import React, { useContext, useEffect, useState } from 'react'
import { languages } from './../../@constants/languages.json'
import CopyrightPolicyWithViewPort from './Settings/CopyrightPolicy'
import CustomizePanel from './Settings/CustomizePanel'
import TermsAndConditionsWithViewPort from './Settings/TermsAndConditions'
import PrivacyPolicyWithViewPort from './Settings/PrivacyPolicy'
import AuthContext from './../helpers/authContext'
import AboutThisApp from './Settings/AboutThisApp'
import { smoothScrollToActiveTab } from '../helpers/helpers';

const Settings = (props) => {
	const context = useContext(AuthContext)
	const [language, setLanguage] = useState('English')
	const [showLanguagePanel, setShowLanguagePanel] = useState(false)
	const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const name = languages.filter((lang) => lang.name.toLowerCase().indexOf(language.toLowerCase()) > -1)[0].name
    setLanguage(name)
  }, [language])

  const onChangeLanguage = React.useCallback((lang) => {
    setLanguage(lang)
    setShowLanguagePanel(false)
  }, [])

	useEffect(() => {
		initiateObserver();
	}, [])

	useEffect(() => {
		const subMenu = props.match.params && props.match.params.subMenu ? props.match.params.subMenu : 'customize';
		setActiveId(subMenu);
	}, [props.match.params])

	useEffect(()=>{
    if (activeId) {
      props.history.push(`/settings/${activeId}`);
  
      const submenuToScroll = document.getElementById(`footerMenuId_${activeId}`);
      if (submenuToScroll) {
        setTimeout(() => {   
          smoothScrollToActiveTab(null, true, submenuToScroll);
        }, 500)
      }
    }
		
	}, [activeId])

	const initiateObserver = () => {
		const children = document.querySelectorAll(".settings-container-section");
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.intersectionRatio > 0.50) {
					setTimeout(() => {
					const allParams = entry.target.id;
					 allParams && setActiveId(allParams);
					}, 100)
				}
			});
		}, {
			rootMargin: '0px',
			threshold: [0.25, 0.85]
		});
		children.forEach( child => {
			observer.observe(child);
		});
	}

  return (
			<div className="settings-area static-bg">
				<div className={`settings-container`} >
					{/*<CustomizePanel id="customize" {...props}/>}*/}
					<CustomizePanel id='customize' {...props} />
					<TermsAndConditionsWithViewPort id='terms-conditions' {...props} />
					<PrivacyPolicyWithViewPort id='privacy-policy' {...props} />
					<CopyrightPolicyWithViewPort id='copyright-policy' {...props} />
					<AboutThisApp id='about-this-app' {...props} />

					{/* <LanguagePanel
							showLanguagePanel={showLanguagePanel}
							setShowLanguagePanel={setShowLanguagePanel}
							onChangeLanguage={onChangeLanguage}
					/> */}
				</div>
    </div>
  )
}

export default Settings
