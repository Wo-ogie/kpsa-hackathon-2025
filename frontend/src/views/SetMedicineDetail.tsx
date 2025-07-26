import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/common/Button';


const SetMedicineDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const medicineName = location.state?.medicineName || '';

  const [medicineNameInput, setMedicineNameInput] = useState(medicineName);
  const [timeOptions, setTimeOptions] = useState([
    { id: 'morning', label: '아침', time: '09:00', enabled: true },
    { id: 'lunch', label: '점심', time: '13:00', enabled: true },
    { id: 'dinner', label: '저녁', time: '18:00', enabled: true }
  ]);
  const [startDate, setStartDate] = useState('2025-03-21');
  const [endDate, setEndDate] = useState('2025-07-21');
  const [dosePerTime, setDosePerTime] = useState(1);

  const handleTimeToggle = (id: string) => {
    setTimeOptions(prev =>
      prev.map(option =>
        option.id === id
          ? { ...option, enabled: !option.enabled }
          : option
      )
    );
  };

  const handleDoseChange = (increment: boolean) => {
    if (increment) {
      setDosePerTime(prev => Math.min(prev + 1, 10));
    } else {
      setDosePerTime(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSave = () => {
    const enabledTimes = timeOptions.filter(option => option.enabled);
    if (enabledTimes.length === 0) {
      alert('최소 하나의 복용 시간을 선택해주세요.');
      return;
    }

    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));

    const medicineData = {
      name: medicineNameInput,
      dose_per_time: dosePerTime,
      times_per_day: enabledTimes.length,
      days: days
    };

    localStorage.setItem('medications', JSON.stringify([...JSON.parse(localStorage.getItem('medications') || '[]'), medicineData]));
    navigate('/drug-cart');
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="p-4 space-y-6">
        {/* 약 이름 입력 */}
        <div className="bg-white rounded-lg p-4">
          <input
            type="text"
            value={medicineNameInput}
            onChange={(e) => setMedicineNameInput(e.target.value)}
            className="w-full text-lg font-medium bg-transparent border-none outline-none"
            placeholder="약 이름을 입력하세요"
          />
        </div>

        {/* 시간 설정 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-400 mb-4">시간</h2>
          <div className="space-y-3">
            {timeOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center space-x-4">
                  <span className="bg-[#FFF0E5] text-[#DC6414] px-3 py-1 rounded-full text-sm font-medium">
                    {option.label}
                  </span>
                  <span className="text-gray-900 font-medium">{option.time}</span>
                </div>
                <button
                  onClick={() => handleTimeToggle(option.id)}
                  className={`w-12 h-6 rounded-full transition-colors ${option.enabled ? 'bg-[#FF7E32]' : 'bg-gray-300'
                    }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${option.enabled ? 'transform translate-x-6' : 'transform translate-x-1'
                    }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 기간 설정 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">기간</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm">
                시작일
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-gray-700"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm">
                종료일
              </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* 1회 복약량 설정 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">1회 복약량</h2>
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => handleDoseChange(false)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-2xl font-bold text-gray-900 w-8 text-center">
              {dosePerTime}
            </span>
            <button
              onClick={() => handleDoseChange(true)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-20 left-0 right-0 p-4">
        <Button
          onClick={handleSave}
          variant="primary"
          size="lg"
          fullWidth
        >
          담기
        </Button>
      </div>
    </div>
  );
};

export default SetMedicineDetail; 