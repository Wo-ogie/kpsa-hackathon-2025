import { useState } from 'react';

const CheckboxLayout = () => {
  const [checkedItems, setCheckedItems] = useState({
    essential: false,
    optional: false
  });

  const handleCheckboxChange = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const allChecked = Object.values(checkedItems).every(checked => checked);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <button className="p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 제목 */}
      <div className="text-center mb-8">
        <h2 className="text-lg font-medium text-gray-900">
          오늘 점심 약 복용하셨나요?
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          해당 약 복용량이 각각 있음
        </p>
      </div>

      {/* 체크박스 섹션 */}
      <div className="space-y-4 mb-8">
        {/* 필수약 체크박스 */}
        <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
          <div className="relative">
            <input
              type="checkbox"
              id="essential"
              checked={checkedItems.essential}
              onChange={() => handleCheckboxChange('essential')}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center ${checkedItems.essential
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300 bg-white'
                }`}
              onClick={() => handleCheckboxChange('essential')}
            >
              {checkedItems.essential && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <label htmlFor="essential" className="text-gray-900 cursor-pointer">
            필수약
          </label>
        </div>

        {/* 당뇨병약 체크박스 */}
        <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
          <div className="relative">
            <input
              type="checkbox"
              id="optional"
              checked={checkedItems.optional}
              onChange={() => handleCheckboxChange('optional')}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center ${checkedItems.optional
                ? 'bg-blue-500 border-blue-500'
                : 'border-gray-300 bg-white'
                }`}
              onClick={() => handleCheckboxChange('optional')}
            >
              {checkedItems.optional && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <label htmlFor="optional" className="text-gray-900 cursor-pointer">
            당뇨병약
          </label>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="space-y-3">
        <button
          disabled={!allChecked}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${allChecked
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          복용 완료하기
        </button>

        <p className="text-xs text-gray-500 text-center">
          복용 완료시 다음 주에 픔혈양강에 내재
        </p>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex justify-center space-x-8 mt-6 pt-4 border-t border-gray-200">
        <button className="p-2 text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l5.293 5.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>
        <button className="p-2 text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        </button>
        <button className="p-2 text-blue-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="p-2 text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CheckboxLayout;