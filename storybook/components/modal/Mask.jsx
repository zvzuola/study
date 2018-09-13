import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import './style/index.scss';

class Mask extends Component {
    static defaultProps = {
        timeout: 300,
        backgroundColor: 'rgba(0,0,0,0.75)',
        show: false,
        classNames: {
            appear: 'modalAppear',
            appearActive: 'modalAppearActive',
            enter: 'modalEnter',
            enterActive: 'modalEnterActive',
            exit: 'modalExit',
            exitActive: 'modalExitActive',
        }
    }

    render() {
        const { backgroundColor, timeout, show, classNames, ...others } = this.props;
        const style = {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor,
            zIndex: 899
        };

        return (
            <CSSTransition
                appear
                enter
                exit
                timeout={timeout}
                classNames={classNames}
                in={show}
                unmountOnExit
            >
                <div style={style} {...others}></div>
            </CSSTransition>
        );
    }
}

export default Mask;