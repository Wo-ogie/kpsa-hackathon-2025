import React from 'react';
import { format } from 'date-fns';

interface MedicationSchedule {
  name: string;
  times: {
    morning: boolean;
    lunch: boolean;
    dinner: boolean;
  };
}

interface Schedule {
  title: string;
  dateRange: string;
}

interface DailyScheduleProps {
  selectedDate: Date;
  onClose: () => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

const DailySchedule: React.FC<DailyScheduleProps> = ({
  selectedDate,
  onClose,
  onPreviousDay,
  onNextDay,
}) => {
  // 예시 데이터
  const medicationSchedules: MedicationSchedule[] = [
    {
      name: "종합 병원 약",
      times: {
        morning: true,
        lunch: true,
        dinner: true,
      },
    },
    {
      name: "정형외과 약",
      times: {
        morning: true,
        lunch: true,
        dinner: true,
      },
    },
  ];

  const upcomingSchedule: Schedule = {
    title: "정형외과 방문",
    dateRange: "2025년 7월 29일 - 7월 31일",
  };

  const formatDate = (date: Date) => {
    return format(date, 'yyyy년 M월 d일');
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">일일 스케줄</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 날짜 네비게이션 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onPreviousDay}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg font-semibold text-gray-900">
            {formatDate(selectedDate)}
            {isToday(selectedDate) && (
              <span className="ml-2 text-sm text-orange-500 font-medium">(오늘)</span>
            )}
          </span>
          <button
            onClick={onNextDay}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 약 복용 스케줄 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">약 복용 스케줄</h3>
          <div className="space-y-4">
            {medicationSchedules.map((schedule, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">{schedule.name}</h4>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">아침</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${schedule.times.morning ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                      {schedule.times.morning && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">점심</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${schedule.times.lunch ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                      {schedule.times.lunch && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">저녁</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${schedule.times.dinner ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                      {schedule.times.dinner && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 예정된 일정 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">예정된 일정</h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-2">{upcomingSchedule.dateRange}</div>
            <div className="font-medium text-gray-900">{upcomingSchedule.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySchedule; 