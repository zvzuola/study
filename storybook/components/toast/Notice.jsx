import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classNames from 'classnames'
import './style/index.scss'

export default class Notice extends Component {

    static defaultProps = {
        transitionName: {
            enter: 'noticeEnter',
            enterActive: 'noticeEnterActive',
            leave: 'noticeLeave',
            leaveActive: 'noticeLeaveActive',
            appear: 'noticeAppear',
            appearActive: 'noticeAppearActive'
        },
        transitionTimeOut: 300,
        duration: 3000,
        type: 'info',
        close: () => {}
    }

    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }

    componentDidMount() {
        const { transitionTimeOut, duration } = this.props

        if (duration) {
            this.timer = window.setTimeout(() => {
                this.close()
            }, duration - transitionTimeOut)
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
        }
    }

    close = () => {
        const { transitionTimeOut, close } = this.props

        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.setState({ show: false })
        this.closeTimer = setTimeout(() => {
            close()
        }, transitionTimeOut)
    }

    render() {
        const { show } = this.state
        const { transitionName, transitionTimeOut, children, icon, type } = this.props
        const iconType = type === 'info' ? icon : type

        return (
            <ReactCSSTransitionGroup
                transitionName={transitionName}
                component="div"
                transitionAppear
                transitionAppearTimeout={transitionTimeOut}
                transitionEnter
                transitionEnterTimeout={transitionTimeOut}
                transitionLeave
                transitionLeaveTimeout={transitionTimeOut}
            >
                {show && <div className='m-notice'>
                    {iconType && <span className={`m-notice-${iconType}`}></span>}
                    {children}
                </div>}
            </ReactCSSTransitionGroup>
        )
    }
}
