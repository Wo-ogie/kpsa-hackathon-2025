import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const MedicationInfo = () => {
  const navigate = useNavigate();

  const medications = [
    {
      id: 1,
      name: '다이그린정',
      time: '아침, 점심, 저녁',
      hasWarning: true,
      hasDuplicate: false,
      isClickable: true
    },
    {
      id: 2,
      name: '글루파정',
      time: '아침, 저녁',
      hasWarning: false,
      hasDuplicate: true,
      isClickable: false
    }
  ];

  const getStatusIcon = (hasWarning: boolean, hasDuplicate: boolean) => {
    if (hasWarning) {
      return (
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      );
    }
    if (hasDuplicate) {
      return (
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      );
    }
    return (
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <BackButton />
        <h1 className="text-lg font-bold text-gray-900">나의 복약 정보</h1>
        <div className="w-6"></div>
      </div>

      {/* 복약 목록 */}
      <div className="p-4 space-y-4">
        {medications.map((medication) => (
          <div
            key={medication.id}
            onClick={() => medication.isClickable && navigate('/medication-detail')}
            className={`p-4 border border-gray-200 rounded-lg ${medication.isClickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{medication.name}</h3>
              {medication.isClickable && (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">시간</span>
                <span className="text-sm font-medium text-gray-900">{medication.time}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">변경</span>
                <span className="text-sm text-blue-600">수정</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">금지약물</span>
                {getStatusIcon(medication.hasWarning, medication.hasDuplicate)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">중복성분</span>
                {getStatusIcon(medication.hasWarning, medication.hasDuplicate)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationInfo; 