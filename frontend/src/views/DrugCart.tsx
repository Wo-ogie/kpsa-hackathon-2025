import { useLocation, useNavigate } from 'react-router-dom';
import { Medication } from '../types/prescription';
import { useEffect, useState } from 'react';

const DrugCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [medications, setMedications] = useState<Medication[]>([]);
  const familyId = location.search.split('=')[1];

  const handleAddMedication = () => {
    navigate('/add-medicine-search');
  };

  const handleRemoveDrug = (index: number) => {
    console.log('Remove medication at index:', index);
  };

  const handleNext = () => {
    navigate('/naming-prescription?family_id=' + familyId, {
      state: { medications: medications }
    });
  };


  useEffect(() => {
    const medications = localStorage.getItem('medications');
    if (medications) {
      setMedications([...(location.state?.medications || []), ...JSON.parse(medications)]);
    } else {
      setMedications(location.state?.medications || []);
    }

  }, []);

  return (
    <div className="bg-white ">
      <div className="p-4 space-y-4">
        {medications.map((medication, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">

                <div>
                  <h3 className="font-semibold text-gray-900 max-w-[180px]">{medication.name}</h3>
                  <p className="text-sm text-gray-500">
                    {medication.dose_per_time}정 x {medication.times_per_day}회 x {medication.days}일
                  </p>
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