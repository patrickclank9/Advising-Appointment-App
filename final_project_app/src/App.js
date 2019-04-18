import React, { Component } from 'react';
import './App.css';
import {Route, Link} from 'react-router-dom';
import Table from './Table';
import Axios from './ConfigAxios';

const Home = () => (<h2>Home</h2>);

class Advisors extends Component {
    constructor(){
        super();
        this.state = {rows:[]};
    }
    componentDidMount() {
        Axios.get('advisor').then(result =>
            this.setState({rows:result.data}));
    }
    render() {
        const titles = ['acad_plan', 'advisor_fName', 'advisor_id', 'advisor_lName', 'student_id', 'term'];
        const attributes = ['acad_plan', 'advisor_fName', 'advisor_id', 'advisor_lName', 'student_id', 'term'];
        return (
            <div>
                <h2>Advisors</h2>
                <Table titles={titles} attributes={attributes} rows={this.state.rows}/>
            </div>
        );
    }
}

class Advisees extends Component {
    constructor(){
        super();
        this.state = {rows:[]};
    }
    componentDidMount() {
        Axios.get('advisee').then(result =>
            this.setState({rows:result.data}));
    }
    render() {
        const titles = ['student_id', 'student_fName', 'student_mName', 'student_lName'];
        const attributes = ['student_id', 'student_fName', 'student_mName', 'student_lName'];
        return (
            <div>
                <h2>Advisees</h2>
                <Table titles={titles} attributes={attributes} rows={this.state.rows}/>
            </div>
        );
    }
}

class App extends Component {

    render() {
        return (
            <div className="App">
            <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/advisors">Advisors</Link></li>
                <li><Link to="/advisees">Advisees</Link></li>
            </ol>

            <Route exact path={"/"} component={Home}/>
            <Route path={"/advisors"} component={Advisors}/>
            <Route path={"/advisees"} component={Advisees}/>
            </div>
    );
    }
}

export default App;
