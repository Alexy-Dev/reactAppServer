import React, { Component } from 'react';
import {Container} from 'reactstrap';
import Main from '../main/main';
import ErrorMessage from '../errorMessage';
// import Spinner from '../spinner';
import {UsersPage, UsersItem} from '../pages';
import appService from '../../services/appService';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import './app.css';

export default class App extends Component {

    appService = new appService();

    state = {
        showMain: true,
        error: false,
        selectedUser: 20        
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }
    
    render() {
        // const user = this.state.showMain ? <UsersPage/> : null;

        if (this.state.showMain.error) {
            return <ErrorMessage/>
        }
        
        return (
            <Router>
              <div className="app">
               
                <Container>
                    
                    <Route path='/' component={Main} exact/>
                        <Route path='/users' component={UsersPage} exact/>
                        <Route path='/users/:id' render={
                            ({match}) => {
                            const {id} = match.params;
                        return <UsersItem userId={id}/>}}/>
                        
                </Container>
                </div>
            </Router>
        )
    }
};

