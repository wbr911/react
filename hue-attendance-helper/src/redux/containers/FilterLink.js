import {connect} from 'react-redux'
import Link from './../components/Link';
import {setVisibilityFilter} from './../actions/actions';
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
    const {filter} = ownProps;
    const {visibilityFilter} = state;
    /**
     * @type {Link.propTypes}
     */
    var linkProps = {};
    linkProps.active = filter === visibilityFilter;
    return linkProps;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {filter} = ownProps;
    /**
     * @type {Link.propTypes}
     */
    var linkProps = {};
    linkProps.onClick = () => {
        dispatch(setVisibilityFilter(filter))
    } ;
    return linkProps;
};

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

FilterLink.propTypes = {
    filter:PropTypes.string.isRequired
};

export default FilterLink ;