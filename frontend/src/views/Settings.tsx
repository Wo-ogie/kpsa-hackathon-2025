import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.clear();
    navigate('/');
  };

  const handleChangeUserType = () => {
    // 사용자 타입 변경 (보호자 ↔ 어르신)
    const currentIsGuardian = localStorage.getItem('is_guardian') === 'true';
    localStorage.setItem('is_guardian', (!currentIsGuardian).toString());
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="p-4 bg-orange-50 border-b border-orange-100">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">설정</h1>
        </div>
      </div>

      {/* 설정 메뉴 */}
      <div className="p-4 space-y-4">
        {/* 사용자 정보 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">사용자 정보</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div>닉네임: {localStorage.getItem('nickname') || '사용자'}</div>
            <div>포인트: {localStorage.getItem('point') || '0'}P</div>
            <div>계정 유형: {localStorage.getItem('is_guardian') === 'true' ? '보호자' : '어르신'}</div>
          </div>
        </div>

        {/* 계정 설정 */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">계정 설정</h2>
          </div>

          <div className="divide-y divide-gray-100">
            <button
              onClick={handleChangeUserType}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">계정 유형 변경</div>
                  <div className="text-sm text-gray-500">
                    {localStorage.getItem('is_guardian') === 'true' ? '어르신 모드로 변경' : '보호자 모드로 변경'}
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => navigate('/about')}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">앱 정보</div>
                  <div className="text-sm text-gray-500">버전 및 개발자 정보</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 로그아웃 */}
        <button
          onClick={handleLogout}
          className="w-full p-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default Settings; 