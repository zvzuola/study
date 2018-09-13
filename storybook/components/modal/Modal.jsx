import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import ReactDOM from 'react-dom';
import Mask from './Mask';
import './style/index.scss';

/**
 * Modal弹框层
 *
 * show: 是否显示弹框
 * classNames: 动画名称
 * showMask: 是否显示遮罩
 * maskBackgroundColor: 遮罩背景色
 * maskClick: 点击遮罩事件
 * className: 弹框class
 * alignItems: 弹框垂直位置
 *
 * @class Modal
 * @extends {Component}
 */
class Modal extends Component {
    static propTypes = {
        show: PropTypes.bool,
        classNames: PropTypes.object,
        showMask: PropTypes.bool,
        maskBackgroundColor: PropTypes.string,
        maskClick: PropTypes.func,
        className: PropTypes.string,
        alignItems: PropTypes.string,
    }

    static defaultProps = {
        show: false,
        classNames: {
            appear: 'modalAppear',
            appearActive: 'modalAppearActive',
            enter: 'modalEnter',
            enterActive: 'modalEnterActive',
            exit: 'modalExit',
            exitActive: 'modalExitActive',
        },
        timeout: 200,
        showMask: true,
        maskBackgroundColor: 'rgba(0,0,0,0.75)',
    }

    onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            this.props.maskClick()
        }
    }

    render() {
        const { children, show, classNames, timeout, showMask, maskBackgroundColor, maskClick, className, alignItems } = this.props;
        const style = {
            position: 'fixed',
            top: 0,
            left: show ? 0 : '-10000px',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: alignItems || 'center',
            justifyContent: 'center',
            zIndex: 900,
            transition: show
                ? '0ms left 0ms'
                : `0ms left ${timeout}ms`
        }
        return (
            <Layout>
                <React.Fragment>
                    <div
                        style={style}
                        onClick={typeof maskClick === 'function' ? this.onMaskClick : undefined}
                    >
                        <CSSTransition
                            appear
                            enter
                            exit
                            timeout={timeout}
                            classNames={classNames}
                            in={show}
                            unmountOnExit
                        >
                            <div className={className}>{children}</div>
                        </CSSTransition>
                    </div>
                    {showMask
                        ? <Mask
                            show={show}
                            classNames={classNames}
                            timeout={timeout}
                            backgroundColor={maskBackgroundColor}
                        />
                        : null
                    }
                </React.Fragment>
            </Layout>
        );
    }
}

export default Modal;

class Layout extends Component {
    render() {
        const { children } = this.props
        return ReactDOM.createPortal(
            children,
            document.body
        );
    }
}