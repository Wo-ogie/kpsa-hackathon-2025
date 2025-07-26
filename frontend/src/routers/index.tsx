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
import Album from '../views/Album'
import Store from '../views/Store'
import MedicationList from '../views/MedicationList'
import MedicationInfo from '../views/MedicationInfo'
import MedicationDetail from '../views/MedicationDetail'
import MedicationRecord from '../views/MedicationRecord'
import MedicationRecordCalendar from '../views/MedicationRecordCalendar'
import MedicationRecordAdd from '../views/MedicationRecordAdd'
import AddMedicine from '../views/AddMedicine'
import AddMedicineSearch from '../views/AddMedicineSearch'
import AddMedicineDetail from '../views/AddMedicineDetail'

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
    element: <MainLayout />,
    children: [
      {
        path: 'main',
        element: <Main />,
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
        path: 'album',
        element: <Album />,
        handle: {
          title: '앨범',
        },
      },
      {
        path: 'store',
        element: <Store />,
        handle: {
          title: '상점',
        },
      },
      {
        path: 'medication-list',
        element: <MedicationList />,
        handle: {
          title: '복약 리스트',
        },
      },
      {
        path: 'add-medicine',
        element: <AddMedicine />,
        handle: {
          title: '약 추가',
        },
      },
      {
        path: 'add-medicine-search',
        element: <AddMedicineSearch />,
        handle: {
          title: '약 입력',
        },
      },
      {
        path: 'add-medicine-detail/:medicineId',
        element: <AddMedicineDetail />,
        handle: {
          title: '약 입력',
        },
      },
      {
        path: 'medication-info',
        element: <MedicationInfo />,
        handle: {
          title: '나의 복약 정보',
        },
      },
      {
        path: 'medication-detail',
        element: <MedicationDetail />,
        handle: {
          title: '나의 복약 정보',
        },
      },
      {
        path: 'medication-record',
        element: <MedicationRecord />,
        handle: {
          title: '나의 복약 기록',
        },
      },
      {
        path: 'medication-record-calendar',
        element: <MedicationRecordCalendar />,
        handle: {
          title: '나의 복약 기록',
        },
      },
      {
        path: 'medication-record-add',
        element: <MedicationRecordAdd />,
        handle: {
          title: '나의 복약 기록',
        },
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],

  }
]) 