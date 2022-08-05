import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import AuthContext from '../helpers/authContext'
import Header from '../components/Partials/Header'
import Footer from '../components/Partials/Footer'
import Auth from './../components/Auth'
import ToastMessage from '../components/Common/ToastMessage'
import Metadata from '../helpers/metadata'
import { loadMenus } from '../data/ducks/common/actions'
import { login, me, register, resetPassword, verifyPassword } from '../data/ducks/user/actions'
import Loader from '../components/Common/Loader'
import NavigationPanel from './../components/Videos/NavigationPanel'
import isMobile from '../helpers/detectmobile'
import CartContainer from './Cart'
import { mobileModel } from 'react-device-detect'

const blacktheme = ['settings', 'my-reviews', 'my-area', 'inbox', 'cart'];
const blackSubtheme = ['reviews', 'product-specifications']
const hideNavigation = ['add-video-review', 'add-text-review'];
const whiteTheme = ['cart', 'checkout']

class App extends Component {
	static fetching(ssr) {
		return [
			ssr.dispatch(loadMenus()),
		];
	}

	constructor(props) {
		super(props);
		const pathname = props.location.pathname.split('/');
		this.state = {
			status: props.status,
			serverRequest: props.serverRequest,
			mobile: {
				isMobile: props.isMobile || isMobile.any()
			},
			theme: 'dark', //DO NOT CHANGE THIS TO "light" UNLESS MAIN BODY BACKGROUND CSS CHANGES ARE DONE
			subTheme: 'light',
			isLoginPopup: false,
			isCartPopup: false,
			toastMessage: '',
			toastMessageType: 'success',
			authenticated: false,
			isLoading: false,
			isVideoPermitted: false,
			globalSound: false,
			defaultVideoId: 0,
			navigationPanel: false,
			showSubTitles: false,
			captionStatus: false
		}
	}

	componentDidMount(){
		this.getUserDetails();
		this.checkForTheme(this.props);
		localStorage.getItem('theme') && this.setState({theme: localStorage.getItem('theme')});
		this.checkForNavigation(this.props);
	}

	componentWillReceiveProps(nextProps){
		this.checkforServerRequest();
		if(this.props.location.pathname !== nextProps.location.pathname){
			this.setState({ serverRequest: false })
			this.checkForTheme(nextProps);
			this.checkForNavigation(nextProps);
			this.checkAndManageUserAuthentication(()=>{});
		}
		localStorage.getItem('theme') && this.setState({theme: localStorage.getItem('theme')})
	}

	checkforServerRequest(){
		if(this.state.serverRequest && typeof window !== 'undefined')
			this.setState({serverRequest:false})
	}

	checkForTheme(props){
		const pathname = props.location.pathname.split('/');
		if(pathname && pathname[1]){
			if(blacktheme.indexOf(pathname[1]) > -1){
				this.setState({subTheme: 'light'});
			}
			else 	this.setState({subTheme: 'dark'});

      if(pathname[1] === 'product' && blackSubtheme.indexOf(pathname[3]) > -1) {
        this.setState({subTheme: 'light'});
      }
		}
	}

	checkForNavigation(props){
		const pathname = props.location.pathname.split('/');
		if(pathname && pathname[1]){
			if(hideNavigation.indexOf(pathname[1]) > -1 || (pathname[2] && hideNavigation.indexOf(pathname[2]) > -1)) this.setState({ isNavigationPanelOpen: false });
			else this.setState({ isNavigationPanelOpen: true });
		}
	}

	getUserDetails(){
		this.checkAndManageUserAuthentication((userToken)=>{
			if(userToken) this.props.me();
		});
	}

	checkAndManageUserAuthentication(cb){
		let userToken = Util.getCookie('SSO_TOKEN', true);
		userToken = userToken != "null" ? userToken : '';

		if(userToken) this.setState({authenticated: true});
		else this.setState({authenticated: false});
		cb(userToken);
	}

	changeTheme(theme){
		this.setState({theme}, () => localStorage.setItem('theme', this.state.theme));
	}

  // this will be used when we want to change sub theme based on video or text page
  changeSubTheme(theme) {
    this.setState({subTheme: theme});
  }

	changeServerStatus(){
		this.setState({serverRequest: false})
	}

	scrollInViewPort(e){
		//e.scrollIntoView();
	}

	openLoginPopup() {
		this.setState({ isLoginPopup: true })
		this.setState({ isCartPopup: false })
	}

	closeLoginPopup(){
		this.setState({isLoginPopup: false})
	}

	openCartPopup() {
		this.setState({ isCartPopup: true })
		this.setState({ isLoginPopup: false })
	}

	closeCartPopup() {
		this.setState({ isCartPopup: false })
	}

	setAuthenticated(status){
		this.setState({authenticated:status})
	}

	setIsVideoPermitted(status) {
		this.setState({ isVideoPermitted: status })
	}

	setGlobalSound(status) {
		this.setState({ globalSound: status })
	}

	setDefaultVideoId(videoId) {
		this.setState({ defaultVideoId: videoId })
	}

