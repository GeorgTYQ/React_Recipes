import React from 'react'
import { useStyle } from '@/utils/hooks/index'
import styles from "./index.module.scss";
export default function Ingredient(props) {
  const {
    ingredients,
    className,
    ...rest
  } = props

  const getClassName = useStyle(styles);

  return (
    <div className={getClassName('ingredient')}>
      <span className={getClassName('ingredient_title')}>Ingredients: </span>
      <span className={getClassName('ingredient_grid_item')}>
      {
        Array.isArray(ingredients) && ingredients.map((info, index) =>{
          return (
            <React.Fragment key={index}>
              <span className={getClassName('ingredient_name')}>{info.name}</span>
              <span className={getClassName('ingredient_amount')}>{info.amount}</span>
            </React.Fragment>
          )
        })
      }
      </span>

    </div>
  )
}
