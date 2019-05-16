import React, { Component } from 'react';
import './ListItem.css';

class ListItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let text;
        if(this.props.done){
            text = <del>{this.props.text}</del>
        }else{
            text = this.props.text;
        }

        return(
            <div className="item">
                <div className="item-text" onClick={this.props.markHandler}>
                    {text}
                </div>
                <div className="delete-button" onClick={this.props.deleteHandler}>Delete</div>
            </div>
        )
    }
}

export default ListItem;