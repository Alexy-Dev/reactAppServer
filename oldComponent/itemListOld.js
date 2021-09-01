import React, {Component} from 'react';
import './itemList.css';
// import gotService from '../../services/gotService';
// import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

export default class ItemList extends Component {

    // gotService = new gotService();  //вызываем на уровень выше

    state = {
        // charList: null,
        itemList: null
        // error: false
    }

    componentDidMount() {
        const {getData} = this.props;  //в props мы можем подставлять функции и на основании той информации, которую она отдает компоненту подставлять функционал


        // this.gotService.getAllCharacters() //переходим на уровень выше
        getData()
            .then( (itemList) => {
                this.setState({
                    // charList,
                    itemList
                    // error: false
                })
            })
            // .catch(() => {this.onError()});
    }

    // componentDidCatch(){
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // }

    // onError(status){
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                key={id}
                className="list-group-item"
                onClick={ () => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList} = this.state;

        // if (error) {
        //     return <ErrorMessage/>
        // }
        

        if (!itemList) {
            return <Spinner/>
        }
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
              
                {/* <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li> */}
            </ul>
        );
    }
}