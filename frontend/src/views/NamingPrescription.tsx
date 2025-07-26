import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { prescriptionAPI } from '../lib/api';
import { Medication } from '../types/prescription';

const NamingPrescription = () => {
  const navigate = useNavigate();
  const [prescriptionName, setPrescriptionName] = useState('혈압 약');
  const location = useLocation();
  const medications: Medication[] = location.state?.medications || [];

  const handleClearInput = () => {
    setPrescriptionName('');
  };

  const submitPrescription = () => {
    prescriptionAPI.registerPrescription({
      name: prescriptionName.trim(),
      medication_start_date: '2025-07-26',
      medication_times: ['MORNING'],
      drugs: medications.map(medication => ({
        name: medication.name,
        dose_per_time: medication.dose_per_time,
        times_per_day: medication.times_per_day,
        days: medication.days,
      })),
    });
  };

  return (
    <div className="bg-white min-h-screen">

      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          {/* 질문 */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-center">
            현재 등록하는 처방전의 이름을 무엇으로 저장할까요?
          </h2>

          {/* 설명 */}
          <p className="text-sm text-gray-500 mb-8 text-center">
            약 봉투의 이름을 쉽고 간편하게 부를 수 있습니다.
          </p>

          {/* 입력 필드 */}
          <div className="relative mb-8">
            <input
              type="text"
              value={prescriptionName}
              onChange={(e) => setPrescriptionName(e.target.value)}
              className="w-full px-4 py-3 text-lg border-b-2 border-orange-500 focus:outline-none focus:border-orange-600"
              placeholder="처방전 이름을 입력하세요"
            />
            {prescriptionName && (
              <button
                onClick={handleClearInput}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-20 left-0 right-0 p-4">
        <button
          onClick={submitPrescription}
          disabled={!prescriptionName.trim()}
          className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-medium hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default NamingPrescription; 