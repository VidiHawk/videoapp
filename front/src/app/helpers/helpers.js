import React, {Fragment} from 'react';
import Config from '../../config';


export function createUrl(url){
  return url ? url.indexOf('http') > -1 ? url : `${Config.BASE_URL}/${url}` : Config.BASE_URL;
}

export function createProductUrl(url){
  return url.indexOf('http') > -1 ? url : `${Config.BASE_URL}/product-view/${url}`;
}

export function parseQueryString(location, key=''){
    var params = {}, queries, temp, i, l;
	let queryString = location.split('?');
    if(queryString[1]){
        queries = queryString[1].split("&");
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0].toLowerCase()] = temp[1];
        }
        if(key !='') return params[key] ? params[key] : '';
        else return params
    }
    return '';
}

/**
 * Common function to be used to format price value
 * @param {*} price
 */

 export function formatPrice(price) {
    return price ? Number(price).toFixed(2) : 0;
}


/**
 * Function to add shopify pids in localstorage
 * @param {*} pid
 */
 export function storeShopifyPid(pid, variantId) {
    let pids = Util.getLocalstorage('emkProduct', true)
    pids = pids || []
    const alreadyAdded = pids.filter(fid=>fid.pid == pid);
    if(!(alreadyAdded && alreadyAdded[0])){
      if (pids.length >= 50) pids.shift()
      let products = new Set(pids)
      products.add({pid, variantId})
      Util.setLocalstorage('emkProduct', [...products], true)
    }
  }

  /**
 * Function to remove shopify pid from localstorage
 * @param {*} pid
 */
 export function removeShopifyPid(variantId) {
  let pids = Util.getLocalstorage('emkProduct', true)
  pids = pids || []
  let products = new Set(pids)
  products.forEach((point) => {
    if (point.variantId == variantId) {
      products.delete(point);
    }
  });
  Util.setLocalstorage('emkProduct', [...products], true)
}

/**
 * Function to clear cart from localstorage once redirected to emk shopify. DO NOT USE IT ONCE ADMIN FLOW IS DONE
 */
export function clearCart(){
  Util.removeLocalstorage('emkProduct');
  Util.removeLocalstorage('checkoutId');
}
    
  /**
   * Function to check shopify pid in localstorage
   * @param {*} pid
   */
  export function productInCart(pid) {
    let pids = typeof Util !== 'undefined' ? Util.getLocalstorage('emkProduct', true): []
    let products = new Set(pids)
    return products.has(pid)
  }
  
  /**
   * Function to be used to count all cart items
   */
  export function totalCartItems() {
    let pids = typeof Util !== 'undefined' ? Util.getLocalstorage('emkProduct', true): [];
    return pids && pids.length ? pids.length : 0
  }

  export function getFormattedDate(date) {
    let year = date.getFullYear()
    let month = (1 + date.getMonth()).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')
    return month + '/' + day + '/' + year
  }

  /**
   * Function to be used to get main category from URL, if nothing found in URL (eg - Homepage) then pick default category from Config
   * @param {*} path 
   * @returns 
   */
  export function getParentCategory(path){
    const allUrlParams = path.split('/');
		const mainMenu = allUrlParams && allUrlParams[1] ? allUrlParams[1] : Config.DEFAULT_PARENT_CATEGORY_SLUG;
    return mainMenu;
  }

  /**
   * Function to be used to get main category from URL, if nothing found in URL (eg - Homepage) then pick default category from Config
   * @param {*} path 
   * @returns s
   */
  export function getChildCategory(path){
    const pathname = path.split('/');
		const activeMenu = pathname && pathname[1] ? pathname[1] : Config.DEFAULT_PARENT_CATEGORY_SLUG;
		const activeSubMenu = pathname && pathname[2] 
      ? pathname[2] : activeMenu == Config.DEFAULT_PARENT_CATEGORY_SLUG 
      ? Config.DEFAULT_CATEGORY_SLUG : '';
    return activeSubMenu;
  }

  /**
   * Function to be used to get category slug from ID
   */
  export function getCategoryFromID(categories, categoryId){
    const menuArr = categories.filter(menus=>menus.id == categoryId);
    return menuArr && menuArr[0] ? menuArr[0] : {};
  }

  export function getChildCategoriesList(allMenus, parentCategorySlug){
    const findChildMenuArr = allMenus?.length ? allMenus.filter(menus=>menus.slug == parentCategorySlug): [];
    const allChildMenus = findChildMenuArr && findChildMenuArr[0] && findChildMenuArr[0].child && findChildMenuArr[0].child.list ? findChildMenuArr[0].child.list : [];
    return allChildMenus;
  }


  export function mergeTwoArrays(array1, array2){
    let arr = [...array1, ...array2];
    let known = {}
    if(arr.length){
      let filtered = arr.filter(item => !known.hasOwnProperty(item.id) && (known[item.id] = true))
      return filtered;
    }
    else return []
    
  }


  /**
   * Function to be used to get int product id from encrypted string of shopify
   * @param {*} string 
   */
  export function getProductIdFromShopifyString(str){
    if(!str) return null;
    const buff = new Buffer(str, 'base64');
    return buff.toString('ascii').replace ( /[^\d.]/g, '' );
  }

  /**
   * Function used to scroll to active top menu or submenu with smooth scroll for safari, IE
   */

