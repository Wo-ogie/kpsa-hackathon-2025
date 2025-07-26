import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '../components/ui/calendar';
import { DateRange } from 'react-day-picker';
import DailySchedule from '../components/schedule/DailySchedule';

const MedicationHistory: React.FC = () => {
  const navigate = useNavigate();
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 25)); // 7월 25일

  // 날짜 범위 상태 (29, 30, 31일을 하이라이트하기 위해) - 읽기 전용
  const dateRange: DateRange | undefined = {
    from: new Date(2025, 6, 29), // 7월 29일
    to: new Date(2025, 6, 31),   // 7월 31일
  };

  // 복약 리스트 데이터
  const medicationLists = [
    { id: 1, name: '안과 약' },
    { id: 2, name: '정형외과 약' },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* 복약 리스트 섹션 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">복약 리스트</h2>
        <div className="space-y-3">
          {medicationLists.map((list) => (
            <div
              key={list.id}
              onClick={() => navigate(`/medication-detail/${list.id}`)}
              className="flex items-center justify-between font-bold p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900">{list.name}</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* 복약 캘린더 섹션 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">복약 캘린더</h2>

        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(dateRange) => {
              if (dateRange?.from) {
                setSelectedDate(dateRange.from);
                setShowSchedule(true);
              }
            }}
            disabled={{ before: new Date() }}
            className="rounded-md border bg-white shadow-sm"
            classNames={{
              day_selected: "bg-orange-500 text-white rounded-full font-medium",
              day_today: "bg-orange-100 font-bold",
              day: "h-12 w-12 p-0 font-normal text-gray-900 cursor-pointer hover:bg-gray-100",
              head_cell: "text-gray-500 font-medium",
              nav_button: "h-7 w-7 bg-transparent p-0 ",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              caption: "flex justify-center py-2 relative items-center",
              day_range_start: "bg-orange-500 text-white",
              day_range_end: "bg-orange-500 text-white",
              day_range_middle: "bg-orange-500 text-white",
            }}
          />
        </div>

        {showSchedule && (
          <DailySchedule
            selectedDate={selectedDate}
            onClose={() => setShowSchedule(false)}
            onPreviousDay={() => {
              const prevDate = new Date(selectedDate);
              prevDate.setDate(prevDate.getDate() - 1);
              setSelectedDate(prevDate);
            }}
            onNextDay={() => {
              const nextDate = new Date(selectedDate);
              nextDate.setDate(nextDate.getDate() + 1);
              setSelectedDate(nextDate);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MedicationHistory; 