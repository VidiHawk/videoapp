import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Inbox from "../components/Inbox"
import AuthContext from "../helpers/authContext";

const DEFAULT_LIMIT = 2;

class InboxContainer extends PureComponent {
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
				<div className="video-container">
					<Inbox {...this.props} loading={this.state.loading} limit={DEFAULT_LIMIT}/>
				</div>
			</Fragment>
		)
	}
};

const mapStateToProps = (state) => ({
	common: state.common,
});

const mapDispatchToProps = {
	
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxContainer);