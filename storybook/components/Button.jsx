import React from 'react'
const Button = (props) => {
    const {children, ...other} = props
    const style = {
        border: '1px solid red', 
        background: 'transparet',
        padding: 0
    }
    return (
        <button style={style} {...other}>{children}</button>
    )
}
export default Button