	showToastMessage({ message, type }){
		if (message) {
			this.setState({toastMessage: message})
			if (type) this.setState({toastMessageType: type})

				//AUTO-CLOSE TOAST MESSAGE
			setTimeout(() => {
					this.hideToastMessage();
			}, 3000)
		}
}

logout(){
	Util.setCookie('SSO_TOKEN', null)
	this.setState({authenticated:false})
}

hideToastMessage(){
	this.setState({toastMessage: ''})
	this.setState({toastMessageType: 'success'})
}

showSpinner(){
	this.setState({isLoading:true})
}

hideSpinner(){
	this.setState({isLoading:false})
}

toggleNavigationPanel(){
	this.setState({navigationPanel: !this.state.navigationPanel})
}

setShowSubTitle(value) {
  this.setState({showSubTitles: value})
}

hideSubTitleAsCommentOpened() {
  // save current value 
  this.setState({captionStatus: this.state.showSubTitles}, () => {
    this.setState({showSubTitles: false});
  });
}

resumeSubTitles() {
  // restore prev value
  this.setState({showSubTitles: this.state.captionStatus});
}

toggleShowSubTitle() {
  this.setState({showSubTitles: !this.state.showSubTitles})
}

	getSEOData(){
		return {};
	}

	render() {
		const Routes = this.props.route.routes;
		if(!this.props.sitemap){
			let header = <Header {...this.props} />
			let footer = <Footer {...this.props} />
	
					let dynamicClass = '';
					if (this.state.theme === 'light' && this.props.location && this.props.location.pathname) {
							const pathname = this.props.location.pathname.split('/');
	
							if (pathname && pathname[1]) {
									if (whiteTheme.indexOf(pathname[1]) > -1) {
											dynamicClass = 'white-theme';
									}
							}
	
					}
	
			return (
				<Fragment>
					<Metadata seo={this.getSEOData()}/>
					<AuthContext.Provider value={{
						isNavigationPanelOpen: this.state.isNavigationPanelOpen,
						authenticated: this.state.authenticated,
						scrollInViewPort: this.scrollInViewPort.bind(this),
						serverRequest: this.state.serverRequest,
						theme: this.state.theme,
						subTheme: this.state.subTheme,
            isLoginPopup: this.state.isLoginPopup,
						openLoginPopup: this.openLoginPopup.bind(this),
						closeLoginPopup: this.closeLoginPopup.bind(this),
						openCartPopup: this.openCartPopup.bind(this),
						closeCartPopup: this.closeCartPopup.bind(this),
						changeTheme: this.changeTheme.bind(this),
						showToastMessage: this.showToastMessage.bind(this),
						hideToastMessage: this.hideToastMessage.bind(this),
						logout: this.logout.bind(this),
						setAuthenticated: this.setAuthenticated.bind(this),
						showSpinner: this.showSpinner.bind(this),
						hideSpinner: this.hideSpinner.bind(this),
						isVideoPermitted: this.state.isVideoPermitted,
						isCartPopup: this.state.isCartPopup,
						setIsVideoPermitted: this.setIsVideoPermitted.bind(this),
						globalSound: this.state.globalSound,
						defaultVideoId: this.state.defaultVideoId,
						setDefaultVideoId: this.setDefaultVideoId.bind(this),
						setGlobalSound: this.setGlobalSound.bind(this),
						navigationPanel: this.state.navigationPanel,
						toggleNavigationPanel: this.toggleNavigationPanel.bind(this),
						showSubTitles: this.state.showSubTitles,
						toggleShowSubTitle: this.toggleShowSubTitle.bind(this),
						setShowSubTitle: this.setShowSubTitle.bind(this),
						hideSubTitleAsCommentOpened: this.hideSubTitleAsCommentOpened.bind(this),
						resumeSubTitles: this.resumeSubTitles.bind(this),
						changeSubTheme: this.changeSubTheme.bind(this)
					}}>
						<Fragment>
							<div className={`container ${this.state.theme}-theme video-theme-${this.state.subTheme} ${dynamicClass} ${mobileModel === 'iPhone' ? 'iPhone' : ''}`}>
								{header}
								{renderRoutes(Routes, {mobile: this.state.mobile, serverRequest: this.state.serverRequest, changeServerStatus: this.changeServerStatus.bind(this)})}
								{footer}
	
								{this.state.isLoginPopup && <div className='login-popup'><Auth {...this.props} /></div>}
								{this.state.isCartPopup && <div className='login-popup'><CartContainer {...this.props} /></div>}
	
								{this.state.toastMessage && (
										<ToastMessage
												message={this.state.toastMessage}
												type={this.state.toastMessageType}
										/>
								)}
								{this.state.isLoading && <Loader/>}
								<NavigationPanel {...this.props}/>
							</div>
						</Fragment>
					</AuthContext.Provider>
				</Fragment>
			)
		}
		else return renderRoutes(Routes, {})
	}
}

const mapStateToProps = (state) => ({
	common: state.common,
	user: state.user,
	product: state.product
});

const mapDispatchToProps = {
	loadMenus,
	login,
	register,
	me,
	resetPassword,
	verifyPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
