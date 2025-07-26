import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const AddMedicineDetail = () => {
  const { medicineId } = useParams();
  const [startDate, setStartDate] = useState('2025년 3월 21일');
  const [endDate, setEndDate] = useState('2025년 7월 21일');
  const [timeSettings, setTimeSettings] = useState({
    morning: true,
    lunch: true,
    evening: true
  });

  const medicineData = {
    id: 1,
    name: '다이그린정',
    englishName: 'Digreenjeong',
    hasProhibitedDrugs: true,
    hasDuplicateIngredients: true
  };

  const handleTimeToggle = (time: 'morning' | 'lunch' | 'evening') => {
    setTimeSettings(prev => ({
      ...prev,
      [time]: !prev[time]
    }));
  };

  return (
    <div className="bg-white min-h-screen">


      {/* 약 정보 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{medicineData.name}</h2>
            <p className="text-sm text-gray-500">{medicineData.englishName}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Time change</span>
            <span className="text-sm text-blue-600">수정</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">병용 금지 약물</span>
            <div className={`w-3 h-3 rounded-full ${medicineData.hasProhibitedDrugs ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">중복 성분</span>
            <div className={`w-3 h-3 rounded-full ${medicineData.hasDuplicateIngredients ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
          </div>
        </div>
      </div>

      {/* 주기 설정 */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">주기</h3>

        {/* 시작일 */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">시작일</label>
          <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
            <span className="text-sm font-medium text-gray-900">{startDate}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* 시간 설정 */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-3">시간</label>
          <div className="space-y-3">
            {/* 아침 */}
            <div className={`p-3 border rounded-lg ${timeSettings.morning ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">아침</span>
                  {timeSettings.morning && (
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <button
                  onClick={() => handleTimeToggle('morning')}
                  className={`w-12 h-6 rounded-full transition-colors ${timeSettings.morning ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${timeSettings.morning ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            </div>

            {/* 점심 */}
            <div className={`p-3 border rounded-lg ${timeSettings.lunch ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">점심 13:00</span>
                  {timeSettings.lunch && (
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <button
                  onClick={() => handleTimeToggle('lunch')}
                  className={`w-12 h-6 rounded-full transition-colors ${timeSettings.lunch ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${timeSettings.lunch ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            </div>

            {/* 저녁 */}
            <div className={`p-3 border rounded-lg ${timeSettings.evening ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">저녁 18:00</span>
                  {timeSettings.evening && (
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <button
                  onClick={() => handleTimeToggle('evening')}
                  className={`w-12 h-6 rounded-full transition-colors ${timeSettings.evening ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${timeSettings.evening ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 기간 설정 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">기간</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">시작일</label>
              <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{startDate}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">종료일</label>
              <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{endDate}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          약 추가 완료
        </button>
      </div>
    </div>
  );
};

export default AddMedicineDetail; 