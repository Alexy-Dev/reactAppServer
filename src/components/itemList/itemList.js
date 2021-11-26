import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import { Table } from 'reactstrap';


    function ItemList({getData, onItemSelected, renderItem}){

        const [itemList, updateList] = useState([]);

        useEffect(() => {
            getData()
            .then( (data) => {
                updateList(data)
                })
            }, [])
        
    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item.id;

            const label = renderItem(item.id);
            // console.log(item.name + '/' + item.email);

            return (
                <li 
                    key={id}
                    className="row"
                    onClick={ () => onItemSelected(id)}>                        
                    {label}
                </li>                
                
            )
            
        })
    }
   
    // console.log(onItemSelected);

    // render() {
        // const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }
        // const {data} = this.props;

        const items = renderItems(itemList);
        // console.log(items[10]);


        return (
        
         
            <Table className="table" striped bordered hover>
            <thead className="toptable">

                <tr>
                <th id="Id">id</th>
                <th id="first_name">First Name</th>
                <th id="last_name">Last Name</th>
                <th id="email">Email</th>
                <th id="gender">Gender</th>
                <th id="ip_address">Ip Address</th>
                
                </tr>
            </thead>
            <tbody>
                
                        <tr>
                            <td id="id">
                            {items}
                            </td>
                            {/* <td id="first_name">
                            {items}
                            </td>
                            <td id="last_name">
                            {items}
                            </td> */}
                        </tr>
            </tbody>
            </Table>

           
        );
    }
    // ItemList.defaultProps = {
    //     onItemSelected: () => {}
    // }
    console.log(ItemList);
    export default ItemList;