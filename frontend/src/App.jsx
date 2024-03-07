import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import {Dashboard} from './Pages/Dashboard'
import {SendMoney} from './Pages/SendMoney'
import LandingPage from './Pages/LandingPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LandingPage/> } />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}



export default App
