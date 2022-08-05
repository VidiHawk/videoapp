import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './../../helpers/authContext'
import { CartStaticHeader, StaticHeader } from '../Partials/Header'

export const NoLoginReview = (props) => {
  const context = useContext(AuthContext)
    return(
      <div className={props.className} id={props.id}>
        <div className="static-bg empty-page">
            <h2>Login required</h2>
            <div className="empty-page__text">
                <p>In this area, you'll be able to review products, earn rewards and share your reviews to the EMK community.</p>
                <p>But first you need to login:</p>
            </div>
            <button className="ant-btn primary-btn button-white" onClick={()=>context.openLoginPopup()} >
                <span>Login</span>
            </button>
        </div>
      </div>
    )
}



export const NoReview = (props) => {
    return(
      <div className={props.className} id={props.id}>
        <div className="static-bg empty-page">
            <h2>Start exploring now!</h2>
            <div className="empty-page__text">
                <p>You&apos;ll be able to post your own video reviews after you purchase a product</p>
            </div>
            <button className="ant-btn primary-btn button-white" onClick={() => props.history.push('/skincare/shop-all/')}>
                <span>Explore products</span>
            </button>
        </div>
      </div>
    )
}


export const NoProductsFound = (props) => {
  return (
    <div className={props.className} id={props.id}>
      <div className='static-bg empty-page'>
        <h2>You haven't bought any products yet</h2>
        <div className="empty-page__text">
        <p>Start exploring now!</p>
          <p>You'll be able to post your own video reviews after you purchase a product</p>
        </div>
        <button className="ant-btn primary-btn button-white" onClick={() => props.history.push('/skincare/shop-all/')} >
            <span>Explore products</span>
        </button>
    </div>
    </div>
  )
}


export const NoLogin = (props) => {
  const context = useContext(AuthContext)
  return(
    <div className="static-bg empty-page">
        <h2>Login required</h2>
        <div className="empty-page__text">
            <p>In this area, you'll be able to access and manage your account information.</p>
            <p>But first you need to login:</p>
        </div>
        <button className="ant-btn primary-btn button-white" onClick={()=>context.openLoginPopup()}>
            <span>Login</span>
        </button>
    </div>
  )
}


export const ComingSoon = (props) => {
    return(
        <div className="static-bg empty-page">
            <h2>Coming Soon</h2>
            <div className="empty-page__text">
                <p>We are in process of building something very special for you.</p>
            </div>
            <button className="ant-btn primary-btn button-white">
                <span>Discover</span>
            </button>
        </div>
    )
}


export const NoItems = (props) => {

    return (
      <div className="no-items static-bg">
        <CartStaticHeader {...props} />
        <div className="empty-page">
          <div className="no-items-title">Your shopping bag is empty</div>
          <div className="no-items-description">
            Check if there are any products on your favorites and snatch them up before they’re gone!
            <br />
            <br />
            You can also check out the best sellers!
          </div>
        </div>
        <div className="sticky-button">
          <button>
            <Link to={'/skincare/shop-all'}>View the best sellers</Link>
          </button>
        </div>
      </div>
    )
  }


export const NoPurchase = () => {
  return(
    <div className="static-bg empty-page">
        <h2>You haven't made any purchase yet</h2>
        <div className="empty-page__text">
          <p>Start exploring now!</p>
          <p>After you purchase products, you’ll be able to see your order history here.</p>
        </div>
        <button className="ant-btn primary-btn button-white">
            <span> <Link to={'/'}> Explore products</Link></span>
        </button>
    </div>
  )
}



export const NoLoginOrderHistory = () => {
  const context = useContext(AuthContext)
  return(
    <div className="static-bg empty-page">
        <h2>Login required</h2>
        <div className="empty-page__text">
          <p>You’ll be able to see your order history here.</p>
        </div>
        <button className="ant-btn primary-btn button-white" onClick={()=>context.openLoginPopup()}>
            <span>Login</span>
        </button>
    </div>
  )
}
