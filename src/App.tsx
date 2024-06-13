import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './contexts/UserContext';
import DailyWork from './pages/daily-work';
import DashboardPage from './pages/dashboard';
import Profile from './pages/profile';
import ReminderPage from './pages/reminder';
import TodoPage from './pages/todo';

function App() {
  return (
    <div className="bg-slate-50">
      <Router>
        <UserProvider>
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
                          <DashboardPage />
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
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
