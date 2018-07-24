import React from 'react'
import classNames from 'classnames'
import './style/index.scss'

const Button = (props) => {
    const { children, prefixCls, className, ...other } = props
    const classes = classNames(prefixCls, className)
    return (
        <button className={classes} {...other}>{children}</button>
    )
}
Button.defaultProps = {
    prefixCls: 'zv-btn',
};
export default Button