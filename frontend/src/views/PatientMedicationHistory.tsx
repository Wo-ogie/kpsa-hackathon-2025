import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar } from '../components/ui/calendar';
import { drugAPI } from '../lib/api';
import DailySchedule from '../components/schedule/DailySchedule';

interface Prescription {
  id: number;
  name: string;
  startDate?: string;
  totalDays?: number;
  color?: string;
}

const PatientMedicationHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const familyInfo = location.state;

  const [medicationLists, setMedicationLists] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showSchedule, setShowSchedule] = useState(false);
  // 처방전별 색상 배열
  const prescriptionColors = [
    '#f97316', // orange-500
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#8b5cf6', // violet-500
    '#ef4444', // red-500
    '#f59e0b', // amber-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
  ];

  useEffect(() => {
    const loadMedicationData = async () => {
      try {
        setIsLoading(true);
        if (familyInfo?.family_id) {
          // Load family member's medication data
          const response = await drugAPI.getPrescriptions(familyInfo.family_id);
          // 처방전 데이터에 시작일과 총 일자 계산 추가
          const processedPrescriptions = response.prescriptions.map((prescription: any, index: number) => {
            const startDate = prescription.medication_start_date;
            const totalDays = prescription.drugs?.reduce((total: number, drug: any) => {
              const count = drug.count || 0;
              return total + (count > 0 ? count : 0); // 마이너스인 경우 무시
            }, 0) || 0;

            return {
              ...prescription,
              startDate,
              totalDays,
              color: prescriptionColors[index % prescriptionColors.length]
            };
          });
          setMedicationLists(processedPrescriptions);
        } else {
          const response = await drugAPI.getMyPrescriptions();
          // 처방전 데이터에 시작일과 총 일자 계산 추가
          const processedPrescriptions = response.prescriptions.map((prescription: any, index: number) => {
            const startDate = prescription.medication_start_date;
            const totalDays = prescription.drugs?.reduce((total: number, drug: any) => {
              const count = drug.count || 0;
              return total + (count > 0 ? count : 0); // 마이너스인 경우 무시
            }, 0) || 0;

            return {
              ...prescription,
              startDate,
              totalDays,
              color: prescriptionColors[index % prescriptionColors.length]
            };
          });
          setMedicationLists(processedPrescriptions);
        }
      } catch (error) {
        console.error('Failed to load medication data:', error);
        // Fallback to static data if API fails
        setMedicationLists([
          { id: 1, name: '안과 약', color: prescriptionColors[0] } as Prescription,
          { id: 2, name: '정형외과 약', color: prescriptionColors[1] } as Prescription,
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicationData();
  }, [familyInfo]);

  return (
    <div className="min-h-screen bg-white mb-20">
      {/* 환자용 헤더 */}
      <div className="p-4 bg-orange-50 border-b border-orange-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">복약 기록</h1>
            <p className="text-sm text-orange-700">
              {familyInfo?.family_name ? `${familyInfo.family_name}님의 복약 정보` : '내 복약 정보'}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 복약 캘린더 섹션 - 환자용으로 간소화 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">복약 캘린더</h2>

        <div className="flex justify-center mb-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setShowSchedule(true);
              }
            }}
            disabled={{ before: new Date() }}
            className="rounded-md border bg-white shadow-sm"
            modifiers={{
              ...medicationLists.reduce((acc, prescription, index) => {
                if (!prescription.startDate) return acc;

                const startDate = new Date(prescription.startDate);
                const totalDays = prescription.totalDays || 0;
                const dates = [];

                for (let i = 0; i < totalDays; i++) {
                  const date = new Date(startDate);
                  date.setDate(startDate.getDate() + i);
                  dates.push(date);
                }

                return {
                  ...acc,
                  [`medication_${index}`]: dates
                };
              }, {})
            }}
            modifiersStyles={{
              ...medicationLists.reduce((acc, prescription, index) => ({
                ...acc,
                [`medication_${index}`]: {
                  backgroundColor: prescription.color || '#f97316',
                  color: 'white'
                }
              }), {})
            }}
            classNames={{
              day_selected: "bg-orange-500 text-white font-medium",
              day_today: "bg-orange-100 font-bold",
              day: "h-12 w-12 p-0 font-normal text-gray-900 cursor-pointer hover:bg-gray-100",
              head_cell: "text-gray-500 font-medium",
              nav_button: "h-7 w-7 bg-transparent p-0 ",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              caption: "flex justify-center py-2 relative items-center",
              day_range_start: "bg-orange-500 text-white rounded-l-full",
              day_range_end: "bg-orange-500 text-white rounded-r-full",
              day_range_middle: "bg-orange-500 text-white",
            }}
          />
        </div>

        {/* 오늘의 복약 정보 */}
        <div className="bg-orange-50 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">오늘의 복약</h3>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} ({new Date().toLocaleDateString('ko-KR', { weekday: 'long' })})
          </div>
          <div className="mt-2 text-orange-700 font-medium">
            복용해야 할 약: {medicationLists.length}개
          </div>
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

      {/* 복약 리스트 섹션 - 환자용으로 간소화 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">내 복약 목록</h2>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {medicationLists.length > 0 ? medicationLists.map((list) => (
              <div
                key={list.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">{list.name}</div>
                  <div className="text-sm text-gray-600">
                    시작일: {list.startDate ? new Date(list.startDate).toLocaleDateString('ko-KR') : '미정'} |
                    총 {list.totalDays}일
                  </div>
                </div>
                <div className="ml-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: list.color || '#f97316' }}
                  ></div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                {familyInfo?.family_name ?
                  `${familyInfo.family_name}님의 복약 정보가 없습니다.` :
                  '복약 정보가 없습니다.'
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMedicationHistory; 