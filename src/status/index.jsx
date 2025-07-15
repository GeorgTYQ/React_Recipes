import {create} from 'zustand';
import { immer} from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import {v4 as uuidV4} from 'uuid';
import {devtools} from "zustand/middleware"
const sampleRecipes = [
  {
    id: uuidV4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions: [
      "Put salt on Chicken",
      "Put chicken in oven",
      "Eat chicken"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: [
      "Put paprika on Pork",
      "Put pork in oven",
      "Eat pork"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Apple Pai",
    servings: 10,
    cookTime: "3:45",
    instructions: [
      "Put apples in pie",
      "Put pie in oven",
      "Eat pie"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
]

export const useRecipeStore = create(
  persist(
    devtools(
          immer((set,get) =>(
            {
              recipes : sampleRecipes, // All Recipes
              selectRecipeId: true, // Current Selected Recipes ID
              lastSelectedRecipeId: null, // Previous Selected Recipes ID
              
              selectRecipe: (id) => {
                set((state) => {
                  if(!state.selectRecipeId && id === state.lastSelectedRecipeId){
                    state.lastSelectedRecipeId = null

                  }else if (state.selectRecipeId && id !== state.selectRecipeId){
                    state.lastSelectedRecipeId = state.selectRecipeId
                  }
                  state.selectRecipeId = id
                  })
                },
              // Add new recipe
              addRecipe:() =>{ 
                set((state) =>{
                const newRecipe =  {
                  id: uuidV4(),
                  name: "",
                  servings: 0,
                  cookTime: "1:00",
                  instructions: [
                    "Instrunction 1",
                    "Instrunction 2",
                    "Instrunction 3"
                  ],
                  ingredients: [
                    {
                      id: uuidV4(),
                      name: "",
                      amount: ""
                    }
                  ]}

                state.recipes.push(newRecipe)
                state.selectRecipeId = newRecipe.id
                })},
              // update an existing recipe
              updateRecipe: (id,updatedRecipe) =>{
                set((state) =>{
                  const recipeIndex = state.recipes.findIndex(
                    (recipe) => recipe.id === id
                  );
                  if(recipeIndex !== -1 ){
                    // state.recipes[recipeIndex] = recipe;
                    state.recipes[recipeIndex] = {
                      ...state.recipes[recipeIndex],
                      ...updatedRecipe
                    }
                  }
                })
              },
              //remove existing recipe
              deleteRecipe: (id) => set((state) =>{
                state.recipes = state.recipes.filter((recipe) => recipe.id !== id );
                if(state.selectRecipeId == id){
                  state.selectRecipeId = null
                }
              }),
              getSelectedRecipe : () => {
                const {recipes,selectRecipeId} = get();
                return recipes.find((recipe) => recipe.id === selectRecipeId);
              },

              setSelectedRecipeId: (id) => {
                set((state) =>{
                  state.selectRecipe(id)
                })
              },

              deleteSelectedRecipeId: (id) =>{
                set((state) =>{
                  state.selectRecipe(null)
                })
              },
             }
    )),{
      name: "recipe-store",
      enabled: process.env.NODE_ENV ==="development"
    }
    ),
    {
      name : "recipe-storage",
      partialize: (state) => ({
        recipes: state.recipes,
        selectRecipeId: state.selectRecipeId,
        lastSelectedRecipeId: state.lastSelectedRecipeId,

      })
    }
  )
)