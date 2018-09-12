import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TabPane extends Component {
    static propTypes = {
        label: PropTypes.node,
        className: PropTypes.string,
    }

    static defaultProps = {
        onChange: () => { }
    }

    render() {
        const { children, className } = this.props
        return (
            children
                ? <div className={className}>{children}</div>
                : null
        )
    }
}
