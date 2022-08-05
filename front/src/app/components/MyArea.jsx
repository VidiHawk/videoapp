import React, { PureComponent, Fragment, Component, useEffect, useState, useContext } from 'react';
import Loader from "./Common/Loader"
import ErrorBoundary from "./../helpers/ErrorBoundry";
import Dashboard from './MyArea/Dashboard';
import PointTransactions from './MyArea/PointTransactions';
import ProgramTiers from './MyArea/ProgramTiers';
import OrderHistory from './MyArea/OrderHistory';
import Wishlist from './MyArea/Wishlist';
import PersonalDetails from './MyArea/PersonalDetails';
import DeliveryAddress from './MyArea/DeliveryAddress';
import BillingDetails from './MyArea/BillingDetails';
import BillingMethods from './MyArea/BillingMethods';
import Subscriptions from './MyArea/Subscriptions';
import OrderDetails from './MyArea/OrderDetails';
import { getParentCategory } from './../helpers/helpers'

const MyArea = React.memo(function MyArea(props) {
const [extraClass, setExtraClass] = useState('');
const [footerClass, setFooterClass] = useState('');
const [customClass, setCustomClass] = useState('');
const [bgClass, setBgClass] = useState('');
const [activeId, setActiveId] = useState('');

const extraClassArr = ['point-transactions', 'program-terms', 'order-history'];
const footerClassArr = ['point-transactions', 'order-history'];
const customClassArr = ['point-transactions', 'program-terms', 'order-history', 'address-details', 'billing-details', 'billing-methods', 'billing-details-edit', 'personal-details'];
const bgClassArr = ['order-history','billing-details-edit'];
const downBgClassArr = ['address-details', 'change-password', 'add-billing-method', 'add-address']


useEffect(() => {
	initiateObserver();
}, [])

useEffect(() => {
	const subMenu = props.match.params && props.match.params.subMenu ? props.match.params.subMenu : '';
	setActiveId(subMenu);
}, [props.match.params])

useEffect(()=>{
	if(activeId && activeId != 'edit-address'){
		const submenuToScroll = document.getElementById(activeId)
		if (submenuToScroll) {
			setTimeout(() => {
			submenuToScroll.scrollIntoView()
		}, 100)
		}
		props.history.push(`/my-area/${activeId}`);
	}
}, [activeId])

const initiateObserver = () => {
	const children = document.querySelectorAll(".video-area");
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.intersectionRatio > 0.85) {
				setTimeout(() => {
				const allParams = entry.target.id;
					allParams && setActiveId(allParams);
				}, 100)
			}
		});
	}, {
		rootMargin: '0px',
		threshold: [0.25, 0.85]
	});
	children.forEach( child => {
		observer.observe(child);
	});
}

useEffect(()=>{
	const pathname = props.location.pathname.split('/');
	if(pathname && pathname[2]){
		setActiveId(pathname[2])
		if(bgClassArr.indexOf(pathname[2]) > -1 ) setBgClass('static-bg-blank')
		else if (downBgClassArr.indexOf(pathname[2]) > -1 ) setBgClass('static-bg-down')
		else setBgClass('static-bg')

		if(extraClassArr.indexOf(pathname[2]) > -1 ) setExtraClass('myarea-bg-padding')
		else setExtraClass('')

		if(footerClassArr.indexOf(pathname[2]) > -1 ) setFooterClass('footer-gradient')
		else setFooterClass('')

		if(customClassArr.indexOf(pathname[2]) > -1 ) setCustomClass('myarea-bg-blank')
		else setCustomClass('')
	}
}, [props.location.pathname])

/**
	* THIS FUNCTION IS NOT USED, BUT DO NOT DELETE IT
	* @param {*} param0 
	* @returns 
	*/
const RenderBlock = ({path}) =>{
	if(path){

		switch (path) {

			case 'dashboard':
				return <Dashboard {...props}/>

			case 'point-transactions':
				return <PointTransactions {...props}/>

			case 'program-terms':
				return <ProgramTiers {...props}/>

			case 'order-history':
				return <OrderHistory {...props}/>

			case 'wish-list':
				return <Wishlist {...props}/>

			case 'personal-details':
				return <PersonalDetails {...props}/>

			case 'edit-profile':
				return <PersonalDetails {...props}/>

			case 'change-password':
				return <PersonalDetails {...props}/>

			case 'address-details':
				return <DeliveryAddress {...props}/>

			case 'add-address':
				return <DeliveryAddress {...props}/>

			case 'edit-address':
				return <DeliveryAddress {...props}/>

			case 'billing-details':
				return <BillingDetails {...props}/>

			case 'billing-details-edit':
				return <BillingDetails {...props}/>

			case 'billing-methods':
				return <BillingMethods {...props}/>

			case 'add-billing-method':
				return <BillingMethods {...props}/>

			case 'subscriptions':
				return <Subscriptions {...props}/>

			default:
				return null;
		}
	}
	else return null;
}

	return (
		<div	className={`video-container myarea-container ${bgClass} ${extraClass} ${footerClass} ${customClass}`}>

			<div className="list-view" data-id="order-history" id={`list-order-history`}>
				<div className={`swipe-layout`}>
					<div className="video-area" id="order-history">
						<OrderHistory {...props}/>
					</div>
				</div>
			</div>

			<div className="list-view" data-id="personal-details" id={`list-personal-details`}>
				<div className={`swipe-layout`}>
					<div className="video-area" id="personal-details">
					<PersonalDetails {...props}/>
					</div>
				</div>
			</div>

			<div className="list-view" data-id="address-details" id={`list-address-details`}>
				<div className={`swipe-layout`}>
					<div className="video-area" id="address-details">
					<DeliveryAddress {...props}/>
					</div>
				</div>
			</div>

		</div>
	)
})


export default MyArea;
