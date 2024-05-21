import { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import './App.css'

import LoginPage from './pages/LoginPage';
import EffectiPage from './pages/EffectiPage'
import PncpPage from './pages/PncpPage';
import ProposalsPage from './pages/ProposalsPage'
import SettingsPage from './pages/SettingsPage';
import LoginProvider, { LoginContext } from "./services/auth";

// Route requires the user to be logged in
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(LoginContext);

  if (!isAuthenticated())
    return <Navigate to="/login" />;

  return children;
};

function App() {

  return (
    <BrowserRouter basename="/mdp-frontend">
      <LoginProvider>
        <div className='flex flex-col xl:flex-row'>
          <Routes>

            <Route path="/" element={<Navigate to="/effecti" />} />

            <Route
              path="/login"
              element={
                <>
                  <LoginPage />
                </>
              }
            />

            <Route
              path="/effecti"
              element={
                <ProtectedRoute>
                  <EffectiPage/>
                </ProtectedRoute>
              }
            /> 

            <Route
              path="/pncp"
              element={
                <ProtectedRoute>
                  <PncpPage/>
                </ProtectedRoute>
              }
            /> 

            <Route
              path="/propostas"
              element={
                <ProtectedRoute>
                  <ProposalsPage/>
                </ProtectedRoute>
              }
            /> 

            <Route
              path="/configuracoes"
              element={
                <ProtectedRoute>
                  <SettingsPage/>
                </ProtectedRoute>
              }
            /> 

          </Routes>
        </div>
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App
