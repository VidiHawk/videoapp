import React, { useContext, useEffect, useState } from 'react'
import Login from './Auth/Login'
import Register from './Auth/Register'
import ForgotPassword from './Auth/ForgotPassword'
import AuthContext from './../helpers/authContext'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CREATE_SHOPIFY_CUSTOMER, CREATE_SHOPIFY_TOKEN } from '../graphql/mutations'
import { GET_CUSTOMER_DETAILS } from '../graphql/queries'
import ShopifyGraphClient from './../graphql/client'
import CartContainer from '../containers/Cart'
import { ResetPassword } from './Auth/ResetPassword'
import ConfirmPassword from './Auth/ConfirmPassword'

const shopifyClient = ShopifyGraphClient()


const Auth = React.memo(function Auth(props) {
	const context = useContext(AuthContext)
	const [page, setPage] = useState('login');
	const [shopifyEmail, setEmail] = useState('');
	const [shopifyPassword, setPassword] = useState('');
	const [createShopifyToken] = useMutation(CREATE_SHOPIFY_TOKEN, {
		client: shopifyClient,
})
const [createShopifyCustomer] = useMutation(CREATE_SHOPIFY_CUSTOMER, {
	client: shopifyClient,
})
const [customerDetails, { data: customerData }] = useLazyQuery(GET_CUSTOMER_DETAILS, {
	client: shopifyClient,
})


useEffect(()=>{
	if(customerData && customerData.customer){
		registerUser(customerData.customer);
	}
}, [customerData])

const preLoginActivity = (data, cb) =>{
	createShopifyTokenCall(data, (status)=>{
			cb(status); //IF TRUE THAT MEANS USER IS ALREADY REGISTERED ON SHOPIFY AND CREDENTIALS ARE CORRECT
	})
}

const postLoginActivity = (data) =>{
	createShopifyTokenCall(data, ()=>{
		context.setAuthenticated(true);
		context.showToastMessage({ message: 'Logged in successfully!', type: 'success' })
		context.closeLoginPopup();
		props.me();
	})
}

const registerShopifyUser = (data) =>{
	const { email, password} = data
	setEmail(email);
	setPassword(password);
	const customerAccessToken = localStorage.getItem('customerAccessToken');
	customerDetails({ variables: {customerAccessToken} });
}

const registerUser = (data) =>{
	const params = {
		email: shopifyEmail,
		password: shopifyPassword,
		firstName: data.firstName,
		lastName: data.lastName
	}
	props.register(params).then(response=>{
		if(response && response[0]){
				if(response[0].error) context.showToastMessage({ message: response[0].error.title, type: 'error' })
				else {
					postRegisterActivity(params);
					Util.setCookie('SSO_TOKEN', response[0].token);
				}
		}
		else context.showToastMessage({ message: 'Something went wrong!', type: 'error' })
})
}

const preRegisterActivity = (data, cb) =>{
	createShopifyCustomerCall(data, ()=>{
		cb()
	})
}

	const postRegisterActivity = (data) =>{
		createShopifyTokenCall(data, ()=>{
			context.setAuthenticated(true);
			context.showToastMessage({ message: 'Logged in successfully!', type: 'success' })
			context.closeLoginPopup();
		})
	}

	const createShopifyCustomerCall = (data, cb) =>{
		const { email, password} = data
		createShopifyCustomer({ variables: { input: { email, password } } }).then((shopifyRes) => {
		if (shopifyRes.data.customerCreate && shopifyRes.data.customerCreate.customer && shopifyRes.data.customerCreate.customer.id) 	cb();
		else if(shopifyRes.data?.customerCreate?.customerUserErrors[0]?.code === 'CUSTOMER_DISABLED'){
			context.showToastMessage({ message: shopifyRes.data?.customerCreate?.customerUserErrors[0]?.message, type: 'success' })
			setPage('login');
		}
		else if(shopifyRes.data?.errors){
			context.showToastMessage({ message: shopifyRes.data?.errors[0]?.message, type: 'success' })
			setPage('login');
		}
		else{
			context.showToastMessage({ message: shopifyRes.data?.customerCreate?.customerUserErrors[0]?.message, type: 'error' })
		}
	})
	}

	const createShopifyTokenCall = (data, cb)=>{
		const { email, password} = data
		createShopifyToken({ variables: { input: { email, password } } }).then((shopifyRes) => {
			if (shopifyRes.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
						localStorage.setItem('customerAccessToken', shopifyRes.data.customerAccessTokenCreate.customerAccessToken.accessToken
						)
						cb(true);
				}
				else if (shopifyRes.data?.customerAccessTokenCreate?.customerUserErrors[0]?.code === 'UNIDENTIFIED_CUSTOMER'){
					context.showToastMessage({ message: 'Invalid Credentials!', type: 'error' })
					cb(false);
				}
				else {
					context.showToastMessage({ message: shopifyRes.data.customerAccessTokenCreate.customerUserErrors[0].message, type: 'error' })
					cb(false);
				}
		})
	}

		if(page === 'login') return <Login {...props} setPage={setPage} postLoginActivity={postLoginActivity} preLoginActivity={preLoginActivity} registerShopifyUser={registerShopifyUser}/>
		else if(page === 'register') return <Register {...props} setPage={setPage} postRegisterActivity={postRegisterActivity} preRegisterActivity={preRegisterActivity}/>
		else if(page === 'forget') return <ForgotPassword {...props} setPage={setPage}/>
		else if (page === 'cart') return <CartContainer {...props} setPage={setPage} />
		else if(page === 'resetPassword') return <ResetPassword {...props} setPage={setPage}/>
		else if(page === 'confirmPassword') return <ConfirmPassword {...props} setPage={setPage}/>
		else return null;
})


export default Auth;
