import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../views/Home'
import Login from '../views/Login'
import About from '../views/About'
import NotFound from '../views/NotFound'
import Signup from '../views/Signup'
import PhoneInput from '../views/PhoneInput'
import KakaoCallback from '../views/KakaoCallback'
import Welcome from '../views/Welcome'
import ProtectorSelect from '../views/ProtectorSelect'
import Main from '../views/Main'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'kakao-callback',
        element: <KakaoCallback />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'phone-input',
        element: <PhoneInput />,
      },
      {
        path: 'protector-select',
        element: <ProtectorSelect />,
      },
      {
        path: 'welcome',
        element: <Welcome />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]) 