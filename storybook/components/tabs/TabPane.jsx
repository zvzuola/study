import React, { Component } from 'react'
import Animate from '../animate/Animate'
import PropTypes from 'prop-types'

export default class TabPane extends Component {
    static propTypes = {
        className: PropTypes.string,
    }

    render() {
        const { children, className } = this.props
        return (
            children
                ? <Animate><div className={className}>{children}</div></Animate>
                : null
        )
    }
}
