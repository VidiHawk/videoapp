import React, { createRef, Fragment, useContext, useEffect, useState } from 'react'
import { defaultSideBarItems, detailSideBarItems } from '../../../@constants'
import AuthContext from './../../helpers/authContext'
import { createProductUrl, createUrl, storeShopifyPid, totalCartItems } from '../../helpers/helpers'
import { useHistory } from 'react-router'
import { LuxeSpin, ShareModal } from '../Elements'
import config from './../../../config'
import { mobileModel, isDesktop, isIPad13 } from 'react-device-detect'
import ThreeDotIcon from '../../../../public/images/icon_3dot_light.svg'

//These imports are temporary for shopify, it will be be removed once our admin is ready
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_SHOPIFY_PRODUCT } from '../../graphql/queries'
import { ADD_TO_CART, ASSOCIATE_CUSTOMER, INITIATE_CHECKOUT } from '../../graphql/mutations'
import ShopifyGraphClient from './../../graphql/client'

const shopifyClient = ShopifyGraphClient()

const initialState = {
  iconSize: 48,
  spacing: 24,
  topBarHeight: 84,
  windowHeight: 0,
}

const VideoSideMenu = (props) =>{
 const menuItems = props.isReview ? detailSideBarItems : defaultSideBarItems;
 const context = useContext(AuthContext);
 const [productId, setProductId] = useState(null);
 const [isFullScreen, setFullScreen] = useState(false);
 const [isShare, setShare] = useState(false);
 const [cartLoading, setCartLoading] = useState(false);
 const [likedVideo, setVideoLiked] = useState(false);
 const [reloadCart, setReloadCart] = useState(false);
 const [windowHeight, setWindowHeight] = useState()
 const [values, setValues] = useState({...initialState, menus: menuItems.filter(m => m.shown)});

 const metadata = props.video && props.video.meta ? props.video.meta : {};
 const history = useHistory();

let sidebarContainer = createRef(null);

 //These constants are temporary for shopify, it will be be removed once our admin is ready
const [checkout] = useMutation(INITIATE_CHECKOUT, { variables: { input: {} }, client: shopifyClient })
const [associateCustomer] = useMutation(ASSOCIATE_CUSTOMER, { client: shopifyClient })
const [addCart] = useMutation(ADD_TO_CART, { client: shopifyClient })
const [getShopifyProduct, { data: shopifyProductData, refetch: refetchShopifyProduct }] = useLazyQuery(GET_SHOPIFY_PRODUCT, { client: shopifyClient })

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize)
    updateWindowSize()
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  const updateWindowSize = () => {
    setWindowHeight(window.innerHeight)
    setValues((values) => ({ ...values, windowHeight: window.innerHeight }))
  }

  useEffect(() => {
    ["", "webkit", "moz", "ms"].forEach(
      prefix => {
        window.addEventListener(prefix+"fullscreenchange", fullScreenModechange, false)
      }
    );

    return () => {
      ["", "webkit", "moz", "ms"].forEach(
        prefix => {
          window.removeEventListener(prefix+"fullscreenchange", fullScreenModechange, false)
        }
      );
    }
  }, []);

  const fullScreenModechange = () => {
    const fullScreenMenu = values.menus.find(m => m.name === "fullscreen")
    if(document.fullscreenElement != null || document.webkitFullscreenElement != null || document.mozFullScreenElement != null || document.msFullscreenElement != null) {
      setFullScreen(true)
      fullScreenMenu.active = true;
    } else {
      setFullScreen(false)
      fullScreenMenu.active = false;
    }
    setValues((values) => ({ ...values, menus: values.menus }));
  }


  useEffect(() => {
    const { topBarHeight, iconSize, spacing } = values
    const sidebarY = sidebarContainer.current.clientHeight + 60 // 60px is default bottom
    const windowY = windowHeight - topBarHeight - spacing
    const foldItem = (count) => {
      const { menus } = values
      if (menus.length === 0 || count === 0) return

      if (menus[0].name === 'dots') {
        let foldCount = menus.length > count ? count : menus.length
        menus[0].subMenus.push(...menus.slice(1, foldCount + 1))
        menus.splice(1, foldCount)
        menus[0].shown = true;
      } else {
        const foldCount = menus.length > count + 1 ? count + 1 : menus.length
        let dotMenu = { name: 'dots', icon: <ThreeDotIcon/>, shown: true, subMenus: [] }
        dotMenu.subMenus.push(...menus.slice(0, foldCount))
        menus.splice(0, foldCount)
        menus.splice(0, 0, dotMenu)
      }
      setValues((values) => ({ ...values, menus: menus }))
    }

    const unFoldItem = (count) => {
      const { menus } = values
      if (menus.length === 0 || count === 0 || menus[0].name !== 'dots') return
      const unfoldCount = menus[0].subMenus.length > count ? count : menus[0].subMenus.length
      const start = menus[0].subMenus.length - unfoldCount
      menus.splice(1, 0, ...menus[0].subMenus.slice(start, unfoldCount + start))
      menus[0].subMenus.splice(start, unfoldCount)
      if (menus[0].subMenus.length === 1) {
        menus.splice(1, 0, ...menus[0].subMenus)
        menus[0].subMenus.splice(0, 1)
      }
      if (menus[0].subMenus.length === 0) {
        menus.splice(0, 1)
      }
      setValues((values) => ({ ...values, menus: menus }))
    }

    const isFold = windowY - sidebarY < 0;
    if (isFold) {
      const count = Math.ceil(Math.abs(windowY - sidebarY) / (iconSize + spacing))
      if (windowHeight > 0) {
        foldItem(count)
      }
    } else {
      const count = Math.floor(Math.abs(windowY - sidebarY) / (iconSize + spacing))
      if (windowHeight > 0) {
        unFoldItem(count)
      }
    }
  }, [windowHeight, values])

 useEffect(()=>{
   if(props.product && props.product){
    const shopifyProduct = props.product;
    if(shopifyProduct && shopifyProduct.shopify_product_id){
      setProductId(shopifyProduct.shopify_product_id);
    }
   }
 }, [props.video])


 useEffect(() => {
  if (shopifyProductData && shopifyProductData.products) {
    const shopifyProduct =
      shopifyProductData.products &&
      shopifyProductData.products.edges &&
      shopifyProductData.products.edges[0] &&
      shopifyProductData.products.edges[0].node
        ? shopifyProductData.products.edges[0].node
        : {}
    const variantId =
      shopifyProduct &&
      shopifyProduct.variants &&
      shopifyProduct.variants.edges &&
      shopifyProduct.variants.edges[0] &&
      shopifyProduct.variants.edges[0].node &&
      shopifyProduct.variants.edges[0].node.id
        ? shopifyProduct.variants.edges[0].node.id
        : 0
    if (variantId) {
      getCheckoutID((checkoutId) => {
        const lineItems = { quantity: 1, variantId }
        addCart({ variables: { checkoutId, lineItems } }).then(() => {
          storeShopifyPid(productId, variantId)
          setCartLoading(false)
          context.showToastMessage({
            message: `1 ${props.product.name} added to cart`, 
            type: 'success'
          })
        })
      })
    }
  }
}, [shopifyProductData, reloadCart])


  /**
   * Shopify Checkout ID to be used for all future transactions
   * @param {*} cb
   */
  const getCheckoutID =(cb) => {
    let checkoutId = Util.getLocalstorage('checkoutId')
    const customerAccessToken = Util.getLocalstorage('customerAccessToken')
    if (checkoutId) cb(checkoutId)
    else {
      checkout().then((res) => {
        if (res && res.data && res.data.checkoutCreate && res.data.checkoutCreate.checkout) {
          checkoutId = res.data.checkoutCreate.checkout.id
          Util.setLocalstorage('checkoutId', checkoutId)

          associateCustomer({ variables: { checkoutId, customerAccessToken } }).then((resp) => {
            cb(checkoutId)
          })
        }
      })
    }
  }
  
  const toggleBag = () => {
    if (props.videoId === props.bagOpenFor) {
      hideBagIcons();
    } else {
      // open
      showBagIcons();
      // check if comment is open then close
      if (props.videoId === props.commentOpenFor) {
        hideCommentSection();
      }
    }
  };

  useEffect(() => {
    if (props.bagOpenFor === 0) {
      return;
    }
  
    if (props.bagOpenFor === props.videoId) {
      document.addEventListener('click', bagOutSideClickListener);
      return () => document.removeEventListener('click', bagOutSideClickListener);
    }
  
   }, [props.bagOpenFor])

  const showBagIcons = () => {
    // show
    props.setBagOpenFor(props.videoId);
  };

  const hideBagIcons = () => {
    // hide
    props.setBagOpenFor(0);
  };

  const bagOutSideClickListener = (event) => {
    const currentContainer = document.getElementById(
      `${props.categorySlug}_video_${props.video.id}`
    );
    if (currentContainer) {
      const rightBarElement = currentContainer.querySelector(".right-bar-container");
      const bagSection = currentContainer.querySelector(".fab-container.bag");
      const outsideBag = bagSection && !bagSection.contains(event.target);
      const insideCurrentContainer = currentContainer && currentContainer.contains(event.target);
      const outsideRightBar = rightBarElement && !rightBarElement.contains(event.target);

      if (insideCurrentContainer && outsideBag && outsideRightBar) {
        // hide
        setTimeout(() => {
          hideBagIcons();
        });
      }
    }
  };


 const handleClick = (icon, isSubmenu) => {
   if(icon.subMenus && icon.subMenus.length){
     if(icon.name === "bag" && !isSubmenu) {
       toggleBag();
     } else {
       const childMenus = document.getElementById(`child-menu-${props.videoId}-${icon.name}`);
       childMenus.classList.toggle('open')
     }

   }
   else{
    const key = icon.name;
    switch (key) {
      case 'inbox':
        history.push('/inbox')
        break
      case 'like':
        likeVideoClicked()
        break
      case 'share':
        onShare()
        break
      case 'tier':
        goToDashboard();
        break
      case 'navigation':
        toggleNavigationPanel()
        break
      case 'fullscreen':
        toggleFullScreen(icon)
        break
      case 'comment':
        openCommentBox()
        break
      case 'myBasket':
        history.push('/cart');
        //context.openCartPopup(); //DO NOT MERGE POPUP CHANGE TO GITHUB UNLESS IT'S TESTED FOR BOTH MOBILE & DESKTOP
        break
      case 'add':
        addToCart();
          break
      default:
        break
    }
   }
 }

 const goToDashboard = () =>{
   if(context.authenticated) history.push('/my-area/order-history');
   else context.openLoginPopup();
 }

 const toggleFullScreen = (icon) => {
  /* View in fullscreen */
  const openFullscreen = () => {
    if (elem.requestFullscreen) {
      elem.requestFullscreen({ navigationUI: 'hide' })
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen()
    }
  }

  /* Close fullscreen */
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen()
    }
  }

  const elem = document.documentElement
  if (isFullScreen) {
    closeFullscreen()
  } else {
    openFullscreen()
  }
}
const onShare = () => {
  if(navigator && navigator.share){
    navigator.share({
      title: metadata?.og_title ? metadata.og_title : config.DEFAULT_METADATA.TITLE,
      text: metadata?.og_description ? metadata.og_description : config.DEFAULT_METADATA.OG_DESCRIPTION,
      url: createProductUrl(metadata?.slug ? metadata.slug : config.DEFAULT_METADATA.BASE_URL),
    });
  }
  else{
    setShare(true);
  }
}

 const toggleNavigationPanel = () =>{
  context.toggleNavigationPanel();
 }

 const openCommentBox = () =>{
   if(props.commentOpenFor == props.videoId )
    hideCommentSection();
   else {
    showCommentSection();
    // check if bag is open then close
    if (props.videoId === props.bagOpenFor) {
      hideBagIcons();
    }
   }
 }

 useEffect(() => {
  if (props.commentOpenFor === 0) {
    return;
  }

  if (props.commentOpenFor === props.videoId) {    
    document.addEventListener('click', commentSectionListener);
    return () => document.removeEventListener('click', commentSectionListener);
  }
 }, [props.commentOpenFor])

 const hideCommentSection = () => {
  props.setCommentOpenFor(0);
  // return to previous status
  context.resumeSubTitles();
 }

 const showCommentSection = () => {
  props.setCommentOpenFor(props.videoId);
  // When comments are turned on, captions should be turned off.
  context.hideSubTitleAsCommentOpened();
 }

 const commentSectionListener = (event) => {
  const commentElement = document.querySelector(".video-comment-wrapper");
  const currentContainer = document.getElementById(`${props.categorySlug}_video_${props.video.id}`);
  if (currentContainer) {
    const rightBarElement = currentContainer.querySelector(".right-bar-container");
    const outsideComment = commentElement && !commentElement.contains(event.target);
    const outsideRightBar = rightBarElement && !rightBarElement.contains(event.target);
    const insideCurrentContainer = currentContainer && currentContainer.contains(event.target);

    if(insideCurrentContainer && outsideComment && outsideRightBar) {
      // clicked outside of comment box
      setTimeout(() => {
        hideCommentSection();
      });
    }
  }
 }

