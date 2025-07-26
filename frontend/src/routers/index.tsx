import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../views/Home'
import About from '../views/About'
import NotFound from '../views/NotFound'

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