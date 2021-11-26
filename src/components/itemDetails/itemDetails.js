import React, {Component} from 'react';
import './itemDetails.css';


const Field = ({item, field, label}) => {
    return (
        <td>
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </td>
    )
}

export {
    Field
};

export default class ItemDetails extends Component {


    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({item})
                console.log(item);
            })
            
    }

    render() {

        if (!this.state.item) {
            return <span className='select-error'>Please select item in the list</span>
        }
        const {item} = this.state;
        const {name} = item;
        

        return (
            <div className="char-details rounded">
                {/* <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul> */}
                <h4>{name}</h4>
                <tr className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </tr>
            </div>
        );
    }
}