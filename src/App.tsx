import { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { UserContext } from './contexts/UserContext';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Reminder from './pages/reminder/Reminder';
import DailyWork from './pages/DailyWork';

function App() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('App Component must be used within a UserProvider');
  }

  const { user } = userContext;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-slate-50">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reminder" element={<Reminder />} />
              <Route path="/daily-work" element={<DailyWork />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </>
  );
}

export default App;
