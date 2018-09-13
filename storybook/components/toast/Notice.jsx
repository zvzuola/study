import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import './style/index.scss'

export default class Notice extends Component {

    static defaultProps = {
        classNames: {
            appear: 'noticeAppear',
            appearActive: 'noticeAppearActive',
            enter: 'noticeEnter',
            enterActive: 'noticeEnterActive',
            exit: 'noticeEixt',
            exitActive: 'noticeExitActive',
        },
        timeout: 300,
        duration: 3000,
        type: 'info',
        close: () => { }
    }

    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
    }

    componentDidMount() {
        const { timeout, duration } = this.props

        if (duration) {
            this.timer = window.setTimeout(() => {
                this.close()
            }, duration - timeout)
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
        const { timeout, close } = this.props

        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.setState({ show: false })
        this.closeTimer = setTimeout(() => {
            close()
        }, timeout)
    }

    render() {
        const { show } = this.state
        const { classNames, timeout, children, icon, type } = this.props
        const iconType = type === 'info' ? icon : type

        return (
            <CSSTransition
                in={show}
                classNames={classNames}
                appear
                enter
                exit
                unmountOnExit
                timeout={timeout}
            >
                <div className='m-notice'>
                    {iconType && <span className={`m-notice-${iconType}`}></span>}
                    {children}
                </div>
            </CSSTransition>
        )
    }
}
