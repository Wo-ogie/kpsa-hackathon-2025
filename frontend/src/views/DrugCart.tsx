import { useLocation, useNavigate } from 'react-router-dom';
import { Medication } from '../types/prescription';

const DrugCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const medications: Medication[] = location.state?.medications || [];
  const handleAddMedication = () => {
    navigate('/add-medicine');
  };

  const handleRemoveDrug = (index: number) => {
    // medications 배열을 직접 수정하는 대신 상태 업데이트 로직 필요
    console.log('Remove medication at index:', index);
  };

  const handleNext = () => {
    console.log('medications', medications)
    navigate('/naming-prescription', {
      state: { medications: medications }
    });
  };

  const getStatusIcon = (hasWarning: boolean) => {
    if (hasWarning) {
      return (
        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
      );
    }
    return (
      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
    );
  };

  return (
    <div className="bg-white ">
      <div className="p-4 space-y-4">
        {medications.map((medication, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">

                <div>
                  <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                  <p className="text-sm text-gray-500">{medication.ingredient}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 bg-gray-100 px-4 py-1 rounded"> 변경</span>
                <button
                  onClick={() => handleRemoveDrug(index)}
                  className="w-6 h-6 s"
                >
                  <img src="/icons/close_circle.png" alt="delete" className="w-6 h-6" />
                </button>
              </div>
            </div>

          </div>
        ))}

      </div>
      <div className="fixed bottom-20 left-0 right-0 p-4">
        <div className="flex space-x-3">
          <button
            onClick={handleAddMedication}
            className="flex-1 rounded-full bg-orange-200 text-orange-700 py-3 px-4  font-medium hover:bg-orange-300 transition-colors"
          >
            약 추가하기
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-orange-500 text-white py-3 px-4  rounded-full font-medium hover:bg-orange-600 transition-colors"
          >
            다음으로
          </button>
        </div>
      </div>

    </div>
  );
};

export default DrugCart; 