import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import './style/index.scss';

class Animate extends Component {
    static defaultProps = {
        timeout: 300,
        in: true,
        classNames: 'fade',
        appear: true,
        enter: true,
        exit: true,
    }

    render() {
        const { children, ...other } = this.props;
        return (
            <CSSTransition {...other} >
                {children}
            </CSSTransition>
        );
    }
}

export default Animate;