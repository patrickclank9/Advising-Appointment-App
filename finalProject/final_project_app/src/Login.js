import React from 'react';
import PropTypes from 'prop-types';
import {Route, Link, Redirect} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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


const User_Type_Enum = { ADVISOR: 'advisor', ADVISEE: 'advisee', NOTHING: '' };
class Login extends React.Component {
	constructor(){
		super();
		this.state = {
			loginID: '',
			userType: User_Type_Enum.NOTHING,
			redirect: false,
			type: {},
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {
		Axios.get(`/login/`).then(result =>{
			this.setState({type: result.data});
		});
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value,
			redirect: false
		});
	};

	handleLogin = () => {
		let isAdvisor = false;
		let isAdvisee = false;
		this.state.type.forEach((value)=> {
			if(value.user_id === this.state.loginID)
				switch (value.advisor.data[0]) {
					case 1:
						isAdvisor = true;
						break;
					case 0:
						isAdvisee = true;
						break;
				}
		});
		let usertype = User_Type_Enum.NOTHING;
		if(isAdvisor)
			usertype = User_Type_Enum.ADVISOR;
		else if(isAdvisee)
			usertype = User_Type_Enum.ADVISEE;


		this.setState({
			redirect: true,
			userType: usertype,
		})
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			let link = '/';
			if(this.state.userType === User_Type_Enum.ADVISOR){
				link += 'advisor'
			} else if(this.state.userType === User_Type_Enum.ADVISEE){
				link += 'advisee'
			} else {
				alert('Not a valid ID!');
				return;
			}
			link += `/${this.state.loginID}`;
			return <Redirect to={link} />
		}
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
				{this.renderRedirect()}
				<Button variant="contained" className={classes.button} onClick={this.handleLogin}>Login</Button>
			</form>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
