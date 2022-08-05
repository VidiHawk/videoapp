import React, { useEffect, useContext, Fragment, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import AuthContext from './../../helpers/authContext';
import { connect } from 'react-redux';
import { getChildCategory, getParentCategory, getChildCategoriesList, getCategoryFromID} from './../../helpers/helpers';
import CloseIcon from './../../../../public/images/close.svg'
import { loadNavigationPanelVideos } from './../../data/ducks/video/actions'
import config from '../../../config'
const showNavPanelFor = ['discover', 'skincare'];


const NavigationPanel = React.memo(function NavigationPanel(props) {
  const context = useContext(AuthContext);
  const { navigationPanel } = context;
  const [activeMenuId, setActiveMenuId] = useState(0);
  const [activeMenuSlug, setActiveMenuSlug] = useState(0);
  const [activeSubMenuId, setActiveSubMenuId] = useState(0);
  const [subMenus, setSubmenus] = useState([]);
  const luxeNPanelHorizontal = React.useRef(null)
  const npanelBottomRef = React.useRef(null)

  useEffect(()=>{
    if(navigationPanel){
      const currentPath = props.location.pathname;
      const isPDP = currentPath.indexOf('/product/') == 0;

      if(isPDP){
        const mainMenuId = props?.product?.detail?.parentCategoryId || 0;
        const childMenuId = props?.product?.detail?.categoryId || 0;

        const mainMenuData = getCategoryFromID(props.common.menus.list, mainMenuId);
        const mainMenuSlug =  mainMenuData.slug || ""
        const subMenuList = getChildCategoriesList(props.common.menus.list, mainMenuSlug);

        setActiveMenuId(mainMenuId);
        setActiveSubMenuId(childMenuId);
        setSubmenus(subMenuList);
        setActiveMenuSlug(mainMenuSlug)
      }
      else{
        const mainMenu = getParentCategory(props.location.pathname);
        const activeSubMenu = getChildCategory(props.location.pathname);
        const subMenuList = getChildCategoriesList(props.common.menus.list, mainMenu);

        const activeMenuArr = props?.common?.menus?.list?.length ? props.common.menus.list.filter(data=>data.slug==mainMenu): [];
        const activeMenuID = activeMenuArr && activeMenuArr[0] ? activeMenuArr[0].id : 0;

        const activeSubMenuArr = subMenuList && subMenuList.length && subMenuList.filter(data=>data.slug==activeSubMenu);
        const activeSubMenuID = activeSubMenuArr && activeSubMenuArr[0] ? activeSubMenuArr[0].id : 0;

        setActiveMenuId(activeMenuID);
        setActiveSubMenuId(activeSubMenuID);
        setSubmenus(subMenuList);
        setActiveMenuSlug(mainMenu)
      }
    }
  }, [navigationPanel])


  useEffect(()=>{
    const subMenuList = getChildCategoriesList(props.common.menus.list, activeMenuSlug);
    const activeSubMenuID = subMenuList && subMenuList.length ? subMenuList[0].id : 0;
    setSubmenus(subMenuList);
    setActiveSubMenuId(activeSubMenuID);
  }, [activeMenuSlug])

  useEffect(()=>{
		if(activeMenuId){
      if(navigationPanel) {
        setTimeout(()=>{ 
          const el = document.getElementById(`mainMenuId_${activeMenuId}`);
          context.scrollInViewPort(el);
        }, 1000);
      }
      if(!(props.video.navigationPanelVideos[activeMenuId])){
        props.loadNavigationPanelVideos(activeMenuId);
      }
		}
	}, [activeMenuId])


  const topMenuChanged = (e) =>{
    setActiveMenuId(e.currentTarget.dataset.id);
    setActiveMenuSlug(e.currentTarget.dataset.slug)
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    context.scrollInViewPort(e.target);
  }

  const handleScroll = () => {
    if (npanelBottomRef.current && luxeNPanelHorizontal.current) {
      luxeNPanelHorizontal.current.scrollTo({ left: npanelBottomRef.current.scrollLeft });
    }
  }

  return(
   <Fragment>
    <CSSTransition in={navigationPanel} timeout={300}classNames="luxe-nwrapper">
     <div>
      {
       navigationPanel && (
        <Fragment>
         <TopNavigation {...props} activeMenuId={activeMenuId} topMenuChanged={topMenuChanged}/>
         <div className="luxe-npanel-container luxe-npanel-container--vertical">
            <div id="video-container" className="luxe-npanel-container--horizontal">
              <ChildVideos npanelBottomRef={npanelBottomRef} handleScroll={handleScroll} {...props} activeMenuId={activeMenuId} subMenus={subMenus} activeMenuSlug={activeMenuSlug} activeSubMenuId={activeSubMenuId} npanelBottomRef={npanelBottomRef}/>
              <BottomNavigation {...props} activeMenuId={activeMenuId} subMenus={subMenus} activeSubMenuId={activeSubMenuId} luxeNPanelHorizontal={luxeNPanelHorizontal}/>
            </div>
          </div>
        </Fragment>
       )
      }
     </div>
    </CSSTransition>
   </Fragment>
  )
})


const TopNavigation = React.memo(function TopNavigation(props) {
 const context = useContext(AuthContext);
 const { theme } = context;
 const { activeMenuId, topMenuChanged } = props;

 const addOpacity = 'tabs-container--show';
 const styleNavPanel = 'tabs-container--navPanel';

  useEffect(() => {
    if(activeMenuId) {
      scrollToActiveMenu();
    }
  }, [activeMenuId])

  const scrollToActiveMenu = () => {
    const el = document.getElementById(`mainMenuId_${activeMenuId}`);
    if(el) {
      el.scrollIntoView();
    }
  }


 return(
  <div className="top-bar-container">
   <div className={`tabs-container tabs-container-${theme} ${styleNavPanel} ${addOpacity}`}>
    {props.common?.menus?.list?.length > 0 &&
      props.common.menus.list.map((menu, index) => {
        if(showNavPanelFor.indexOf(menu.slug)>-1){
          return (
            <div
             onClick={topMenuChanged}
             className={activeMenuId == menu.id ? `tab tab-active` : `tab tab-inactive`}
             id={`mainMenuId_${menu.id}`}
             key={index}
             data-id={menu.id}
             data-slug={menu.slug}
             data-active={activeMenuId == menu.id ? true : false}
             role="button"
             tabIndex="0"
            >
             <div className="tab-title">{menu.name}</div>
             <div className="tab-underline"></div>
            </div>
           )
        }
      })}
    </div>
  </div>
 )
})

const BottomNavigation = (props) =>{
 const context = useContext(AuthContext);
 const { subMenus, activeSubMenuId, luxeNPanelHorizontal } = props;

 //if(subMenus && subMenus.length){
  return (
   <Fragment key="bottom-navigation">
     {/* <div ref={luxeNPanelHorizontal} id="menu-container"  className="luxe-npanel-bottom">
     { subMenus.map((menu, index) => {
        const classSubMenu = menu.id== activeSubMenuId? 'luxe-subName--isActive' : ''
        return (
         <Fragment key={menu.id}>
           <div key={index} id={`subMenuId_${menu.id}`} className={`luxe-subName ${classSubMenu}`}>
            {menu.name}
           </div>
         </Fragment>
        )
      })}
    </div> */}
    <div className="luxe-npanel-close">
     <div className="close-container">
      <CloseIcon onClick={() => { context.toggleNavigationPanel(false)}}/>
     </div>
    </div>
   </Fragment>
  );
 //}
 //else return null;

 
}


const ChildVideos = React.memo(function ChildVideos(props) {
  const context = useContext(AuthContext);
  const {activeMenuId, video, subMenus, activeMenuSlug, activeSubMenuId, npanelBottomRef, handleScroll} = props;

  const getFilteredMenu = (id) =>{
    const subMenuArr = subMenus.filter(menu=>menu.id == id);
    return subMenuArr && subMenuArr[0] ? subMenuArr[0] : {};
  }

  const menuClicked = (menu)=>{
    context.toggleNavigationPanel(false);
    props.history.push(`/${activeMenuSlug}/${menu.slug}`);
  }

  const openVideoURL = (menuData, videos) =>{
    context.toggleNavigationPanel(false)
    let videoURL = `/${activeMenuSlug}/${menuData.slug}/${videos.slug}`;
    props.history.push(videoURL);
  }

  useEffect(() => {
    if(activeSubMenuId) {
      scrollToActiveMenu();
    }
  }, [activeSubMenuId])

  const scrollToActiveMenu = () => {
    const el = document.getElementById(`luxe-npanel__col_${activeSubMenuId}`);
    if (el) {
      el.scrollIntoView();
    }
  }

 if(video.navigationPanelVideos[activeMenuId]){
  const allVideos = video.navigationPanelVideos[activeMenuId];
  return(
    <div className="luxe-npanel" ref={npanelBottomRef} onScroll={handleScroll}>
      {Object.keys(allVideos) && Object.keys(allVideos).length &&
        Object.keys(allVideos).map((menuId, i) => {
          const menuData = getFilteredMenu(menuId);
          return (
            <div className={`luxe-npanel__col`} key={i} id={`luxe-npanel__col_${menuId}`}>
              {allVideos && allVideos[menuId] && allVideos[menuId].length ? allVideos[menuId].map((videos, j) => {
                let videoThumbnail =
                  videos.poster === null
                    ? 'url(images/placeholder_nav_panel.jpg)'
                    : 'url( ' + ((videos.thumbnail || 'https').indexOf('https') >= 0  ? videos.thumbnail : (config.CDN_BUCKET_URL + videos.thumbnail)) + ')'
                return (
                  <div
                    className="luxe-npanel__item"
                    key={j}
                    role="button"
                    tabIndex="0"
                    onClick={()=>openVideoURL(menuData, videos)}
                  >
                    <div className="luxe-npanel__item__desc">{videos.name}</div>
                    <div
                      className="luxe-npanel__item__img"
                      title={videos.name}
                      style={{ backgroundImage: videoThumbnail }}
                    />
                  </div>
                )
              })
              :
              <div className="luxe-npanel__item">
                <div className="luxe-npanel__item__desc" onClick={()=>menuClicked(menuData)}>{menuData.name}</div>
              </div>
            }
            </div>
          )
        })
      }
    </div>
 )
}
else return null;
 
})



const mapStateToProps = (state) => ({
	video: state.video,
});

const mapDispatchToProps = {
	loadNavigationPanelVideos
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationPanel);
