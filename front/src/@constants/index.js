import ThreeDotIcon from './../../public/images/icon_3dot_light.svg';
import BellIcon from './../../public/images/icon_bell_light.svg';
import FullScreenIcon from './../../public/images/icon_fullscreen_light.svg';
import ActiveFullScreenIcon from './../../public/images/exit_icon_fullscreen_light.svg';
import NavigationIcon from './../../public/images/icon_navigation.svg';
import SearchIcon from './../../public/images/icon_search_light.svg';
import InboxIcon from './../../public/images/icon_inbox_light.svg';
import TierIcon from './../../public/images/icon_tier_light.svg';
import ActiveTierIcon from './../../public/images/icon_tier_signed_light.svg';
import CommentIcon from './../../public/images/icon_comment_light.svg';
import ShareIcon from './../../public/images/icon_share_light.svg';
import BagIcon from './../../public/images/icon_bag_light.svg';
import WishlistIcon from './../../public/images/icon_wishlist_light.svg';
import SubscribeIcon from './../../public/images/icon_subscribe_light.svg';
import AddIcon from './../../public/images/icon_add_light.svg';

import BasketIcon from './../../public/images/icon_circle_check_light.svg';
import HeartIcon from './../../public/images/heart.svg';
import ActiveHeartIcon from './../../public/images/icon_heart_full_light.svg';

export const defaultSideBarItems = [
  {
    name: 'dots',
    icon: <ThreeDotIcon/>,
    shown: false,
    active: false,
    subMenus: [],
  },
  {
    name: 'tier',
    icon: <TierIcon/>,
    iconActive: <ActiveTierIcon/>,
    shown: true,
    active: false,
  },
  {
    name: 'bell',
    icon: <BellIcon/>,
    shown: false,
    active: false,
  },
  {
    name: 'fullscreen',
    icon: <FullScreenIcon/>,
    iconActive: <ActiveFullScreenIcon/>,
    class: 'fullscreen-icon',
    shown: true,
    active: false,
  },
  {
    name: 'navigation',
    icon: <NavigationIcon/>,
    class: 'v-icon-navigation',
    shown: true,
    active: false,
    directions: ['top', 'right', 'bottom', 'left'],
  },
  {
    name: 'search',
    icon: <SearchIcon/>,
    shown: false,
    active: false,
  },
  {
    name: 'inbox',
    icon: <InboxIcon/>,
    shown: false,
    active: false,
  },
  {
    name: 'bag',
    icon: <BagIcon/>,
    shown: true,
    active: false,
    subMenus: [
      {
        name: 'wishList',
        icon: <WishlistIcon/>,
        label: 'WISHLIST',
        shown: false,
      },
      // {
      //   name: 'subscribe',
      //   icon: <SubscribeIcon/>,
      //   label: 'SUBSCRIBE',
      //   shown: false,
      // },
      {
        name: 'add',
        icon: <AddIcon/>,
        iconActive: <BasketIcon/>,
        label: 'ADD',
        shown: true,
      },
      {
        name: 'myBasket',
        icon: <BasketIcon/>,
        label: 'MY BASKET',
        shown: true,
      },
    ],
  },
  {
    name: 'share',
    icon: <ShareIcon/>,
    shown: true,
    active: false,
  },
  {
    name: 'comment',
    icon: <CommentIcon/>,
    shown: true,
    active: false,
  },
  {
    name: 'like',
    icon: <HeartIcon/>,
    iconActive: <ActiveHeartIcon/>,
    shown: true,
    active: false,
    label: 0,
  },
]



export const detailSideBarItems = [
  {
    name: 'fullscreen',
    icon: <FullScreenIcon/>,
    iconActive: <ActiveFullScreenIcon/>,
    class: 'fullscreen-icon',
    shown: true,
    active: false,
  },
  {
    name: 'navigation',
    icon: <NavigationIcon/>,
    class: 'v-icon-navigation',
    shown: true,
    active: false,
    directions: ['top', 'right', 'bottom', 'left'],
  },
  {
    name: 'tier',
    icon: <TierIcon/>,
    iconActive: <ActiveTierIcon/>,
    shown: true,
    active: false,
  },
  {
    name: 'bag',
    icon: <BagIcon/>,
    shown: true,
    active: false,
    subMenus: [
      {
        name: 'wishList',
        icon: <WishlistIcon/>,
        label: 'WISHLIST',
        shown: false,
      },
      {
        name: 'add',
        icon: <AddIcon/>,
        iconActive: <BasketIcon/>,
        label: 'ADD',
        shown: true,
      },
      {
        name: 'myBasket',
        icon: <BasketIcon/>,
        label: 'MY BASKET',
        shown: true,
      },
    ],
  }
]



export const productDetailSubMenus = [
  {
    slug: 'reviews',
    name: 'Reviews',
  },
  {
    slug: 'ingredients',
    name: 'Ingredients',
  },
  {
    slug: 'how-to-use',
    name: 'How To Use',
  },
  {
    slug: 'specifications',
    name: 'Product Specifications',
  },
]


export const settingMaps = [
  {
    id: '2',
    name: 'Privacy Settings',
  },
  {
    id: '3',
    name: 'Terms & Conditions',
  },
  {
    id: '4',
    name: 'Privacy Policy',
  },
  {
    id: '5',
    name: 'Copyright Policy',
  },
]
