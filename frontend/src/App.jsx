import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
// import './App.css'
import GoogleLogin from './assets/googleLogin';
import Dashboard from './assets/Dashboard';
import NotFoundPage from './assets/NotFoundPage';
import {GoogleOAuthProvider} from '@react-oauth/google';



function App() {
  const clientId = '731027594585-qnpsud2bj3bu2bp25acnk84atjrj67lk.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleLogin />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
