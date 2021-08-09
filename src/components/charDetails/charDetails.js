import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}
export {
    Field
};
export default class CharDetails extends Component {

    gotService = new gotService();
    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {       //всегда делаем проверку на совпадение с предыдущими пропсами
            this.updateChar();
        }
    }

    onCharDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        // this.setState({
        //     loading: true
        // })

        this.gotService.getCharacter(charId)
            // .then((char) => {
            //     this.setState({char})
            // })
            // this.foo.bar = 0;
            .then( this.onCharDetailsLoaded)
            .catch( () => this.onError())

            
    }
    onError() {
        this.setState({
            char: null,
            error: true
        })
    }

    render() {

        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return <span className='select-error'>Please select a character</span>
        }
        const {char} = this.state;
        const {name, gender, born, died, culture} = char;
        
        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {/* <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li> */}

                    {/* {this.props.children} */}
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char})

                        })
                    }
                </ul>
            </div>
        );
    }
}