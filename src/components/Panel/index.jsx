import React from 'react'
import { useStyle } from '@/utils/hooks/index'
import styles from "./index.module.scss";
export default function Panel(props) {
  const {
    cookTime,
    servings,
    instructions,
    ingredients,
    className,
    ...rest
  } = props

  const getClassName = useStyle(styles);
  
  const panelClassName = getClassName({
    panel: true,
    ...className?.split(" ").reduce((acc,cls) => ({...acc, [cls] :true}),{})
  })


  return (
    <div className={panelClassName} {...rest}>
      <div>
        <span className={getClassName("title")}>Cook Time:</span>
        <span>{cookTime}</span>
      </div>

      <div>
        <span className={getClassName("title")}>Servings:</span>
        <span>{servings}</span>
      </div>      

    </div>
  )
}
