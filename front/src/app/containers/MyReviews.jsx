import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import MyReviews from "../components/MyReviews"
import AuthContext from "../helpers/authContext";
import { loadDetail } from "./../data/ducks/product/actions";
import { getPendingList, getReviewedList, postReview, deleteReview, generateSignedUrl } from "./../data/ducks/review/actions";


const DEFAULT_LIMIT = 2;

class MyReviewsContainer extends PureComponent {
	static contextType = AuthContext;
	//No SSR implementation for this Container

	constructor(props) {
		super(props);
		this.state = {
			loading:false
		}
	}

	componentDidMount() {
		const productSlug = this.props.match.params.slug;
		if(productSlug){
			this.props.loadDetail(productSlug);
		}
	}

	render() {
		return (
			<Fragment>
				<div className="myreview-container full-height overflow-y-hidden">
					<MyReviews {...this.props} loading={this.state.loading}/>
				</div>
			</Fragment>
		)
	}
};

const mapStateToProps = (state) => ({
	common: state.common,
	product: state.product,
	review: state.review,
});

const mapDispatchToProps = {
	loadDetail,
	getPendingList, 
	getReviewedList, 
	postReview, 
	deleteReview,
	generateSignedUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReviewsContainer);