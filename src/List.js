import React, { Component } from 'react';
import ListItem from './ListItem';
import uuidv4 from 'uuid/v4';
import './List.css';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchbar: "",
            todos: [
                {
                    id: uuidv4(),
                    text: 'Create todo list',
                    done: false
                },
                {
                    id: uuidv4(),
                    text: 'Extend todo list',
                    done: false
                },
                {
                    id: uuidv4(),
                    text: 'Design Todos',
                    done: false
                }
            ],
        }
        this.deleteHandler = this.deleteHandler.bind(this);
        this.createChangeHandler = this.createChangeHandler.bind(this);
        this.createTodo = this.createTodo.bind(this);
    }

    deleteHandler(id){
        let filterID = item => item.id !== id;
        let filteredList = this.state.todos.filter(filterID);
        this.setState({
            todos: [...filteredList]
        })
    }

    markHandler(id){
        // let filterID = item => item.id !== id;
        // let filterIDInvert = item => item.id === id;

        // let filteredList = this.state.todos.filter(filterID);
        // let item = this.state.todos.filter(filterIDInvert);

        // item[0].done = true;
        let list = [...this.state.todos];

        list.forEach(item => {
            if(item.id === id){
                if(item.done) item.done = false;
                else item.done = true;
            }
        })
        this.setState({
            todos: [...list]
        })
    }

    createChangeHandler(event){
        this.setState({searchbar: event.target.value})
    }

    createTodo(event){
        if (this.state.searchbar !== ""){
            let newTodos = [...this.state.todos];
            newTodos.push({
                id: uuidv4(),
                text: this.state.searchbar,
                done: false
            });
            this.setState({
                searchbar: '',
                todos: [...newTodos]
            })
        }
        event.preventDefault();
    }

    render(){
        return(
            <div className="list">
                <div className="head">
                    <input 
                        type="text" 
                        value={this.state.searchbar}
                        onChange={this.createChangeHandler}
                        placeholder="Todo"
                    />
                    <input type="submit" value="Create" onClick={this.createTodo}/>
                </div>
                
                {this.state.todos.filter(item => item.text.toLowerCase().includes(this.state.searchbar.toLowerCase())).map(item => {
                    return(
                        <ListItem
                            key={item.id}
                            text={item.text}
                            done={item.done}
                            deleteHandler={() => this.deleteHandler(item.id)}
                            markHandler={() => this.markHandler(item.id)}
                        />
                    )
                })}
            </div>
        )
    }
}

export default List;