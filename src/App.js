import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
// pages && components
import Home from './pages/home/Home';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import About from './pages/about/About'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/SideBar/Sidebar';
import Create from './pages/create/Create';
import MealsBook from './pages/mealsBook/MealsBook';
import Planner from './pages/planner/Planner';
import ShoppingList from './pages/shoppingList/ShoppingList';
import Details from './pages/details/Details';
import './App.css';
import Contact from './pages/contact/Contact';


function App() {
  const { authIsReady, user } = useAuthContext()

  return (

    <div className="App">
      {authIsReady && ( 
        <BrowserRouter>
          <div className="container">
            <Navbar /> 
            {user && <Sidebar /> }
            <Routes>
              <Route path='/' 
                element={<Home />} 
              />
              <Route path='/login' 
                element={user? <Navigate to='/' /> : <Login />} 
              /> 
              <Route path='/signup' 
                element={user? <Navigate to='/'/> : <Signup />} />
              <Route path='/about' 
                element={<About />}
              />
              <Route path='/logout'
                element={<Navigate to="/" /> }
              />
              <Route path='/planner' 
                element={user? <Planner /> : <Navigate to='/' /> }
              />
              <Route path='/create'
                element={user? <Create /> : <Navigate to='/' />}
              />
              <Route path='/meals'
                element={user? <MealsBook /> : <Navigate to='/' />}
              />
              <Route path='/shopping-list' 
                element={user? <ShoppingList /> : <Navigate to='/' />}
              />
              <Route path='/contact'
                element={<Contact />}
              />
              <Route path='/meals/:id' 
                element={user? <Details /> : <Navigate to='/login' />}
              />
            </Routes>
          </div>
        </BrowserRouter> 
      )}
    </div>
  );
}

export default App;
