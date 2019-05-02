import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Axios from "./ConfigAxios";

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

class Login extends React.Component {
	constructor(){
		super();
		this.state = {
			loginID: '',
			type: {},
		};
	}

	componentDidMount() {
		Axios.get(`/login/`).then(result =>{
			this.setState({type: result.data});
		});
	}

	handleChange = name => event => {
		this.setState({ [name]: event.target.loginID });
	};

	render() {
		const { classes } = this.props;


		return (
			<form className={classes.container} noValidate autoComplete="off">
				<TextField
					required
					id="standard-required"
					label="Login ID"
					value={this.state.loginID}
					onChange={this.handleChange('loginID')}
					className={classes.textField}
					margin="normal"
				/>
				<Button variant="contained" className={classes.button}>Login</Button>
			</form>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
