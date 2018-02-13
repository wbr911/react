/**
 * Created by bolan on 2018/1/17.
 */
import React from 'react'
import PropsType from 'prop-types'

class Link extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const {
            active,
            children,
            onClick
        } = this.props;
        if (active) {
            return (<span>{children}</span>);
        }
        return (
            <a href='' onClick={ e=> {
                e.preventDefault();
                onClick();
            }}>
                {children}
            </a>);
    }
}
;

Link.propTypes = {
    active: PropsType.bool.isRequired,
    children: PropsType.node.isRequired,
    onClick: PropsType.func.isRequired
};
export  default Link;