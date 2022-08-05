import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../helpers/authContext'
import { getChildCategory, getParentCategory, smoothScrollToActiveTab } from '../../helpers/helpers'
import { isIPad13, isMobileOnly, mobileModel, withOrientationChange } from 'react-device-detect'

let Footer = (props) =>{
	const context = useContext(AuthContext);
	const [parentMenu, setParentMenu] = useState({});
	const [submenus, setSubmenus] = useState([]);
	const [isSmoothScroll, setIsSmoothScroll] = useState(false);
	const [isActive, setIsActive] = useState('');
	const theme = context;
  const { isLandscape } = props

  const interval = useRef(null)
  const scrollInterval = useRef(null)

	let hide = false;
	const hideFooterFor = ['/my-reviews/add-text-review/', '/my-reviews/add-video-review/'];
	hideFooterFor.forEach(hideFor => {
		if(props.location.pathname.indexOf(hideFor) === 0) hide = true;
	})

	useEffect(()=>{
		const activeMenu = getParentCategory(props.location.pathname);
		const activeSubMenu = getChildCategory(props.location.pathname);

		const subMenusArr = props.common.menus && props.common.menus.list && props.common.menus.list.filter(menu=>menu.slug == activeMenu)
		const subMenuList = subMenusArr && subMenusArr[0] && subMenusArr[0].child ? subMenusArr[0].child.list : [];
		
		const parentMenuData = subMenusArr && subMenusArr[0] ? subMenusArr[0] : [];

		if(subMenuList && subMenuList.length && activeSubMenu){
			const activeSubMenuData = subMenuList.filter(menu => menu.slug === activeSubMenu)
			if(activeSubMenuData && activeSubMenuData[0]){
				setIsActive(activeSubMenuData[0].id);
        handleTouchEnd();
			}
		}

		setParentMenu(parentMenuData);
		setSubmenus(subMenuList);
	}, [props.common.menus, props.location.pathname])

  useEffect(() => {
    if (isActive) {
      setTimeout(()=> {
				scrollToActiveTabs();
        clearInterval(interval.current);
			}, 800);
    }
  }, [isActive])

	const menuChanged = (menu) => {
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
		const activeMenu = getParentCategory(props.location.pathname);
		if ('settings'.indexOf(activeMenu) > -1) {
			setIsActive(menu.id)
      const activeElement = document.getElementById(menu.slug)

			if (activeElement) {
				activeElement.scrollIntoView();
			}
		}
	}

	const subMenuSlug = (subMenu) => {
		return `/${parentMenu.slug}/${subMenu.slug}`
	}

  const handleTouchEnd = () => {
    let timer = 0;

    clearInterval(interval.current);

    interval.current = setInterval(() => {
      timer += 1;
      if (timer === 3) {
        scrollToActiveTabs();
        
        timer = 0;
        clearInterval(interval.current);
      }
    }, 1000);
  }

  const scrollToActiveTabs = () => {
    clearInterval(scrollInterval.current);
    scrollInterval.current = smoothScrollToActiveTab('bottom-bar-container', isSmoothScroll);
    if(!isSmoothScroll) {
      setIsSmoothScroll(true)
    }
	}

	if(submenus && submenus.length && !hide){
    let dynamicClass = "";
    if (isIPad13 || (mobileModel === "iPhone" && isLandscape)) {
      dynamicClass = "bottom-25";
    } else if (isMobileOnly) {
      dynamicClass = "bottom-5";
    }
		return (
			<div className={`bottom-bar-container ${dynamicClass}`}>
					<div className='spacing'/>
					<div id="footer-menu" className={`subtabs-container subtabs-container-${theme}`}
							 onTouchEnd={handleTouchEnd} onMouseUp={handleTouchEnd}>
					{ submenus.map((menu, index) => {
							return (
									<Link
											key={index}
											className={isActive === menu.id ? `tab tab-active` : `tab tab-inactive`}
											id={`footerMenuId_${menu.slug}`}
											data-id={menu.id}
											data-active={isActive === menu.id}
											to={subMenuSlug(menu)} onClick={() => menuChanged(menu)}
									>
											<div className="tab-underline" />
											<div className="tab-title">
												<div data-id={menu.id}>{menu.name}</div>
											</div>
									</Link>
								)
							})}
					</div>
					<div className='spacing'/>
			</div>
		)
	}
	else return null;


}

Footer = withOrientationChange(Footer);

export default Footer;
