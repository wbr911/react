/**
 * Created by bolan on 2018/1/15.
 */

import { createActions } from 'redux-actions';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

let nextTodoId = 0;

/**
 *
 * @enum {VisibilityFilters}
 */
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export function  addTodo(text){
    return {type:ADD_TODO , id:''+(nextTodoId++) , text};
}

export function toggleTodo(id){
    return {type:TOGGLE_TODO , id};
}

/**
 * @typedef {{type:string , filter:VisibilityFilters}}
 * VisibilityFilterAction
 */
;

export function setVisibilityFilter(filter){
    return {type:SET_VISIBILITY_FILTER , filter}
};


export const Actions = createActions({
   addTodoAction : text =>  ({text})
});