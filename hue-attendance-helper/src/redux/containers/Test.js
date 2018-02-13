/**
 * Created by bolan on 2018/1/18.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Test extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {} = this.props;
        return(
            <div onClick={()=>{this.props.dispatch({type:'test' , value:1})}}></div>
        )
    }
}

Test.propTypes = {}


export default Test