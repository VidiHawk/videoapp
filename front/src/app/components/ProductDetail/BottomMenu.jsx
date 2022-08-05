import React, {useContext, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './../../helpers/authContext'
import { isIPad13, isMobileOnly, mobileModel, withOrientationChange } from 'react-device-detect'

let BottomMenu = (props) => {
 const context = useContext(AuthContext)
 const { theme } = context;
 const { currentActive, setCurrentActive, isLandscape } = props;
 const slug = props.match.params.slug;
 const submenus = props.product.productMenus;

 useEffect(()=>{
  const allParams = props.match.params;
  const subMenu = allParams.subMenu;
  setCurrentActive(subMenu)
 }, [props.location.pathname])

 const menuChanged = (menu) =>{
   document.body.scrollTop = 0
   document.documentElement.scrollTop = 0
   setCurrentActive(menu.slug);
 }

 const handleTouchEnd = () => {
  setTimeout(function () {
    scrollToActiveTabs(true);
  }, 2500);
}

 const scrollToActiveTabs = (isSmoothScroll) => {
  const bottom = document.querySelector(".bottom-bar-container");
  if (bottom) {
    let tabsToFocus = bottom.getElementsByClassName('tab tab-active')
    if (tabsToFocus && tabsToFocus.length) {
      if (isSmoothScroll) {
        tabsToFocus[0].scrollIntoView({behavior: 'smooth', inline: 'center'});
      } else {
        tabsToFocus[0].scrollIntoView({inline: 'center'});
      }
    }
  }
}

 if (submenus && submenus.length) {
  let dynamicClass = "";
  if (isIPad13 || (mobileModel === "iPhone" && isLandscape)) {
    dynamicClass = "bottom-25";
  } else if (isMobileOnly) {
    dynamicClass = "bottom-5";
  }
  return (
    <div className={`bottom-bar-container ${dynamicClass}`}>
     <div className='spacing'/>
     <div className={`subtabs-container subtabs-container-${theme}`} onTouchEnd={handleTouchEnd} onMouseUp={handleTouchEnd}	>
      { submenus.map((menu, index) => {
        return (
          <Link
            key={index}
            className={currentActive === menu.slug ? `tab tab-active` : `tab tab-inactive`}
            data-slug={menu.slug}
            data-active={currentActive === menu.slug}
            id={`subMenuId_${menu.slug}`}
            to={`/product/${slug}/${menu.slug}`} onClick={() => menuChanged(menu)}
          >
            <div className="tab-underline" />
            <div className="tab-title">
             <div data-slug={menu.slug}>{menu.name}</div>
            </div>
          </Link>
         )
        })
       }
     </div>
     <div className='spacing'/>
   </div>
   )
 } else return null;
}

BottomMenu = withOrientationChange(BottomMenu);

export default BottomMenu
