import React from 'react'
import styles from "./index.module.scss";
import { useRecipeStore } from '@/status/index';
import { motion, AnimatePresence } from 'framer-motion';
import { useStyle } from '@/utils/hooks';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faXmark,faPlus } from '@fortawesome/free-solid-svg-icons'



const Editor = (props) => {
  const {
    className,
    ...rest
  } = props

  const {
    getSelectedRecipe,
    updateRecipe,
    selectRecipe
  
  } = useRecipeStore()
  const recipe = getSelectedRecipe()
  const {
    id,
    name,
    cookTime,
    instructions,
    ingredients
  } = recipe || {}
  
  const getClassName = useStyle(styles);

  const handleChange = (newData) =>{
    updateRecipe(id,newData)
  }
  const ingredientRef = React.useRef()
  const instructionRef = React.useRef()
  const [newIngredient, setNewIngredient] = React.useState(false);
  const [newInstruction, setNewInstruction] = React.useState(false);

  React.useEffect(() => {
    if (newIngredient && ingredientRef.current) {
      setTimeout(() => {
        ingredientRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        setNewIngredient(false);
      });
    }
  }, [newIngredient]);

  React.useEffect(() => {
    if (newInstruction && instructionRef.current) {
      setTimeout(() => {
        instructionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        setNewInstruction(false);
      });
    }
  }, [newInstruction]);


  const handleDelete = (id,type) =>{

    if(type === 'instructions'){
      handleChange({
        instructions : instructions ?.filter((item,i) => i !== id)
      })
    }else if(type === 'ingredients'){
      handleChange({
        ingredients : ingredients ?.filter((item,i) => i !== id)
      })
    }
  }
  const handleAdd = (type) =>{
    if(type === 'instructions'){
      handleChange({
        instructions : [...instructions || [],'']
      })
      setNewInstruction(true)
    }else if(type === 'ingredients'){
      handleChange({
        ingredients : [...ingredients || [],'']
      })
      setNewIngredient(true);
    }
    
  }


  return (
    <motion.div 
      className={getClassName('container')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <div className={getClassName('container_header')}>
        <span className={getClassName('container_title')}>Edit Recipe</span>

        <Button className='btn-danger ' onClick = {() =>{selectRecipe(null)}}> <FontAwesomeIcon icon={faXmark} size='lg' /></Button>

      </div>

      <div className={getClassName('sample_panel')}>
        {/* NAME */}
        <div className={getClassName('panel_item')}>
          <label htmlFor="editor_name">Name: </label>
          <input type="text" id="editor_name" value={name} onChange={(e) => handleChange({ name: e.target.value })} />
        </div>
        {/* Cooking Time */}
        <div className={getClassName('panel_item')}>
          <label htmlFor="editor_cookTime">Cooking Time: </label>
          <input type="text" id="editor_cookTime" value={name} onChange={(e) => handleChange({ name: e.target.value })} />
        </div>
        {/* Serving */}
        <div className={getClassName('panel_item')}>
          <label htmlFor="editor_servings">Servings: </label>
          <input type="text" id="editor_servings" value={name} onChange={(e) => handleChange({ name: e.target.value })} />
        </div>
        {/* Ingredient */}
        <div className={getClassName('ingredients_panel')}>
          <span className={getClassName('title')}>Ingredients</span>
          <div className={getClassName('add')}>
            <Button className="btn" onClick = {() =>{handleAdd('ingredients')
            }}><FontAwesomeIcon icon={faPlus} size='lg' /> ADD Ingredients</Button>
          </div>
          <AnimatePresence>
            {ingredients?.map((info,index) =>{
              const ingredientId = `ingredient-${index}`
              return (
                <motion.div 
                  key={ingredientId} 
                  className={getClassName('panel_item')}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}>
                  <label htmlFor={ingredientId}>{index + 1}:</label>
                <input type='text' value={info.name} onChange={(e)=>{
                  handleChange({
                    ingredients : ingredients?.map((item,i) =>{
                      if(i === index){
                        return {
                          ...item,
                          name: e.target.value
                        }
                        }
                        return item
                      
                    })
                  })
                }}/>
                <input type='text' value={info.amount} onChange={(e)=>{
                  handleChange({
                    ingredients : ingredients?.map((item,i) =>{
                      if(i === index){
                        return {
                          ...item,
                          amount: e.target.value
                        }
                        }
                        return item
                      
                    })
                  })
                }}/>                
                <Button className="btn-danger icon" onClick = {() =>{
                  handleDelete(index,'ingredients')
                }}><FontAwesomeIcon icon={faTrash} size='lg' /></Button>
                </motion.div>
              )
            })
            
          }
          </AnimatePresence>
        <div className={getClassName('the-end')} ref={ingredientRef}></div>
        </div>

        {/* Instruction */}
        <div className={getClassName('instructions_panel')}>

          <span className={getClassName('title')}>Instruction</span>
        <div className={getClassName('add')}>
            <Button className='btn' onClick ={()=>{handleAdd('instructions')}}><FontAwesomeIcon icon={faPlus} size='lg' /> ADD Instructions</Button>
        </div>
          <AnimatePresence>
          {
            instructions?.map((info,index) =>{
              const instructionId = `instruction-${index}`;
              
              return (
                <motion.div 
                  key={instructionId} 
                  className={getClassName('panel_item')}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}>
                  <label htmlFor={instructionId}>{index + 1}</label>
                  <input type="text" id={instructionId} value={info} onChange={e => handleChange({
                    instructions : instructions?.map((item,i) => i ===index ? e.target.value : item)
                  })
                  } />
                  <Button className={'btn-danger icon'} onClick = {()=>{handleDelete(index,'instructions')}
                  }><FontAwesomeIcon icon={faTrash} size='lg' /></Button>
                </motion.div>    
                )
            })
          }
          </AnimatePresence>
        <div className={getClassName('the-end')} ref={instructionRef}></div>
        </div>

      </div>
    </motion.div>
  )
}

export default Editor;