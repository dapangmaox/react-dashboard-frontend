import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import DailyWork from './pages/daily-work';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import ReminderPage from './pages/reminder';
import TodoPage from './pages/todo';

function App() {
  return (
    <div className="bg-slate-50">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/todo"
                    element={
                      <PrivateRoute>
                        <TodoPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/reminder"
                    element={
                      <PrivateRoute>
                        <ReminderPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/daily-work"
                    element={
                      <PrivateRoute>
                        <DailyWork />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
