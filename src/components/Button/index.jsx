import { useStyle } from '@/utils/hooks/index'
import React from 'react'
import styles from "./index.module.scss";
 const Button = (props) => {
  const {className, ...rest} = props
  const getClassName = useStyle(styles)
  const buttonClassName = getClassName({
    "btn": true,
    // 如果没有传入className，或者className不包含"btn-danger"、"btn-success"和"btn-warning"中的任何一个，则返回true
    "btn-primary": !className || (!className.includes("btn-danger") && !className.includes("btn-success") && !className.includes("btn-warning")),
    // 将className字符串按空格分割成数组，然后使用reduce方法将数组中的每个元素作为键，
    // 值为true，生成一个新的对象
    ...(className?.split(' ').reduce((acc,cls) =>({...acc,[cls]: true}),{}))
  })
  return (
    <div className={buttonClassName} {...rest}></div>
  )
}


export default Button