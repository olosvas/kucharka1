import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import RecipeGrid from './components/RecipeGrid'
import { Provider, useSelector } from 'react-redux'
import RecipeFull from './components/RecipeFull'
import AddRecipePage from './components/AddRecipePage'
import Login from './components/Login'

//cototjeje
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useRouteMatch
} from 'react-router-dom'

import { createStore, combineReducers } from 'redux'
import recipeReducer from './reducers/recipeReducer'
import filterReducer from './reducers/filterReducer'
import materialsReducer from './reducers/materialsReducer'
import userReducer from './reducers/userReducer'
//import AddRecipe from './components/AddRecipe'

const reducer = combineReducers({
    recipes: recipeReducer,
    filter: filterReducer,
    materials: materialsReducer,
    user: userReducer
})

const store = createStore(reducer)


const App = () => {

/*
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  */

  const recipes = useSelector(state => state.recipes)

  const match = useRouteMatch('/recipes/:id')
  const recipe = match
    ? recipes.find(recipe => recipe.id === Number(match.params.id))
    : null


  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <div>
          <Link style={padding} to="/">Recepies</Link>
        </div>
        <div>
          <Link style={padding} to="/login">login</Link>
        </div>
      </div>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/recipes/:id">
          <RecipeFull recipe={recipe} />
        </Route>
        <Route path="/">
          <RecipeGrid />
        </Route>
      </Switch>


      <div>
        <br />
        <em>Note app, Department of Computer Science 2021</em>
      </div>
    </div>
  )
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
