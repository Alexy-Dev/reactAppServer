// import React, {Component} from 'react';
import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';

// class ItemList extends Component {
    function ItemList({getData, onItemSelected, renderItem}){

        const [itemList, updateList] = useState([]);

    // state = {
    //     itemList: null
    // }
        useEffect(() => {
            getData()
            .then( (data) => {
                updateList(data)
                })
            }, [])
        
    // componentDidMount() {
    //     // const {getData} = this.props;

    //     getData()
    //         .then( (itemList) => {
    //             this.setState({
    //                 itemList
    //             })
    //         })
    // }

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;

            // const label = this.props.renderItem(item);
            const label = renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    // onClick={ () => this.props.onItemSelected(id)}>
                    onClick={ () => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    // render() {
        // const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }
        // const {data} = this.props;

        const items = renderItems(itemList);


        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
    export default ItemList;
// }

// ItemList.defaultProps = {
//     onItemSelected: () => {}
// }

// const withData = (View) => {
//     return class extends Component {
//         state = {
//             data: null
//         }
//         componentDidMount() {
//             const {getData} = this.props;
    
//             getData()
//                 .then( (data) => {
//                     this.setState({
//                         data
//                     })
//                 })
//         }
//         render() {
//             const {data} = this.state;

//         if (!data) {
//             return <Spinner/>
//         }

//             return <View {...this.props} data={data} />
//         }
//     }
// }
// export default withData(ItemList);