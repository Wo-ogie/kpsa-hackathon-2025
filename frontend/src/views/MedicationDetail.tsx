import BackButton from '../components/common/BackButton';

const MedicationDetail = () => {
  const medicationDetails = [
    { label: '허가일', value: '1977년 10월 19일' },
    { label: '단일/복합', value: '단일' },
    { label: '제형', value: '정제' },
    { label: '전문/일반', value: '전문' },
    { label: 'ATC 코드', value: 'A10BB07: OLIPIZIDE' },
    { label: '식약처 분류', value: '당뇨병용제(395)' },
    { label: '저장방법', value: '기밀용기' },
    { label: '포장단위', value: '30정/병' }
  ];

  return (
    <div className="bg-white min-h-screen">

      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">다이그린정</h2>
      </div>

      <div className="m-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-yellow-800">
              현재 복용하고 계신 약물 리스트와 약물 금지약물입니다. 전문가의 상담 필요합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 약 상세 정보 */}
      <div className="p-4 space-y-4">
        {medicationDetails.map((detail, index) => (
          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">{detail.label}</span>
            <span className="text-sm font-medium text-gray-900">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationDetail; 