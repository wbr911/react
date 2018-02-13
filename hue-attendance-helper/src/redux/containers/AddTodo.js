import {connect} from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import {addTodo , Actions}from'./../actions/actions'

class AddTodo extends React.Component {
    constructor(props){
        super(props);
        this.input = null;
    }
    onSubmit(e){
        e.preventDefault();
        if(!this.input.value.trim()){
            return;
        }
        const {dispatch} = this.props;
        if(dispatch){
            dispatch( Actions.addTodoAction(this.input.value));
            this.input.value = '';
        }
    }
    render(){
        return (
          <div>
              <form onSubmit={this.onSubmit.bind(this)}>
                  <input ref={node => {this.input = node}}/>
                  <button type="submite">Add Todo</button>
              </form>
          </div>
        );
    }
}

AddTodo.propTypes = {
    dispatch:PropTypes.func
};

const AddTodoContainer = connect()(AddTodo);

export default AddTodoContainer ;