import { useState } from 'react'
import './App.css'
import LandingPage from './pages/landingPage/LandingPage'
import Header from './components/navbar/Header'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/footer/Footer'
import HireRequest from './components/hireRequest/HireRequest'
import Sign from './components/sign/Sign'
import Login from './components/login/Login'
import Driver from './components/driver/Driver'
import OtpVerification from './components/otpVerification/OtpVerification'
import DriverAdd from './components/driverAdd/DriverAdd'
import VerifyHire from './components/verifyHire/VerifyHire'
import PrivateRoute from './PrivateRoute'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={
                <LandingPage />     
            } />

          <Route path="/hire/:id" element={
            <PrivateRoute>
                <HireRequest />
            </PrivateRoute>
          
            } />
          <Route path="/driverAdd" element={
            <PrivateRoute>
                <DriverAdd />
            </PrivateRoute>
            }
             />
          <Route path="/driver" element={
            <PrivateRoute>
                <Driver />
            </PrivateRoute>
            } 
            />
          <Route path="/verifyHire" element={
            <PrivateRoute>
                 <VerifyHire />
            </PrivateRoute>
           }
             />
          <Route path="/otpVerification/:id" element={
            <PrivateRoute>
                <OtpVerification />
            </PrivateRoute>
            } 
            />
          <Route path="/signin" element={<Sign />} />
          <Route path="/login" element={<Login />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
