import { RouterProvider } from 'react-router-dom'
import { router } from './routers'
import { patientRouter } from './routers/patientRouter'

function App(): JSX.Element {
  // 사용자 타입에 따라 다른 라우터 사용
  const isGuardian = localStorage.getItem('is_guardian') === 'true';

  return <RouterProvider router={isGuardian ? router : patientRouter} />
}

export default App
