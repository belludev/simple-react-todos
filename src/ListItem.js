import React, { Component } from 'react';
import './ListItem.css';

class ListItem extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        if(this.props.done){
            return(
                <div className="item">
                    <div className="item-text done" onClick={this.props.markHandler}>
                        <del>{this.props.text}</del>
                    </div>
                    <div className="delete-button" onClick={this.props.deleteHandler}>Delete</div>
                </div>
            )
        }else{
            return(
                <div className="item">
                    <div className="item-text" onClick={this.props.markHandler}>
                        {this.props.text}
                    </div>
                    <div className="delete-button" onClick={this.props.deleteHandler}>Delete</div>
                </div>
            )
        }
    }
}

export default ListItem;