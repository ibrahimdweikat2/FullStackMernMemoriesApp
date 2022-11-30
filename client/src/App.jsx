import React from 'react'
import NavBar from './Components/NavBar/NavBar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';
import PostDetails from './Components/PostDetails/PostDetails';
import { BrowserRouter , Route,Switch,Redirect } from 'react-router-dom';


const App = () => {
  
  return (
  <BrowserRouter>
    <div className='container-lg'>
      <NavBar />
      <Switch>
        <Route path='/' exact><Redirect to='/posts' /></Route>
        <Route path='/posts' exact component={Home}/>
        <Route path='/posts/search'  component={Home}/>
        <Route path='/posts/:id' exact component={PostDetails}/>
        <Route path='/auth' exact component={Auth} />
      </Switch>
    </div>
  </BrowserRouter>
  )
}

export default App