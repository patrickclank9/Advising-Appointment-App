import React, { Component } from 'react';
import './App.css';
import {Route, Link} from 'react-router-dom';
import Table from './Table';
import Axios from './ConfigAxios';

const Home = () => (<h2>Home</h2>);
// const Advisors = () => (
//     <h2>Advisors</h2>
//     <Table titles={titles} attributes={attributes} />
// );

const titles = ['Dessert (100g serving)', 'Calories', 'Fat (g)', 'Carbs (g)', 'Protein (g)'];
const attributes = ['name', 'calories', 'fat', 'carbs', 'protein'];

class Advisors extends Component {
    render() {
        return (
            <div>
                <h2>Advisors</h2>
                <Table titles={titles} attributes={attributes} />
            </div>
        );
    }

}

class App extends Component {
    componentDidMount() {
        Axios.get('advisor').then(result =>
            console.log(result.data));
    }

    render() {
        return (
            <div className="App">
            <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/advisors">Advisors</Link></li>
            </ol>

            <Route exact path={"/"} component={Home}/>
            <Route path={"/advisors"} component={Advisors}/>
            </div>
    );
    }
}

export default App;
