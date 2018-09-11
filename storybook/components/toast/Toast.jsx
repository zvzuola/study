import React from 'react'
import ReactDOM from 'react-dom'
import Notices from './Notices'

let noticesInstance

const create = (options, type) => {
    getNotices((notices) => { notices.add(options, type) })
}

const hide = () => {
    getNotices((notices) => { notices.hide() })
}

const getNotices = (cb) => {
    if (noticesInstance) {
        cb(noticesInstance)
        return false
    }

    const div = document.createElement('div')
    document.body.appendChild(div)

    const ref = (notices) => {
        noticesInstance = notices
        cb(noticesInstance)
    }

    ReactDOM.render(<Notices ref={ref} />, div)
}


const Toast = {
    info: (message, duration, onClose) => {
        const option = {
            message,
            duration,
            onClose
        }
        create(option, 'info')
    },
    loading: (message, duration, onClose) => {
        const option = {
            message,
            duration,
            onClose
        }
        create(option, 'loading')
    },
    success: (message, duration, onClose) => {
        const option = {
            message,
            duration,
            onClose
        }
        create(option, 'success')
    },
    hide: () => {
        hide()
    }
}

export default Toast
