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
import MedicationHistory from '../views/MedicationHistory'
import AddMedicine from '../views/AddMedicine'
import AddMedicineSearch from '../views/AddMedicineSearch'
import AddMedicineDetail from '../views/AddMedicineDetail'
import DrugCart from '../views/DrugCart'
import NamingPrescription from '../views/NamingPrescription'
import FamilyPhoneInput from '../views/FamilyPhoneInput'
import FamilyNickname from '../views/FamilyNickname'
import FamilyPermissions from '../views/FamilyPermissions'
import Family from '../views/Family'
import SetMedicineDetail from '../views/SetMedicineDetail'

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
        path: 'add-medicine/:family_id',
        element: <AddMedicine />,
        handle: {
          title: '약 추가',
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
        path: 'drug-cart',
        element: <DrugCart />,
        handle: {
          title: '담은 약',
        },
      },
      {
        path: 'naming-prescription',
        element: <NamingPrescription />,
        handle: {
          title: '처방전 이름',
        },
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
      {
        path: 'family-permissions',
        element: <FamilyPermissions />,
        handle: {
          title: '가족 권한',
        },
      },
      {
        path: 'family',
        element: <Family />,
        handle: {
          title: '가족',
        },
      },
      {
        path: 'set-medicine-detail',
        element: <SetMedicineDetail />,
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
        path: 'medication-detail/:id',
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
        path: 'medication-history',
        element: <MedicationHistory />,
        handle: {
          title: '복약 히스토리',
        },
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],

  }
]) 