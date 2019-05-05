import React, { Component } from 'react';
import './App.css';
import {Route, Link, Redirect} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from './Table';
import Axios from './ConfigAxios';
import Login from "./Login";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Status_Enum = {
    OPEN: 'open',
    BOOKED: 'booked',
    APPROVED: 'approved',
    LOCKED: 'locked',
    COMPLETED: 'completed',
    MISSED: 'missed',
};

class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home</h2>
                <Login/>
            </div>
        );
    }
}

class Advisor extends Component {

    constructor(){
        super();
        this.state = {
            rows:[],
			advisor_id: '',
        };
        this.refresh = this.refresh.bind(this);
    }

	refresh(){
		let id = this.props.location.pathname.slice();
		id = id[9] + id[10] + id[11] + id[12] + id[13] + id[14] + id[15] + id[16] + id[17];
		Axios.get('advisor/getSessions/' + id).then(result =>
			this.setState({rows:result.data}));
		return id;
	}

    componentDidMount() {
		let id = this.refresh();
		this.setState({
			advisor_id: id
		});
    }
    render() {
        const titles = ['advisor_id', 'date', 'start_time', 'duration', 'status', 'block_num', 'advisee_id'];
        const attributes = ['advisor_id', 'date', 'start_time', 'duration', 'status', 'block_num', 'advisee_id'];

        return (
            <div>
                <h2>Advisor</h2>
                <OpenAdvisingSessionEntry advisor_id={this.state.advisor_id} refresh={this.refresh}/>
                <br/>
				<Button variant="outlined" color="primary" onClick={this.refresh}>
					Refresh Table
				</Button>
				<h3>Advising Sessions</h3>
				<Table titles={titles} attributes={attributes} rows={this.state.rows}/>
            </div>

        );
    }
}

class OpenAdvisingSessionEntry extends Component{
	constructor(){
		super();
		this.state = {
			open: false,
			input_date: '',
			input_start_time: '',

		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
		this.clearInput();
	};

	addOpenAdvisingSession(date, start_time){
		Axios.post('/advisor/add_appt_entry',
			{
				advisor_id: this.props.advisor_id,
				date,
				start_time,
			})
			.then( function (response) { console.log(response); })
			.catch( function (error) { console.log(error); });
	}

	clearInput(){
		this.setState({
			input_date: '',
			input_start_time: '',
		});
	}

	handleChange = (name) => (event) => {
		this.setState({[name]: event.target.value});
	};

	handleSubmit = () => {
		if(!this.state.input_date) {
			console.error("Enter a date in the format YYYY-MM-DD");
			return;
		}
		if(!this.state.input_start_time) {
			console.error("Enter a time in the format HH:MM");
			return;
		}

		this.addOpenAdvisingSession(this.state.input_date, this.state.input_start_time);
		console.log(`
            Open Advising Session Created with...\n`,
			{Advisor_ID: this.props.advisor_id,
            Date: this.state.input_date,
            Start_Time: this.state.input_start_time}
        );
		this.clearInput();
		this.handleClose();
	};

	render() {
		return (
			<div>
				<Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
					Create Advising Session
				</Button>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Create Advising Session</DialogTitle>
					<DialogContent>
						<DialogContentText>
							This will create a new open advising session for students to book.
						</DialogContentText>
						<form noValidate autoComplete="off">
							<TextField
								required
								autoFocus
								id="standard-required"
								label="Date YYYY-MM-DD"
								value={this.state.input_date}
								onChange={this.handleChange('input_date')}
								margin="normal"
							/>
							<br/>
							<TextField
								required
								id="standard-required"
								label="Start Time HH:MM"
								value={this.state.input_start_time}
								onChange={this.handleChange('input_start_time')}
								margin="normal"
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button variant="contained" onClick={() => { this.handleSubmit();}}>Submit</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

class Advisee extends Component {
    constructor(){
        super();
        this.state = {rows:[]};
    }

    componentDidMount() {
        Axios.get('advisee/openSessions').then(result =>
            this.setState({rows:result.data}));
    }
    render() {

		const titles = ['advisor_id', 'date', 'start_time', 'duration', 'status', 'block_num', 'advisee_id'];
		const attributes = ['advisor_id', 'date', 'start_time', 'duration', 'status', 'block_num', 'advisee_id'];
        return (
            <div>
                <h2>Advisee</h2>
                <Table titles={titles} attributes={attributes} rows={this.state.rows}/>
            </div>
        );
    }
}

class App extends Component {

    render() {
        return (
            <div className="App">
			<Link to="/">Logout</Link>

                {/* Use Redirect instead of Route? */}
            <Route exact path={"/"} component={Home}/>
            <Route path={"/advisor"} component={Advisor}/>
            <Route path={"/advisee"} component={Advisee}/>
            </div>
    );
    }
}

export default App;
