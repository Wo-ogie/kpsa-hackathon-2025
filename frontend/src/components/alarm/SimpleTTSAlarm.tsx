import { useState } from 'react';
import { Volume2 } from 'lucide-react';

// Toast 컴포넌트를 직접 정의
const Toast = ({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) => {
  return (
    <div className="fixed top-4 right-4 bg-red-500 w-[90%] text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity"
      onClick={onClose}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      {message}
    </div>
  );
};


const SimpleTTSAlarm = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // TTS 재생 함수
  const playTTS = async () => {
    setToastMessage("약 드실 시간입니다");
    setShowToast(true); // 클릭하자마자 토스트 표시

    try {
      setIsLoading(true);

      // 기존 음성 중지
      speechSynthesis.cancel();

      // // 음성 목록이 로드될 때까지 대기
      // await new Promise((resolve) => {
      //   const checkVoices = () => {
      //     const voices = speechSynthesis.getVoices();
      //     if (voices.length > 0) {
      //       resolve();
      //     } else {
      //       setTimeout(checkVoices, 100);
      //     }
      //   };
      //   checkVoices();
      // });

      const utterance = new SpeechSynthesisUtterance('어르신 약드실 시간입니다');
      utterance.lang = 'ko-KR';
      utterance.rate = 0.6; // 천천히
      utterance.volume = 1;
      utterance.pitch = 1;

      // 한국어 음성 선택
      const voices = speechSynthesis.getVoices();
      const koreanVoice = voices.find(voice =>
        voice.lang.includes('ko') || voice.lang.includes('KR')
      );

      if (koreanVoice) {
        utterance.voice = koreanVoice;
      }

      // 음성 재생 완료 처리
      utterance.onend = () => {
        setIsLoading(false);

        setShowToast(true);
      };

      utterance.onerror = (event) => {
        setIsLoading(false);
        setToastMessage("음성 재생 중 오류가 발생했습니다");
        setShowToast(true);
        console.error('TTS Error:', event);
      };

      speechSynthesis.speak(utterance);
      setLastAlarmTime(new Date());

    } catch (error) {
      setIsLoading(false);
      setToastMessage("음성 재생에 실패했습니다");
      setShowToast(true);
      console.error('TTS Error:', error);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={playTTS}
          disabled={isLoading}
          className={`${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600'
            } text-white p-4 rounded-full shadow-lg transition-colors flex items-center justify-center`}
          title="복약 알람"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
          ) : (
            <Volume2 size={24} />
          )}
        </button>

      </div>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default SimpleTTSAlarm;