/**
 * Created by bolan on 2018/1/17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import FilterLink from './../containers/FilterLink'
import {VisibilityFilters} from './../actions/actions'
class Footer extends React.Component {
    constructor(props){
        super(props);
    }
    underline2space(underlineStr){
        if(!underlineStr){
            return underlineStr;
        }
        return underlineStr.replace(/_/g , ' ');
    }
    render(){
        const {} = this.props;
        return (
            <p>Show &nbsp;
                <FilterLink filter={VisibilityFilters.SHOW_ALL}>{this.underline2space(VisibilityFilters.SHOW_ALL)}</FilterLink>{','}
                <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>{this.underline2space(VisibilityFilters.SHOW_ACTIVE)}</FilterLink>{','}
                <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>{this.underline2space(VisibilityFilters.SHOW_COMPLETED)}</FilterLink>
            </p>
        );
    }
}

Footer.propTypes = {

};

export default Footer