export function smoothScrollToActiveTab(mainContainerClass, isSmooth, element = null) {

  var interval = null;

  var smoothScrollFeature = 'scrollBehavior' in document.documentElement.style;

  const topbar = document.querySelector(`.${mainContainerClass}`);
  let tabsContainer;

  if (mainContainerClass === 'top-bar-container') {
    tabsContainer = topbar.querySelector(".tabs-container");
  } else if (mainContainerClass === 'bottom-bar-container') {
    tabsContainer = topbar.querySelector(".subtabs-container");
  }


  let activeTab;
  
  if (element) {
    activeTab = element;
  } else {
    activeTab = tabsContainer.querySelector(".tab.tab-active");
  }

  if (!isSmooth) {
    activeTab.scrollIntoView({ inline: 'center' });
    return;
  }

  if (!smoothScrollFeature) {
    let to = activeTab.offsetLeft; // 378 , 238
    let i = parseInt(tabsContainer.clientWidth); // 360

    if (i !== to) {
      to = parseInt(to);

      let currentScroll = tabsContainer.scrollLeft;
      let scrollTo = tabsContainer.scrollLeft;
      if (scrollTo > (i / 2)) {
        scrollTo = scrollTo - parseInt(i / 2) + (activeTab.clientWidth / 2);
      } else {
        scrollTo = scrollTo + parseInt(i / 2) - (activeTab.clientWidth / 2);
      }

      if (i < to) {
        /// <
        scrollTo += to - parseInt(i / 2) - parseInt(activeTab.clientWidth / 2);
      } else {
        /// >=
        scrollTo = to - parseInt(i / 2) + parseInt(activeTab.clientWidth / 2);
      }

      if (scrollTo < currentScroll) {
        interval = setInterval(() => {

          const diff = currentScroll - scrollTo;
          if (diff < 20) currentScroll -= 1;
          else if (diff < 40) currentScroll -= 3;
          else if (diff < 80) currentScroll -= 8;
          else if (diff < 160) currentScroll -= 18;
          else if (diff < 200) currentScroll -= 24;
          else if (diff < 300) currentScroll -= 40;
          else currentScroll -= 60;

          tabsContainer.scrollLeft = currentScroll;

          if (scrollTo >= currentScroll) clearInterval(interval);
        }, 15);
      } else {
        interval = setInterval(() => {

          const diff = scrollTo - currentScroll;
          if (diff < 20) currentScroll += 1;
          else if (diff < 40) currentScroll += 3;
          else if (diff < 80) currentScroll += 8;
          else if (diff < 160) currentScroll += 18;
          else if (diff < 200) currentScroll += 24;
          else if (diff < 300) currentScroll += 40;
          else currentScroll += 60;

          tabsContainer.scrollLeft = currentScroll;

          if (scrollTo <= currentScroll) clearInterval(interval);
        }, 15);
      }
    }


  } else {
    activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }

  return interval;

}