import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import ProductDetail from "../components/ProductDetail"
import AuthContext from "../helpers/authContext";
import { loadFullDetail, loadReviews, loadProductMenus, loadProductEntities, loadDetail, flushProduct } from "../data/ducks/product/actions";

const DEFAULT_LIMIT = 2;

class ProductDetailContainer extends PureComponent {
	static contextType = AuthContext;
	static fetching( ssr ) {
		const slug = ssr.match.params.slug;
		return [
			ssr.dispatch(loadProductMenus(slug)),
			ssr.dispatch(loadReviews(slug)),
			ssr.dispatch(loadDetail(slug))
		];
	}

	constructor(props) {
		super(props);
		this.state = {
			loading:false
		}
	}

	componentDidMount() {
		this.loadDetails(this.props);
	}	

	componentWillReceiveProps(nextProps){
		if(this.props.match.params.slug !== nextProps.match.params.slug){
			this.loadDetails(nextProps);
		}
	}


	loadDetails(props){
		this.setState({loading: true}, ()=>{
			this.props.loadProductMenus(props.match.params.slug).then(res=>{
				const allMenus = res?.[0]?.list ? res[0].list : [];
				this.props.loadReviews(props.match.params.slug).then(res=>{
					this.props.loadDetail(props.match.params.slug).then(res=>{
						this.setState({loading: false})
						this.loadEntities(props, allMenus);
					})
				})
			})
		})
	}


	loadEntities(props, allMenus){
		if(allMenus?.length){
			const productSlug = props.match.params.slug;
			allMenus.forEach(entity=>{
				if(entity.slug !== 'reviews') props.loadProductEntities(productSlug, entity.slug);
			})
		}
	}

	changeSwipeCount(count){
		this.setState({swipeCount: count})
	}

	componentWillUnmount(){
		this.props.flushProduct();
	}


	render() {
		return (
			<Fragment>
					<ProductDetail {...this.props} loading={this.state.loading}/>
			</Fragment>
		)
	}
};

const mapStateToProps = (state) => ({
	common: state.common,
	product: state.product,
});

const mapDispatchToProps = {
	loadFullDetail, 
	loadReviews,
	loadProductMenus,
	loadProductEntities,
	loadDetail,
	flushProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailContainer);