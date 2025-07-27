import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar } from '../components/ui/calendar';
import DailySchedule from '../components/schedule/DailySchedule';
import { drugAPI } from '../lib/api';

import { Prescription } from '../types/prescription';

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

const MedicationHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 25)); // 7월 25일
  const [medicationLists, setMedicationLists] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  // Family member info from navigation state
  const familyInfo = location.state as { family_id?: number; family_name?: string } | null;

  // Load medication data based on whether it's for family member or current user
  useEffect(() => {
    const loadMedicationData = async () => {
      try {
        setIsLoading(true);
        if (familyInfo?.family_id) {
          // Load family member's medication data
          const response = await drugAPI.getPrescriptions(familyInfo.family_id);
          // 처방전 데이터에 색상 추가
          const processedPrescriptions = response.prescriptions.map((prescription: any, index: number) => {
            return {
              ...prescription,
              color: prescriptionColors[index % prescriptionColors.length]
            };
          });
          setMedicationLists(processedPrescriptions);
        } else {
          const response = await drugAPI.getMyPrescriptions();
          // 처방전 데이터에 색상 추가
          const processedPrescriptions = response.prescriptions.map((prescription: any, index: number) => {
            return {
              ...prescription,
              color: prescriptionColors[index % prescriptionColors.length]
            };
          });
          setMedicationLists(processedPrescriptions);
        }
      } catch (error) {
        console.error('Failed to load medication data:', error);
        // Fallback to static data if API fails
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicationData();
  }, [familyInfo]);


  return (
    <div className="min-h-screen bg-white mb-20">
      {/* Header with family member name if applicable */}
      {familyInfo?.family_name && (
        <div className="p-4 bg-orange-50 border-b border-orange-100">
          <p className="text-sm text-orange-700 font-medium">
            {familyInfo.family_name}님의 복약 정보
          </p>
        </div>
      )}

      {/* 복약 리스트 섹션 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">복약 리스트</h2>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {medicationLists.length > 0 ? medicationLists.map((list) => (
              <div
                key={list.id}
                onClick={() => navigate(`/medication-detail/${list.id}`)}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-bold text-gray-900 mb-1">{list.name}</div>
                  <div className="text-sm text-gray-600">
                    시작일: {list.medication_start_date ? new Date(list.medication_start_date).toLocaleDateString('ko-KR') : '미정'} |
                    총 {list.drugs.reduce((total: number, drug: any) => total + (drug.count || 0), 0)}일
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: list.color || '#f97316' }}
                  ></div>
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

      {/* 복약 캘린더 섹션 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">복약 캘린더</h2>

        <div className="flex justify-center">
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
                if (!prescription.medication_start_date) return acc;

                const startDate = new Date(prescription.medication_start_date);
                const totalDays = prescription.drugs?.reduce((total: number, drug: any) => {
                  const count = drug.count || 0;
                  return total + (count > 0 ? count : 0); // 마이너스인 경우 무시
                }, 0) || 0;

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