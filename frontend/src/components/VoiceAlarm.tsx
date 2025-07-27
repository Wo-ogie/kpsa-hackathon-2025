import { useState } from 'react';

const VoiceAlarm = () => {
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  const playAlarmSound = () => {
    // 오디오 파일 재생
    const audio = new Audio('/alarm-sound.mp3');
    audio.play();

    // 또는 TTS (Text-to-Speech) 사용
    const utterance = new SpeechSynthesisUtterance('알람이 울렸습니다!');
    utterance.lang = 'ko-KR';
    speechSynthesis.speak(utterance);
  };

  const setAlarm = (seconds) => {
    setIsAlarmSet(true);
    setTimeout(() => {
      playAlarmSound();
      setIsAlarmSet(false);
    }, seconds * 1000);
  };

  return (
    <div>
      <button onClick={() => setAlarm(5)}>
        5초 후 알람 설정
      </button>
      <p>{isAlarmSet ? '알람이 설정되었습니다...' : '알람 대기 중'}</p>
    </div>
  );
};

export default VoiceAlarm;