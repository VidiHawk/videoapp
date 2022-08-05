import React, { useContext, useEffect, useState } from 'react'
import { Rate } from 'antd'
import StarIcon from './../../../../public/images/star.svg'
import DropDown from './../../../../public/images/dropdown.svg'
import DropDownBlack from './../../../../public/images/dropdown_black.svg'
import { SidebarReview } from '../MyReviews/MyPostedReviews'
import { formatPrice, getFormattedDate } from '../../helpers/helpers'
import { Button } from './../Elements'
import AuthContext from './../../helpers/authContext'
import { useHistory } from 'react-router-dom'

const ProductInfo = (props) => {
  const context = useContext(AuthContext)
  const { product, isVideo, type, review, isProductDetailView } = props
  const history = useHistory()
  const [isCollapsed, setisCollapsed] = useState(!props.toggleView)
  const [isProductView, setIsProductView] = useState(false)
  const theme = context.theme;

  useEffect(()=>{
    setisCollapsed(!props.toggleView)
  }, [props.toggleView])


  const handleChange = () => {}

  const onClickMore = () => {
    history.push(`/product/${product.slug}/ingredients`)
  }

  const onClickReview = () =>{
    props.setshowProductReviewPopup(true)
    props.setReviewProduct(product)
  }

  const classisCollapsed = isCollapsed ? 'luxe-content--collapse' : ''
  const containerCollapes = isCollapsed ? 'isCollapsed' : ''

  if(product && product.id){
  return(
   <div className={`luxe-pd ${containerCollapes} ${isVideo ? 'cstm-light-theme' : ''}`}>
   <div
     className={`luxe-pd__title`}
     onClick={() => setisCollapsed(!isCollapsed)}
     onKeyPress={() => setisCollapsed(!isCollapsed)}
     role="button"
     tabIndex="0"
   >
     {product.name}
     {theme === 'dark' || isVideo ? (
       <DropDown className={isCollapsed ? 'luxe-icon--rotate' : 'luxe-icon'} />
     ) : (
       <DropDownBlack className={isCollapsed ? 'luxe-icon--rotate' : 'luxe-icon'} />
     )}
   </div>
   <div className={`luxe-content ${classisCollapsed}`}>
     { type !== 'reviewed' ?
     <div>
     <h2 className={`luxe-pd__subtitle`}>{product.description}</h2>
     {!isProductDetailView && <span className={`luxe-pd__rate`}>
       <Rate onChange={handleChange} value={0} character={<StarIcon />} />
         {product.totalReviewCount ? <span className='ant-rate-text'>({product.totalReviewCount})</span> : ''}
     </span>}
     {product.size && <div className={`luxe-pd__weight`}>{product.size}</div>}
     {product.detail && (
       <div className={`luxe-pd__subtitle`} dangerouslySetInnerHTML={{ __html: product.detail }}/>
     )}
     <div className={`luxe-pd__price`}>${formatPrice(product.price/100)}</div>
     </div> : <div className={`luxe-content luxe-product-review__move-to-bottom${!review.attachments ? ' review-light-theme' : ''}`}>
        <h2 className={`luxe-product-review__username`}>
          { review.user && <span>{`${review.user.firstName} ${review.user.lastName}`}</span> }
          <span className={`luxe-product-review__rate`}>
            <Rate value={review.star} character={<StarIcon />} />
          </span>
        </h2>

        <div className="luxe-product-review__date">{getFormattedDate(new Date(review.createTime))}</div>
        <div className="luxe-product-review__text">{review.text}</div>
      </div> }
     {!!product.more && !type && !isProductView && (
       <Button btnClassname={`luxe-pd__more`} onClick={onClickMore}>
         More
       </Button>
     )}
     { type === 'pending' && (
       //appears on MyReviews page
       <Button btnClassname={`luxe-pd__more`} onClick={onClickReview}>
         Add a review
       </Button>
     )}
     { type === 'reviewed' && (
       //appears on MyReviews page
       <SidebarReview {...props} reviewId={review?.id} />
     )}
   </div>
 </div>
  )
 }
 else return null;
}

export default ProductInfo;
