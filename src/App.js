import {Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar_general';
import UserPage from './pages/users';
import PageNotFound  from './pages/PageNotFound';
import HomePage from './pages/home_page';
import Login from "./pages/login";
import Register from "./pages/register";
import Reset from "./pages/reset";
import Dashboard from "./pages/Dashboard";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <p>
        Work In Progress
      </p>
      <div>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/users' element={<UserPage/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/reset' element={<Reset/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route element={PageNotFound} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
