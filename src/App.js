import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, withRouter, Route, Switch } from 'react-router-dom'
import MyLayout from './router/layout';
import Network from '../src/pages/network'
import DrawView from '../src/pages/drawView'
class App extends Component {
    render() {

        return (
            <Router>
                <Switch>
                    <DrawView/>
                </Switch>
            </Router>
        )
    }
}

export default App;