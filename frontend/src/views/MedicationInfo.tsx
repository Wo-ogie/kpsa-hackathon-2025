import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  sideEffects?: string;
  interactions?: string;
}

const MedicationInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const familyInfo = location.state as { family_id?: number; family_name?: string } | null;

  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const loadMedicationInfo = async () => {
      try {
        setIsLoading(true);
        const mockData: Medication[] = [
          {
            id: 1,
            name: '다이그린정',
            dosage: '1정',
            frequency: '하루 3회 (아침, 점심, 저녁)',
            duration: '7일',
            instructions: '식후 30분에 복용하세요',
            sideEffects: '구역질, 두통, 어지러움',
            interactions: '혈압약과 함께 복용 시 주의'
          },
          {
            id: 2,
            name: '글루파정',
            dosage: '1정',
            frequency: '하루 2회 (아침, 저녁)',
            duration: '14일',
            instructions: '식전 30분에 복용하세요',
            sideEffects: '복통, 설사',
            interactions: '당뇨약과 함께 복용 시 주의'
          }
        ];
        setMedications(mockData);
      } catch (error) {
        console.error('Failed to load medication info:', error);
        setMedications([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedicationInfo();
  }, [familyInfo]);

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
          <div>
            <h1 className="text-xl font-bold text-gray-900">복약 정보</h1>
            <p className="text-sm text-orange-700">
              {familyInfo?.family_name ? `${familyInfo.family_name}님의 복약 정보` : '내 복약 정보'}
            </p>
          </div>
        </div>
      </div>

      {/* 복약 정보 목록 */}
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {medications.length > 0 ? medications.map((medication) => (
              <div key={medication.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                {/* 약 이름 */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{medication.name}</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* 기본 정보 */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">용량:</span>
                    <span className="text-sm text-gray-900">{medication.dosage}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">복용 횟수:</span>
                    <span className="text-sm text-gray-900">{medication.frequency}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">복용 기간:</span>
                    <span className="text-sm text-gray-900">{medication.duration}</span>
                  </div>
                </div>

                {/* 복용 방법 */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">복용 방법</h4>
                  <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-lg">
                    {medication.instructions}
                  </p>
                </div>

                {/* 부작용 */}
                {medication.sideEffects && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">부작용</h4>
                    <p className="text-sm text-gray-900 bg-yellow-50 p-3 rounded-lg">
                      {medication.sideEffects}
                    </p>
                  </div>
                )}

                {/* 약물 상호작용 */}
                {medication.interactions && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-1">약물 상호작용</h4>
                    <p className="text-sm text-gray-900 bg-red-50 p-3 rounded-lg">
                      {medication.interactions}
                    </p>
                  </div>
                )}
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

export default MedicationInfo; 