import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Settings from "../components/Settings"
import AuthContext from "../helpers/authContext";

const DEFAULT_LIMIT = 2;

class SettingsContainer extends PureComponent {
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
					<Settings {...this.props} loading={this.state.loading} limit={DEFAULT_LIMIT}/>
			</Fragment>
		)
	}
};

const mapStateToProps = (state) => ({
	
});

const mapDispatchToProps = {
	
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
