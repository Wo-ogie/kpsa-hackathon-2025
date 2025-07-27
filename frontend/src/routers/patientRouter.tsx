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
import PatientLayout from '../components/layout/PatientLayout'
import PatientMain from '../views/PatientMain'
import Dose from '../views/Dose'
import PatientMedicationHistory from '../views/PatientMedicationHistory'
import Settings from '../views/Settings'
import Family from '../views/Family'
import FamilyPhoneInput from '../views/FamilyPhoneInput'
import FamilyNickname from '../views/FamilyNickname'
import MedicationList from '../views/MedicationList'

export const patientRouter = createBrowserRouter([
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
        path: 'protector-select',
        element: <ProtectorSelect />,
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
    element: <PatientLayout />, // 환자용 레이아웃 (bottom navigation 없음)
    children: [
      {
        path: 'main',
        element: <PatientMain />,
      },
      {
        path: 'dose',
        element: <Dose />,
      },
      {
        path: 'patient-medication-history',
        element: <PatientMedicationHistory />,
      },
      {
        path: 'medication-list/:id',
        element: <MedicationList />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'family',
        element: <Family />,
      },
      {
        path: 'family-phone-input',
        element: <FamilyPhoneInput />,
        handle: {
          title: '가족 전화번호',
        },
      },
      {
        path: 'family-nickname',
        element: <FamilyNickname />,
        handle: {
          title: '가족 닉네임',
        },
      },
    ],
  }
]) 