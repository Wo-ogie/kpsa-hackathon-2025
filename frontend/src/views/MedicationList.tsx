import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const MedicationList = () => {
  const navigate = useNavigate();

  const medicationCategories = [
    { id: 1, name: '안과 약', count: 2 },
    { id: 2, name: '정형외과 약', count: 3 }
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const highlightedDays = [29, 30, 31];
  const circledDay = 27;

  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <BackButton />
        <h1 className="text-lg font-bold text-gray-900">복약 리스트</h1>
        <div className="w-6"></div>
      </div>

      {/* 복약 카테고리 */}
      <div className="p-4 space-y-3">
        {medicationCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate('/medication-info')}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count}개의 약</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>

      {/* 복약 캘린더 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">복약 캘린더</h2>

        {/* 월 표시 */}
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
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day) => {
            const isHighlighted = highlightedDays.includes(day);
            const isCircled = day === circledDay;

            return (
              <div
                key={day}
                className={`
                  aspect-square flex items-center justify-center text-sm font-medium cursor-pointer
                  ${isHighlighted
                    ? 'bg-orange-500 text-white rounded-lg'
                    : isCircled
                      ? 'border-2 border-orange-500 text-orange-500 rounded-lg'
                      : 'text-gray-900 hover:bg-gray-100 rounded-lg'
                  }
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MedicationList; 