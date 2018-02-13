/**
 * Created by bolan on 2018/1/16.
 */
import React from 'react'
import PropsType from 'prop-types'

class Todo extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {onClick} = this.props;
        return(<li onClick={onClick} style={{textDecoration:this.props.completed? 'line-through' : 'none'}}>
            {this.props.text}
            </li>);
    }
}
/**
 *
 * @type {{id: *, onClick: *, completed: *, text: *}}
 */
Todo.propTypes = {
    id:PropsType.string.isRequired,
    completed:PropsType.bool,
    text:PropsType.string,
    onClick:PropsType.func
};

export default Todo;