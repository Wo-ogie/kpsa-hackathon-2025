import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../components/common/CheckBox';
import { drugAPI, plantAPI } from '../lib/api';
import { Prescription } from '../types/prescription';
import { getHours } from 'date-fns';
import { Plant } from '@/types/plant';

type MealTime = '아침' | '점심' | '저녁';

function getMealTime(): MealTime {
  const now = new Date();
  const currentHour = getHours(now);

  let mealTime: MealTime;

  if (currentHour < 11) {
    mealTime = '아침';
  } else if (currentHour < 17) {
    mealTime = '점심';
  } else {
    mealTime = '저녁';
  }

  return mealTime;
}


const Dose = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<{ id: number, checked: boolean }[]>([]);
  const [showNoPrescriptionModal, setShowNoPrescriptionModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [mealTime, setMealTime] = useState<MealTime>('아침');

  useEffect(() => {
    const time = getMealTime();
    setMealTime(time);
    drugAPI.getPrescriptions(Number(localStorage.getItem('userId'))).then((res: { prescriptions: Prescription[] }) => {
      if (res.prescriptions.length === 0) {
        setShowNoPrescriptionModal(true);
      } else {
        setPrescriptions(res.prescriptions);
        // 처방전 로드 후 checkedItems 초기화
        setCheckedItems(res.prescriptions.map(prescription => ({
          id: prescription.id,
          checked: false
        })));
      }
    }).catch((error) => {
      console.error('처방전 조회 실패:', error);
      setShowNoPrescriptionModal(true);
    });
  }, []);

  const handleCheckboxChange = (id: number) => {
    setCheckedItems(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index !== -1) {
        const newItems = [...prev];
        newItems[index].checked = !newItems[index].checked;
        return newItems;
      }
      return prev;
    });
  };

  const handleGoToAddPrescription = () => {
    setShowNoPrescriptionModal(false);
    navigate('/add-medicine');
  };

  const handleCloseModal = () => {
    setShowNoPrescriptionModal(false);
    navigate('/main');
  };

  const handleSubmit = () => {
    const medicationTime = mealTime === '아침' ? 'MORNING' : mealTime === '점심' ? 'NOON' : 'EVENING';
    plantAPI.verifyMedication(medicationTime, checkedItems.map(item => item.id))
      .then((res: { active_plant: Plant }) => {
        if (res.active_plant) {
          localStorage.setItem('activePlant', JSON.stringify(res.active_plant));
          navigate('/main');
        }
      })
  };

  const allChecked = checkedItems.length > 0 && checkedItems.every(item => item.checked);

  return (
    <div className='flex flex-col'>
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-900">
          오늘 {mealTime} 약 복용하셨나요?
        </h2>
      </div>

      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <CheckBox
            key={prescription.id}
            id={prescription.id.toString()}
            checked={checkedItems.find(item => item.id === prescription.id)?.checked || false}
            onChange={() => handleCheckboxChange(prescription.id)} // 화살표 함수로 id 전달
            label={prescription.name}
          />
        ))}
      </div>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[412px] px-4 z-50">
        <button
          onClick={handleSubmit}
          disabled={!allChecked}
          className={`w-full font-bold py-3 px-4 rounded-full text-xl transition-colors ${allChecked
            ? 'bg-orange-primary text-white hover:bg-orange-primary'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          복용 완료하기
        </button>
      </div>

      {/* 처방전 없음 모달 */}
      {showNoPrescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 text-orange-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                등록된 처방전이 없습니다
              </h3>
              <p className="text-gray-600 mb-6">
                처방전을 등록하러 가시겠습니까?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleGoToAddPrescription}
                  className="flex-1 bg-orange-500 font-bold text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  처방전 등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dose;