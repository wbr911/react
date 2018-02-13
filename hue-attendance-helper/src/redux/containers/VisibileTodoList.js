import {connect} from 'react-redux'
import TodoList from './../components/TodoList'
import Todo from './../components/Todo'
import {VisibilityFilters , toggleTodo} from './../actions/actions'
/**
 *
 * @param {Array<Todo.propTypes>} todos
 * @param filter
 * @return {*}
 */
function getVisibileTodos(todos , filter){
    switch(filter){
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
        case VisibilityFilters.SHOW_ALL:
        default:
            return todos;
    }
};
const mapStateToProps = (state, ownProps) => {
    /**
     * @type {TodoList.propTypes}
     */
    var todoListProps = {};
    todoListProps.todos = getVisibileTodos(state.todos , state.visibilityFilter);
    return todoListProps;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    /**
     * @type {TodoList.propTypes}
     */
    var todoListProps = {};
    todoListProps.onTodoClick = id => {
        dispatch(toggleTodo(id));
    };
    return todoListProps;
};

const VisibileTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibileTodoList ;

