import React, { Fragment } from 'react'
import { Col, Divider, Row } from 'antd'
import { StaticHeader } from './../Partials/Header'

export const StaticPageBG = () => {
  return (
    <Fragment>
      <div className="anime-loader">
        <div className="anime-bg" style={{ width: '100%', height: '1.5rem', marginTop: '5rem' }}></div>
      </div>
    </Fragment>
  )
}

export const OrderListBG = (props) => {
  return (
    <div>
      <div className="cart-container pt-2">
      <div className="anime-bg" style={{ width: '100%', height: '3rem', marginTop: '1rem' }}></div>
        <div style={{padding:'.5rem'}}>
          <div className="anime-loader">
            <div className="cart-items">
              <SingleOrderItem />
              <SingleOrderItem />
              <SingleOrderItem />
              <SingleOrderItem />
              <SingleOrderItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SingleOrderItem = () => {
  return (
    <div style={{marginTop:'1rem'}}>
      <Row className="single-item">
        <Col span="8" style={{ paddingRight: '1rem' }}>
          <div className="anime-bg" style={{ width: '100%', height: '5.5rem', borderRadius: 5 }}></div>
        </Col>
        <Col span="16">
          <div className="anime-bg" style={{ width: '10rem', height: '1.5rem' }}></div>
          <div className="anime-bg" style={{ width: '6rem', height: '1rem', marginTop: '.5rem' }}></div>
        </Col>
      </Row>
    </div>
  )
}

export const CartBG = (props) => {
  return (
    <div>
      <StaticHeader />
      <div className='cart-container'>
        <div className='my-cart'>
          <div className='anime-loader'>
            <div className='my-cart'>
              <div className='cart-items'>
                <SingleCartItem />
                <SingleCartItem />
                <SingleCartItem />
              </div>
              <Divider />
              <div className='anime-bg' style={{ width: '100%', height: '1.5rem', marginTop: '2rem' }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SingleCartItem = () => {
  return (
    <div>
      <Row className="single-item">
        <Col span="8" style={{ paddingRight: '1rem' }}>
          <div className="anime-bg" style={{ width: '100%', height: '10.5rem', borderRadius: 5 }}></div>
        </Col>
        <Col span="16">
          <div className="anime-bg" style={{ width: '10rem', height: '1.5rem' }}></div>
          <div className="anime-bg" style={{ width: '6rem', height: '1rem', marginTop: '.5rem' }}></div>
          <div
            className="anime-bg"
            style={{ width: '8rem', height: '2.2rem', marginTop: '2rem', borderRadius: 5 }}
          ></div>
        </Col>
      </Row>
    </div>
  )
}

export const VideoBG = () =>{
  return(
    <div className="swipe-layout">
      <div className="video-preact" style={{paddingTop: '4rem', width:'100vw', 'paddingLeft':'1rem'}}>
        <SinglVideoBG/>
      </div>
    </div>
  )
}

export const CategogryVideoBG = () =>{
  return(
    <div className="video-area video-preact" style={{paddingTop: '4rem', width:'100vw', 'paddingLeft':'1rem'}}>
      <SinglVideoBG/>
    </div>
  )
}

export const SinglVideoBG = () =>{
  return(
    <Row className="single-item">
      <Col span="20">
        <div className="anime-bg" style={{ width: '8rem', height: '1.2rem', marginTop: '1rem', borderRadius: 5 }}></div>
        <div className="anime-bg" style={{ width: '11rem', height: '1.2rem', marginTop: '1rem', borderRadius: 5 }}></div>
        <div className="anime-bg" style={{ width: '8rem', height: '1.2rem', marginTop: '1rem', borderRadius: 5 }}></div>
        <div className="anime-bg" style={{ width: '5rem', height: '1.2rem', marginTop: '1rem', borderRadius: 5 }}></div>
      </Col>
      <Col span="4">
        <div className="anime-bg" style={{ width: '3rem', height: '3rem', marginTop: '15rem', borderRadius: '50%' }}></div>
        <div className="anime-bg" style={{ width: '3rem', height: '3rem', marginTop: '2rem', borderRadius: '50%' }}></div>
        <div className="anime-bg" style={{ width: '3rem', height: '3rem', marginTop: '2rem', borderRadius: '50%' }}></div>
        <div className="anime-bg" style={{ width: '3rem', height: '3rem', marginTop: '2rem', borderRadius: '50%' }}></div>
      </Col>
    </Row>
  )
}


export const CommentBG = () =>{
  return(
    <div className="video-comment-wrapper">
      <div className="infinite-scroll-wrapper video-comment-list-preact">
        <SingleCommentBG/>
        <SingleCommentBG/>
        <SingleCommentBG/>
        <SingleCommentBG/>
      </div>
    </div>
  )
}

export const SingleCommentBG = () =>{
  return(
    <Row style={{ marginBottom: '3rem'}}>
      <Col span="4">
        <div className="anime-bg" style={{ width: '2rem', height: '2rem', marginTop: '1rem', borderRadius: '50%' }}></div>
      </Col>
      <Col span="20">
        <div className="anime-bg" style={{ width: '5rem', height: '1.2rem'}}></div>
        <div className="anime-bg" style={{ width: '10rem', height: '.6rem', marginTop: '.5rem'}}></div>
        <div className="anime-bg" style={{ width: '10rem', height: '.6rem', marginTop: '.5rem'}}></div>
      </Col>
    </Row>
  )
}

