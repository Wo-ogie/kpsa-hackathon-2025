import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { drugAPI } from '../lib/api';
import { Prescription } from '../types/prescription';

const MedicationList = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const { id } = useParams();

  useEffect(() => {
    drugAPI.getPrescriptions(Number(id))
      .then((res: { prescriptions: Prescription[] }) => {
        setPrescriptions(res.prescriptions);
      });
  }, []);


  return (
    <div className="bg-white min-h-screen">

      <div className="p-4 space-y-3">
        {prescriptions.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate('/medication-info', { state: { id: id } })}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.drugs.length}개의 약</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MedicationList; 