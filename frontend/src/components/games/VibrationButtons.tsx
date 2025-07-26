export default function VibrationButtons() {
  // 진동 함수
  const vibrate = (pattern) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    } else {
      console.log('이 기기는 진동을 지원하지 않습니다.');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          진동 효과 버튼들
        </h1>

        <div className="space-y-4">
          {/* 짧은 진동 */}
          <button
            onClick={() => vibrate(100)}
            className="w-full py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
          >
            짧은 진동 (100ms)
          </button>

          {/* 긴 진동 */}
          <button
            onClick={() => vibrate(500)}
            className="w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
          >
            긴 진동 (500ms)
          </button>

          {/* 패턴 진동 */}
          <button
            onClick={() => vibrate([100, 50, 100, 50, 100])}
            className="w-full py-4 px-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
          >
            패턴 진동 (삐삐삐)
          </button>

          {/* SOS 패턴 */}
          <button
            onClick={() => vibrate([100, 50, 100, 50, 100, 100, 200, 50, 200, 50, 200, 100, 100, 50, 100, 50, 100])}
            className="w-full py-4 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
          >
            SOS 패턴 진동
          </button>

          {/* 진동 정지 */}
          <button
            onClick={() => vibrate(0)}
            className="w-full py-4 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
          >
            진동 정지
          </button>
        </div>

        <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>참고:</strong> 진동 효과는 모바일 기기에서만 작동합니다.
            데스크탑에서는 콘솔에 메시지가 출력됩니다.
          </p>
        </div>

        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">진동 패턴 설명:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 숫자 하나: 해당 시간(ms)만큼 진동</li>
            <li>• 배열: [진동, 멈춤, 진동, 멈춤...] 패턴</li>
            <li>• 0: 진동 정지</li>
          </ul>
        </div>
      </div>
    </div>
  );
}