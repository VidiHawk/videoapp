import React from 'react';
import App from "../app/containers/App";
import { VideoList, Settings, Inbox, MyArea, MyReviews, Cart, Checkout, AddTextReview, AddVideoReview, ProductDetail } from "./splitComponent"

const routes = [{
	component: App,
	routes: [
		{
			path: ["/checkout"],
			component: Checkout,
			exact: true,
		},
		{
			path: ["/cart"],
			component: Cart,
			exact: true,
		},
		{
			path: ["/settings", "/settings/:subMenu"],
			component: Settings,
			exact: true,
		},
		{
			path: ["/inbox", "/inbox/:subMenu"],
			component: Inbox,
			exact: true,
		},
		{
			path: ["/product/:slug/:subMenu"],
			component: ProductDetail,
			exact: true,
		},
		{
			path: ["/my-area", "/my-area/:subMenu", '/edit-address/:id', '/add-address', '/add-billing-method', '/change-password', '/email-confirmation', '/my-area/order-details/:id', '/edit-billing-details'],
			component: MyArea,
			exact: true,
		},
		{
			path: ["/my-reviews/add-text-review/:slug"],
			component: AddTextReview,
			exact: true,
		},
		{
			path: ['/my-reviews/add-video-review/:slug'],
			component: AddVideoReview,
			exact: true
		},
		{
			path: ["/my-reviews", "/my-reviews/:subMenu", "/my-reviews/:subMenu/:slug"],
			component: MyReviews,
			exact: true,
		},
		{
			path: ["/",  "/:menu/:subMenu",  "/:menu/:subMenu/:videoSlug"],
			component: VideoList,
			contentType: 'video',
			exact: true,
		},
	]
}];

export default routes;
