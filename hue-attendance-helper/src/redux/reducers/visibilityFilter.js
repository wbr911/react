/**
 * Created by bolan on 2018/1/16.
 */
import {VisibilityFilters , SET_VISIBILITY_FILTER} from './../actions/actions';
/**
 *
 * @param state
 * @param {VisibilityFilterAction} action
 * @return {VisibilityFilters|{VisiblilityFilters}}
 */
const visibilityFilter = (state=VisibilityFilters.SHOW_ALL , action) => {
  switch (action.type){
      case  SET_VISIBILITY_FILTER:
          state = action.filter;
      default:
          return state;
  }
};

export  default visibilityFilter;