const addToCart = () =>{
  setCartLoading(true);
  const variables = { first: 1, query: productId }
  if(shopifyProductData && shopifyProductData.products){
    refetchShopifyProduct(variables).then(res=>{
      setReloadCart(true);
    })
  }
  else{
    getShopifyProduct({ variables })
  }
}

const likeVideoClicked = () => {
  if(likedVideo){
    props.dislikeVideo(props.videoId);
    setVideoLiked(false);
  }
  else{
    props.likeVideo(props.videoId);
    setVideoLiked(true);
  }
}

const SubIcons = (props) => {
  const { item } = props
  const videoLike = props.video && props.video.like ? props.video.like : 0;
  const likes = likedVideo ? videoLike + 1 : videoLike
  const totalItems = totalCartItems();

  const showMenu = (menuName) => {
    let _return = true
    if (menuName === 'add' && !productId) _return = false
    if (menuName === 'tier' && context.authenticated) _return = false
    return _return
  }

  return (
    <>
      {item.subMenus && item.subMenus.map((subMenu, index) =>
      <div key={item.name + index}>
        <div
          key={item.name + index}
          onClick={() => handleClick(subMenu, true)}
          onKeyPress={() => handleClick(subMenu, true)}
          role='button'
          tabIndex='0'
        >
          {
            subMenu.shown && showMenu(subMenu.name) &&
            <div className={`fab fab-icon-holder ${subMenu.name}`}>
              { cartLoading && subMenu.name === 'add' ?
                <span className='cart-loader'><LuxeSpin /></span> :
                <i className={`icon-${subMenu.name} ${subMenu.class && subMenu.class} ${getNavigationPanelClass(subMenu)}`}>{getSubMenuIcon(subMenu)}</i>
              }
              {
                subMenu.name ==='bag' && totalItems > 0 && <span className="fav-badge" style={{backgroundColor: 'white', color: 'black'}}>{totalItems}</span>
              }
              {
                subMenu.name !== 'like' && subMenu.label && (<span className='fav-label'>{subMenu.label}</span>)
              }
              {
                subMenu.name === 'like' && <span className='fav-label'>{likes}</span>
              }
            </div>
          }
        </div>
        { subMenu.subMenus &&
          <ul className={`fab-options child-fab-options ${(subMenu.name === 'bag' && props.videoId === props.bagOpenFor) ? 'open' : ''}`} 
              id={`child-menu-${props.videoId}-${subMenu.name}`}>
            <SubIcons {...props} item={subMenu}/>
          </ul>
        }
      </div>
      )}
    </>
  )
}

