import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
// import ItemList from '../itemList';
// import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
// import CharacterPage from '../characterPage';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// import styled from 'styled-components';
import './app.css';

export default class App extends Component {
// const App = () => {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        // selectedChar: 120,
        error: false
        
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }
    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });       
    }
    // onCharSelected = (id) => {
    //     this.setState({
    //         selectedChar: id
    //     })

    // }

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }
        
        return (
            <Router>
              <div className='app'>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row>
                    {/* <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList
                             onItemSelected={this.onItemSelected}
                             getData={this.gotService.getAllBooks}
                             renderItem={(item) => (<><span>{item.name}</span><button>Click me</button></>)/>  //возможность добавить верстку
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                             onItemSelected={this.onItemSelected}
                             getData={this.gotService.getAllHouses}
                             renderItem={(item) => {item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row> */}
                    <Route path='/' component={() => <h1>Welcome to GOT DB</h1>} exact/>
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact/>
                        <Route path='/books/:id' render={({match}) => {
                            const {id} = match.params;
                        return <BooksItem bookId={id}/>}}/>
                        <Route path='/houses' component={HousesPage} />
                </Container>
                </div>
            </Router>
        )
    }
};

