/**
 * Created by bolan on 2018/1/17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import VisibleTodoList from './../containers/VisibileTodoList';
import Footer from './../components/Footer'
import AddTodo from './../containers/AddTodo'

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <AddTodo/>
                <VisibleTodoList/>
                <Footer/>
            </div>
        );
    }
}

export default App
