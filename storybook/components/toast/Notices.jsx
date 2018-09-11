import React, { Component } from 'react'
import Notice from './Notice'

export default class Notices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notices: []
        }
    }

    getUuid() {
        return (Date.now()).toString(36)
    }

    getNotices() {
        return this.state.notices.map(v => {
            const close = () => this.remove(v)
            const { message, id, ...other} = v
            return <Notice close={close} key={id} {...other} >{message}</Notice>
        })
    }

    add(options, type) {
        const { notices } = this.state
        this.setState({
            notices: [...notices, {
                ...options,
                type,
                id: this.getUuid()
            }]
        })
    }

    remove(notice) {
        const { notices } = this.state
        const index = notices.findIndex(v => v.id === notice.id)

        this.setState({
            notices: notices.slice(0, index).concat(notices.slice(index + 1))
        }, () => {
            if (typeof notice.onClose === 'function') {
                notice.onClose()
            }
        })
    }

    hide() {
        this.state.notices.forEach(v => this.remove(v))
    }

    render() {
        const style = {
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translate3D(-50%, 0, 0)',
            zIndex: 1000
        }

        return (
            <div style={style}>
                {this.getNotices()}
            </div>
        )
    }
}
