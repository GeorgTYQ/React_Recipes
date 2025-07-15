import React from 'react'
import styles from './index.module.scss'
import { useStyle } from '@/utils/hooks/index';
import { useRecipeStore } from '@/status'
import Button from '@/components/Button'

export default function Header(props) {
  const {
    header,
    id,
    deleteHandler,
    className,
    ...rest
  } = props;
  // 把所有的styles 传入到 useStyle 中
  const getClassName = useStyle(styles);
  //用传进来的className放进去getclassName中来返还一个list
  const headerClassName = getClassName(className)
  
  return (
    <div className={getClassName('recipe_header')}>
      <div className = {getClassName('recipe_title')}>
        {header}
      </div>
        <div className={getClassName('recipe-btn-group')}>
          <Button className='btn-danger' onClick = {(e) =>{
            e.stopPropagation()
            deleteHandler(id)
          }}>
            REMOVE</Button>
        </div>
    </div>
  )
}
