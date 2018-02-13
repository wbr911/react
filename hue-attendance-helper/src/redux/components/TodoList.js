/**
 * Created by bolan on 2018/1/16.
 */

import React from 'react'
import PropsType from 'prop-types'
import Todo from './Todo'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        var self = this;
        const {todos} = this.props;
        return (<url>
            {(!todos || todos.length===0 )
                ? (<div>No Todo</div>)
                :todos.map(todo =>{
                return (
                    <Todo key={todo.id} {...todo} onClick={self.props.onTodoClick.bind(self , todo.id)}></Todo>
                );
            })}
        </url>);
    };
}

TodoList.propTypes = {
    onTodoClick:PropsType.func,
    todos:PropsType.arrayOf(
        PropsType.shape(Todo.propTypes)
    )
};

export default  TodoList;