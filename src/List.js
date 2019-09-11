import React, { Component } from 'react';
import ListItem from './ListItem';
import axios from 'axios';
import './List.css';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchbar: "",
            todos: [],
        }
        this.deleteHandler = this.deleteHandler.bind(this);
        this.createChangeHandler = this.createChangeHandler.bind(this);
        this.createTodo = this.createTodo.bind(this);
    }

    deleteHandler(id){
        axios.delete(`http://localhost:8080/api/todo/${id}`)
            .then((response) => {
                console.log(response)
                let filterID = item => item._id !== id;
                let filteredList = this.state.todos.filter(filterID);
                this.setState({
                    todos: [...filteredList]
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    markHandler(id){
        let list = [...this.state.todos];

        list.forEach(item => {
            if(item._id === id){
                if(item.done) item.done = false;
                else item.done = true;
                axios.put(`http://localhost:8080/api/todo/${id}`, { done: item.done })
                    .then((response) => {
                        this.setState({
                            todos: [...list]
                        })
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })        
    }

    createChangeHandler(event){
        this.setState({searchbar: event.target.value})
    }

    createTodo(event){
        if (this.state.searchbar !== ""){
            axios.post('http://localhost:8080/api/todo/', { data: this.state.searchbar })
                .then((response) => {
                    let newTodos = [...this.state.todos];
                    newTodos.push({
                        _id: response.data._id,
                        data: this.state.searchbar,
                        done: false
                    });
                    this.setState({
                        searchbar: '',
                        todos: [...newTodos]
                    })
                    console.log(response)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        event.preventDefault();
    }
    
    componentDidMount(){
        axios.get('http://localhost:8080/api/todo/')
            .then((response, reject) => {
                this.setState({
                    todos: [...response.data]
                })
            })
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
                    <input type="submit" value="+" onClick={this.createTodo}/>
                </div>
                
                {this.state.todos.filter(item => item.data.toLowerCase().includes(this.state.searchbar.toLowerCase())).map(item => {
                    return(
                        <ListItem
                            key={item._id}
                            text={item.data}
                            done={item.done}
                            deleteHandler={() => this.deleteHandler(item._id)}
                            markHandler={() => this.markHandler(item._id)}
                        />
                    )
                })}
            </div>
        )
    }
}

export default List;