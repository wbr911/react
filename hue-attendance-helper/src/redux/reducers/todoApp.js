/**
 * Created by bolan on 2018/1/16.
 */
import {combineReducers} from 'redux'
import  todos from './todos'
import visibilityFilter from './visibilityFilter'

const  todoApp = combineReducers({
    todos,
    visibilityFilter
});
export  default  todoApp;