import React, { use } from 'react'
import { useStyle } from '@/utils/hooks/index'
import styles from "./index.module.scss";
export default function Instruction(props) {
  const {
    instructions,
    className,
    ...rest
  } = props

  const getClassName  = useStyle(styles)
  return (
    <div className={getClassName('instruction')}>
      <span className={getClassName('instruction_title')}>Instructions :</span>
        <React.Fragment>
          {
            Array.isArray(instructions)  && instructions.map((info,index) =>{
              return (
                <span key={index} className={getClassName('instruction_item')}> {info}</span>
              )
            })
          }
        </React.Fragment>

    </div>
  )
}
