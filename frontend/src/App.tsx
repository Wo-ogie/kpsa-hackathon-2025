import { RouterProvider } from 'react-router-dom'
import { router } from './routers'

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
