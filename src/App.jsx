import React from 'react'
import Editor from '@/components/Editor'
import RecipeList from '@/components/Recipe'
import { useRecipeStore } from '@/status'
const App = () => {
const {selectRecipeId} = useRecipeStore()

  return (
    
    <>
    <RecipeList />
    {
      selectRecipeId && <Editor />
    }

    
    </>

  )
}

export default App
