import {Route, Routes} from 'react-router-dom';
import Navbar from './components/navbar_general';
import UserPage from './pages/users';
import PageNFound from './pages/PageNotFound'; 
import HomePage from './pages/home_page';
import Login from "./pages/login";
import Register from "./pages/register";
import Reset from "./pages/reset";
import TaskPage from './pages/tasks';
import Dashboard from "./pages/Dashboard";
import Footer from './components/footer';
import ValAccountRegistration from './pages/register_valorant_account';
import QueuePage from './pages/queue';
import ModQueuePage from './pages/moderator_queue';
import TourneyPage from './pages/tournament';
import MakeTournamentPage from './pages/make_tournament';
import MatchesPage from './pages/matches';
import TeamsPage from './pages/teams';
import './App.css';
import { StepsProvider } from "react-step-builder";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div>
      <StepsProvider>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/users' element={<UserPage/>} />
          <Route path='/register_user' element={<ValAccountRegistration/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/reset' element={<Reset/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/tasks' element={<TaskPage/>} />
          <Route path='/queue' element={<QueuePage/>} />
          <Route path='/matches' element={<MatchesPage/>} />
          <Route path='/teams' element={<TeamsPage/>} />
          <Route path='/moderator_queue' element={<ModQueuePage/>} />
          <Route path='/make_tournament' element={<MakeTournamentPage/>} />
          <Route path='/tournament' element={<TourneyPage/>} />
          <Route path='*' element={<PageNFound/>} />
        </Routes>
      </StepsProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
