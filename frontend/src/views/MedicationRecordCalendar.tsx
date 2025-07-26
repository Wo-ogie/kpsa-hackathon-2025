import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const MedicationRecordCalendar = () => {
  const navigate = useNavigate();

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const highlightedDays = [29, 30, 31];

  const records = [
    {
      date: '2025년 7월 25일',
      items: [
        { time: '점심', type: '정형외과 약', status: 'completed' },
        { time: '아침, 점심, 저녁', type: '정형외과 약', status: 'completed' }
      ]
    },
    {
      date: '2025년 7월 29일~7월 31일',
      items: [
        { type: '일정', description: '정형외과 방문', status: 'scheduled' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') {
      return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
    }
    if (status === 'scheduled') {
      return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>;
    }
    return <div className="w-3 h-3 bg-gray-300 rounded-full"></div>;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <BackButton />
        <h1 className="text-lg font-bold text-gray-900">나의 복약 기록</h1>
        <div className="w-6"></div>
      </div>

      {/* 캘린더 */}
      <div className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">2025년 7월</h3>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day} className="text-center text-sm text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* 캘린더 그리드 */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {calendarDays.map((day) => {
            const isHighlighted = highlightedDays.includes(day);

            return (
              <div
                key={day}
                className={`
                  aspect-square flex items-center justify-center text-sm font-medium cursor-pointer
                  ${isHighlighted
                    ? 'bg-orange-500 text-white rounded-lg'
                    : 'text-gray-900 hover:bg-gray-100 rounded-lg'
                  }
                `}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* 기록 목록 */}
        <div className="space-y-4">
          {records.map((record, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">{record.date}</h4>
              <div className="space-y-2">
                {record.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm text-gray-600">
                        {item.time && `${item.time} `}
                        {item.type}
                        {item.description && ` - ${item.description}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => navigate('/medication-record-add')}
          className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          캘린더 일정 추가
        </button>
      </div>
    </div>
  );
};

export default MedicationRecordCalendar; 