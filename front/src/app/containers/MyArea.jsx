import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import MyArea from "../components/MyArea"
import AuthContext from "../helpers/authContext";
import { uploadPhoto } from "../data/ducks/common/actions";
import { editProfile, me, changePassword } from "../data/ducks/user/actions";
import { generateSignedUrl, checkAndGetReviewId } from "../data/ducks/review/actions";

const DEFAULT_LIMIT = 2;

class MyAreaContainer extends PureComponent {
	static contextType = AuthContext;
	//No SSR implementation for this Container

	constructor(props) {
		super(props);
		this.state = {
			loading:false
		}
	}

	componentDidMount() {}

	render() {
		return (
			<Fragment>
				<MyArea {...this.props} loading={this.state.loading}/>
			</Fragment>
		)
	}
};

const mapStateToProps = (state) => ({
	common: state.common,
	user: state.user,
	review: state.review
});

const mapDispatchToProps = {
	uploadPhoto,
	editProfile,
	me,
	changePassword,
	generateSignedUrl,
	checkAndGetReviewId
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAreaContainer);