const getNavigationPanelClass = (item) => {
  let dynamicClass = ''
  if (item.name === 'navigation') {
    props.left && (dynamicClass = dynamicClass + ' v-icon-navigation--left')
    props.right && (dynamicClass = dynamicClass + ' v-icon-navigation--right')
    props.top && (dynamicClass = dynamicClass + ' v-icon-navigation--top')
    props.bottom && (dynamicClass = dynamicClass + ' v-icon-navigation--bottom')
    props.center && (dynamicClass = dynamicClass + ' v-icon-navigation--center')
  }
  return dynamicClass
}

const getSubMenuIcon = (item) => {
  let iconLabel = item.active ? item.iconActive : item.icon
  if (item.name === 'tier') iconLabel = context.authenticated ? item.iconActive : item.icon
  else if (item.name === 'like' && likedVideo) iconLabel = item.iconActive
  return iconLabel
}

const RenderIcon = (props) =>{
  const {icon} = props;
  let dynamicClass = getNavigationPanelClass(icon);
  let iconLabel = getSubMenuIcon(icon)
  const totalItems = totalCartItems();
  const videoLike = props.video && props.video.like ? props.video.like : 0;
  const likes = likedVideo ? videoLike+1 : videoLike;

  return(
    <Fragment>
    <i className={`icon-${icon.name} ${icon.class && icon.class} ${dynamicClass}`}>{iconLabel}</i>
    {icon.name==='bag' && totalItems>0 && <span className="fav-badge" style={{backgroundColor: 'white', color: 'black'}}>{totalItems}</span>}
    {icon.name==='like' && <span className="fav-label">{likes}</span>}
    </Fragment>
  )
}


 return(
  <div className="right-bar-container" ref={sidebarContainer}>
   {
    values.menus.map((icon, key)=>{
     if (icon.shown) {

      if (icon.name === 'fullscreen' && (mobileModel === 'iPhone' || (!isIPad13 && isDesktop))) {
        return null;
      }

      if(context.authenticated && icon.name === 'tier') return null; 

      return(
       <div key={key} className={`fab-container ${icon.name}`}>
         <div className="clickable-area" onClick={()=>handleClick(icon, false)}>
          <div className={`fab fab-icon-holder ${icon.name} ${props.commentOpenFor === props.videoId ? 'active' : '' }`}>
            <RenderIcon {...props} icon={icon}/>
          </div>
        </div>
        <ul className={`fab-options ${(icon.name === 'bag' && props.videoId === props.bagOpenFor) ? 'open' : ''}`} 
            id={`child-menu-${props.videoId}-${icon.name}`}>
          <SubIcons {...props} item={icon}/>
        </ul>
       </div>
      )
     }
    })
   }
   {isShare && <ShareModal
      shareUrl={createUrl(metadata.slug)}
      title={metadata.title}
      shown={isShare}
      dismiss={() => setShare(false)}
    />}
  </div>
 )
}

export default VideoSideMenu;
