import { useState } from 'react';
import BackButton from '../components/common/BackButton';

const MedicationRecord = () => {
  const [selectedDate, setSelectedDate] = useState('2025년 7월 25일');
  const [title, setTitle] = useState('더웠던 하루');
  const [content, setContent] = useState(
    '오늘은 정말 더웠어요. 하지만 약을 잘 먹었고, 앱 덕분에 딸아이와 소통도 잘 되었어요. 컨디션도 좋아지고 있어서 기분이 좋습니다.'
  );

  return (
    <div className="bg-white min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <BackButton />
        <h1 className="text-lg font-bold text-gray-900">나의 복약 기록</h1>
        <div className="w-6"></div>
      </div>

      {/* 날짜 선택 */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">날짜</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">{selectedDate}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* 제목 */}
      <div className="p-4 border-b border-gray-100">
        <label className="block text-sm text-gray-600 mb-2">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="제목을 입력해주세요"
        />
      </div>

      {/* 내용 */}
      <div className="p-4 flex-1">
        <label className="block text-sm text-gray-600 mb-2">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          placeholder="상세 내용을 입력해주세요"
        />
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          캘린더 수정
        </button>
      </div>
    </div>
  );
};

export default MedicationRecord; 