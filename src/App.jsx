import React from 'react'
import Editor from '@/components/Editor'
import RecipeList from '@/components/Recipe'
import { useRecipeStore } from '@/status'
const App = () => {
const {selectedRecipeId} = useRecipeStore()

  return (
    
    <>
    <RecipeList />
    {
      selectedRecipeId && <Editor />
    }

    
    </>

  )
}

export default App
