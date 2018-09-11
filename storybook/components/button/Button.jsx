import React from 'react'
import classNames from 'classnames'
import './style/index.scss'

const Button = (props) => {
    const { children, prefixCls, className, type, ghost, ...other } = props
    const classes = classNames(prefixCls, className, {
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-background-ghost`]: ghost,
    })
    const ComponentName = 'href' in other ? 'a' : 'button'
    return (
        <ComponentName className={classes} {...other}>{children}</ComponentName>
    )
}
Button.defaultProps = {
    prefixCls: 'zv-btn',
};
export default Button