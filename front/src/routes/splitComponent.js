import React from 'react';
import loadable from '@loadable/component'
import Loader from "../app/components/Common/Loader";

export const VideoList = loadable(() => import( /* webpackChunkName: "VideoList" */ '../app/containers/VideoList'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const Settings = loadable(() => import( /* webpackChunkName: "Settings" */ '../app/containers/Settings'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const Inbox = loadable(() => import( /* webpackChunkName: "Inbox" */ '../app/containers/Inbox'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const MyArea = loadable(() => import( /* webpackChunkName: "MyArea" */ '../app/containers/MyArea'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const Cart = loadable(() => import( /* webpackChunkName: "Cart" */ '../app/containers/Cart'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const Checkout = loadable(() => import( /* webpackChunkName: "Checkout" */ '../app/containers/Checkout'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const MyReviews = loadable(() => import( /* webpackChunkName: "MyReviews" */ '../app/containers/MyReviews'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const AddTextReview = loadable(() => import( /* webpackChunkName: "MyReviewsText" */ '../app/components/MyReviews/AddTextReview'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const AddVideoReview = loadable(() => import( /* webpackChunkName: "MyReviewsVideo" */ '../app/components/MyReviews/AddVideoReview'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});

export const ProductDetail = loadable(() => import( /* webpackChunkName: "ProductDetail" */ '../app/containers/ProductDetail'), {
	fallback: <div className="lazy-loader"><Loader style={{padding: '15% 40%'}}/></div>
});