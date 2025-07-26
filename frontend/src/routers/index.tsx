import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../views/Home'
import About from '../views/About'
import NotFound from '../views/NotFound'
import Signup from '../views/Signup'
import PhoneInput from '../views/PhoneInput'
import KakaoCallback from '../views/KakaoCallback'
import Welcome from '../views/Welcome'
import ProtectorSelect from '../views/ProtectorSelect'
import Main from '../views/Main'
import MainLayout from '../components/layout/MainLayout'
import Dose from '../views/Dose'

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
        path: 'welcome',
        element: <Welcome />,
      },
    ],
  },
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'protector-select',
        element: <ProtectorSelect />,
      },
      {
        path: 'dose',
        element: <Dose />,
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

  }
]) 