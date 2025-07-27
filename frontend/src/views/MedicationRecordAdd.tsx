import { useState } from 'react';
import BackButton from '../components/common/BackButton';

const MedicationRecordAdd = () => {
  const [selectedDate] = useState('2025년 7월 26일');
  const [isPeriod, setIsPeriod] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAlarmDropdown, setShowAlarmDropdown] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState('하루 전(13:00)');

  const alarmOptions = [
    '하루 전(13:00)',
    '이틀 전(13:00)',
    '일주일 전(13:00)'
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <BackButton />
        <h1 className="text-lg font-bold text-gray-900">나의 복약 기록</h1>
        <div className="w-6"></div>
      </div>

      {/* 제목 */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">캘린더 일정 추가</h2>
      </div>

      {/* 날짜 선택 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">날짜</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{selectedDate}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPeriod}
            onChange={(e) => setIsPeriod(e.target.checked)}
            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-600">기간으로 설정하기</span>
        </label>
      </div>

      {/* 제목 입력 */}
      <div className="p-4 border-b border-gray-100">
        <label className="block text-sm text-gray-600 mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="제목을 입력해주세요."
        />
      </div>

      {/* 내용 입력 */}
      <div className="p-4 border-b border-gray-100">
        <label className="block text-sm text-gray-600 mb-2">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          placeholder="상세 내용을 입력해주세요."
        />
      </div>

      {/* 미리 알람 */}
      <div className="p-4 border-b border-gray-100">
        <label className="block text-sm text-gray-600 mb-2">미리 알람</label>
        <div className="relative">
          <button
            onClick={() => setShowAlarmDropdown(!showAlarmDropdown)}
            className="w-full p-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {selectedAlarm}
          </button>
          {showAlarmDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {alarmOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedAlarm(option);
                    setShowAlarmDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          캘린더 일정 추가
        </button>
      </div>
    </div>
  );
};

export default MedicationRecordAdd; 