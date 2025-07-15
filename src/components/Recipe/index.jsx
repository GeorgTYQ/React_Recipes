import React from 'react'
import styles from "./index.module.scss";
import { useStyle } from '@/utils/hooks/index';
import { useRecipeStore } from '@/status';
import Button from '@/components/Button'
import Header from '@/components/Header';
import Panel from "@/components/Panel";
import {motion} from 'framer-motion'
import { useState } from 'react';
const Recipe = (props) => {
  const {
    id,
    name,
    servings, //Integer
    cookTime, //String
    instructions, //Array List
    ingredients,  //Array List
    className
  } = props

  // 从useRecipeStore中解构出selectRecipeId、lastSelectedRecipeId、deleteRecipe和selectRecipe
  const {
    selectRecipeId,
    lastSelectedRecipeId,
    deleteRecipe,
    selectRecipe
  } = useRecipeStore()

  const getClassName = useStyle(styles)
  const recipeClassName = getClassName({
    'recipe':true,
    "chosen": selectRecipeId === id ? true : false,
    "last-chosen": lastSelectedRecipeId === id ? true : false,
    ...(className)?.split(" ").reduce((acc,cls) => ({...acc,[cls]:true}),{})
  })
  return (
      <div className={ getClassName("recipe_border")}>
        <motion.div 
          className={recipeClassName} 
          onClick={() => selectRecipe(id)}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          <Header 
          header ={name} 
          id={id}
          deleteHandler={deleteRecipe} >

          </Header>

          <Panel 
          cookTime = {cookTime}
          servings ={servings}
          ingredients = {ingredients}
          instructions = {instructions}
          >

          </Panel>

        </motion.div>
        

      </div>
  )
}


const RecipeList = () =>{
  const {
    recipes, 
    addRecipe} = useRecipeStore()

  const getClassName  = useStyle(styles)
  const ref = React.useRef()
  const [newAddRecipe, setNewAddRecipe] = React.useState(false)
  const addRecipeHandler = () =>{
    addRecipe()
    setNewAddRecipe(true);
  }

  React.useEffect(()=>{
    if(newAddRecipe){
      setTimeout(() => {
        ref.current.scrollIntoView({
        behavior: 'smooth',
        block:"end",
      });
      })

      setNewAddRecipe(false);
    }
  },[newAddRecipe])
  return (
    <div className={getClassName('container')}>

      {/* TITLE */}
      <div className={getClassName('title')}>
        <span>GFS Recipes</span>
      </div>

      {/* Add Button */}
      <div className={getClassName('add')}>
        <Button className ="btn btn-add" onClick={addRecipeHandler} > Add </Button>
      </div>

      {/* Recipes Card*/}
      <div>
        {recipes.map(recipe =>
        {
          return <Recipe key={recipe.id} {...recipe} />
        }
        )}
      </div>

      {/* Buttom Add Button */}
      <div className={getClassName('add')}>
        <Button className ="btn btn-add" onClick={addRecipe}>ADD</Button>
      </div>      

      <div className={getClassName('the-end')} ref={ref}></div>

    </div>
  )
}

export default RecipeList;