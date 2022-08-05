import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd'
import AuthContext from '../../helpers/authContext'
import CloseIcon from './../../../../public/images/close.svg'
import MenuIcon from './../../../../public/images/menu_medium_burger.svg'
import MenuIconBlack from './../../../../public/images/menu_black.svg'
import BackIcon from './../../../../public/images/back.svg'
import EnvelopeIcon from './../../../../public/images/envelope.svg'
import Config from './../../../config'
import { getParentCategory, smoothScrollToActiveTab } from '../../helpers/helpers'

import EMKLogo from './../../../../public/images/EMK-Logo-white-Linear.svg'
import EMKLogoBlack from './../../../../public/images/EMK-Logo-Black-Linear.svg'

const Header = (props) =>{
	const context = useContext(AuthContext)
	const [openHamburger, toggleHamburger] = useState(false);

	// if(!context.isNavigationPanelOpen) return null

	let hide = false;
	const hideHeaderFor = ['/product/', '/my-reviews/add-video-review/', '/my-reviews/add-text-review/']
	hideHeaderFor.forEach(hideFor=>{
		if(props.location.pathname.indexOf(hideFor) === 0){
			hide = true;
		}
	})

	if(hide) return null;

	if(props.common.menus && props.common.menus.total && !context.navigationPanel){
		if(openHamburger) return <HamburgerMenu {...props}/>
		else return <HeaderMenu {...props}/>
	}
	else return null;
}


const HeaderMenu = (props) =>{
	const context = useContext(AuthContext)
	const [showTop, setShowTop] = useState(false)
	const [activeMenu, setActiveMenu] = useState('');
	const theme = context.theme;
  const subTheme = context.subTheme;

  const [isSmoothScroll, setIsSmoothScroll] = useState(false);

  const interval = useRef(null)
  const scrollInterval = useRef(null)

  const darktheme = ['discover', 'skincare'];

	useEffect(()=>{
    
		const mainMenu = getParentCategory(props.location.pathname);
		const activeMenu = props.common.menus.list.filter(data => data.slug === mainMenu)
		const activeMenuID = activeMenu && activeMenu[0] ? activeMenu[0].id : '';
		setActiveMenu(activeMenuID);
    handleTouchEnd();
	}, [props.location.pathname, props.common.menus])

  useEffect(()=>{
		if(activeMenu){
			setTimeout(()=> { 
        scrollToActiveTabs();
        clearInterval(interval.current);
			}, 400);
		}
	}, [activeMenu])


	const getMenuSlug = (menu) =>{
		let slug = '/';
		if(menu && menu.slug){
			slug += menu.slug;
			if(menu.child && menu.child.list && menu.child.list[0] && menu.child.list[0].slug){
				slug += `/${menu.child.list[0].slug}`;
			}
		}
		return slug;
	}

	const menuChanged = (e) =>{
		document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
	}

	let addOpacity = showTop ? 'tabs-container--show' : ''
	// let styleNavPanel = context.isNavigationPanelOpen ? '' : ''

  const handleTouchEnd = () => {
    let timer = 0
    clearInterval(interval.current)

    interval.current = setInterval(() => {
      timer += 1
      if (timer === 2) {
        scrollToActiveTabs()
        
        timer = 0
        clearInterval(interval.current)
      }
    }, 1000)
  }

  const scrollToActiveTabs = () => {
    clearInterval(scrollInterval.current);
    scrollInterval.current = smoothScrollToActiveTab('top-bar-container', isSmoothScroll);
    if(!isSmoothScroll) {
      setIsSmoothScroll(true);
    }
	}

	return (
		<div className="top-bar-container">
      <div className="top-logo-container">
        {theme === 'light' && subTheme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
			</div>
				<div
      className={`tabs-container tabs-container-${theme} ${addOpacity}`}
			onTouchEnd={handleTouchEnd}
			onMouseUp={handleTouchEnd}
      role="button"
      tabIndex="0"
    >
				{
					props.common.menus.list.map((menu, index) => {
						if(menu.id){
							const slug = getMenuSlug(menu);

						return (
							<div
								className={activeMenu == menu.id ? `tab tab-active` : `tab tab-inactive`}
								id={`mainMenuId_${menu.id}`}
								key={index}
								data-active={activeMenu == menu.id}
								role="button"
								tabIndex="0"
							>
									<div className="tab-title"><Link to={`${slug}`} onClick={menuChanged}>{menu.name}</Link></div>
									<div className='tab-underline tab-active-dot'/>
							</div>
						)
						}
					})}
    </div>	
				<div
      className={`menu-container-${theme} d-none d-md-flex`}
      role="button"
      tabIndex="0"
    >
      {theme === 'white' ? <MenuIcon /> : <MenuIconBlack />}
    </div>
	</div>
	)
}


const HamburgerMenu = (props) =>{
	return (
		<div className="top-bar-container-menu">
			<div className="logo-container-menu d-none d-md-flex">
        {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
          <div className="close-container" role="button" tabIndex="0">
            <CloseIcon />
					</div>
			</div>
			<TabsMenu {...props}/>
	</div>
	)
}

const TabsMenu = (props) =>{
	const menus = props.common.menus;
	const [isActive, setActive] = useState(0);

	if(menus && menus.length){
		return(
			<div className="tabs-container-menu">
				<div className="tabs-sub-container-menu">
					{
						menus.map((menu) => {
							return (
								<div
										key={menu.id}
										className={isActive === menu.id ? `tab-active` : `tab-inactive`}
										data-id={menu.id}
										role="button"
										tabIndex="0"
								>
										<div className="tab-title">{menu.name}</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
	else return null;
}


export const StaticLogoHeader = (props) => {
  const context = useContext(AuthContext);
  const theme = context.theme;
	return (
			<div className="static-header">
					<Row>
							<Col span={8}>
									<BackIcon onClick={() => props.history.goBack()} />
							</Col>
							<Col span={8} className="text-center">
									<a href="/">
                      {theme === 'light' ? <EMKLogoBlack /> : <EMKLogo />}
									</a>
							</Col>
							<Col span={8} className="static-header-right">
									<a href={`mailto:${Config.CONTACT_EMAIL}`} target="_blank"><EnvelopeIcon /></a>
							</Col>
					</Row>
			</div>
	)
}

export const StaticHeader = (props) => {
	const { title } = props
	return (
					<Row>
							<Col span={8}>
									<BackIcon onClick={() => props.history.goBack()} />
							</Col>
							<Col span={8} className="static-header-title">
									{title}
							</Col>
							<Col span={8} className="static-header-right">
								<a href={`mailto:${Config.CONTACT_EMAIL}`} target="_blank"><EnvelopeIcon /></a>
							</Col>
					</Row>
	)
}

export const CartStaticHeader = () => {
	const context = useContext(AuthContext)
	const closeCart = () => {
		context.closeCartPopup();
	}
	return (
		<Row>
			<Col span={8}>
				<a href={`mailto:${Config.CONTACT_EMAIL}`} target='_blank'><EnvelopeIcon /></a>
			</Col>
			<Col span={8} className='static-header-title'>
				My Cart
			</Col>
			<Col span={8} className='close-icon-container'>
				<CloseIcon onClick={closeCart} />
			</Col>
		</Row>
	)
}

export default Header;
