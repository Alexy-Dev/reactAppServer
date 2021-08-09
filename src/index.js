import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// class Example extends Component {
//     render() {
//         return this.props.children     //можно передавать все что нам надо
//     }
// }

// ReactDOM.render(<Example>
//     <h1>Hello</h1>
// </Example>, document.getElementById('root'));
ReactDOM.render(<App/>, document.getElementById('root'));