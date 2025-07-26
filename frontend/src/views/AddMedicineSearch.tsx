import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { drugAPI } from '../lib/api';
import Button from '../components/common/Button';
import { Medication } from '../types/prescription';



const AddMedicineSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [carts, setCarts] = useState<Medication[]>([]);

  useEffect(() => {
    const medications = localStorage.getItem('medications');
    if (medications) {
      setCarts(JSON.parse(medications));
    }
  }, []);


  const changeSearchQuery = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    drugAPI.searchDrugNames(e.target.value)
      .then((res) => {
        console.log('res', res.drug_names);
        setSearchResults(res.drug_names);
      });
  }, 300);


  const handleSearch = () => {
    console.log('searchQuery', searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };


  // const handleCart = (medicine: string) => {
  // const medicineObj = { name: medicine, dose_per_time: , times_per_day: 1, days: 1 };
  // const existingIndex = carts.findIndex(item => item.name === medicine);

  // if (existingIndex !== -1) {
  //   // 이미 카트에 있으면 제거
  //   setCarts(carts.filter((_, index) => index !== existingIndex));
  // } else {
  //   // 카트에 없으면 추가 (중복 방지)
  //   setCarts(prev => [...prev, medicineObj]);
  // }
  // };

  return (
    <div className="bg-white min-h-screen">

      <div className="p-4">

        {/* 검색바 */}
        <div className="relative mb-6">
          <input
            type="text"
            onChange={changeSearchQuery}
            className="w-full p-3 pr-20 border border-gray-300 rounded-full font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="원하시는 약이 있으신가요?"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={handleSearch}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {searchResults.length > 0 && searchQuery && (
          <div >
            <p className="text-center text-lg font-bold text-gray-600 mb-4">총 검색 결과 <span className='text-orange-primary'>{searchResults.length}건</span></p>
            <div className="space-y-4">
              {searchResults.map((medicine, index) => (
                <div
                  key={index}
                  onClick={() => navigate('/set-medicine-detail', { state: { medicineName: medicine } })}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors border-gray-200 hover:bg-gray-50`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">

                      <div>
                        <h3 className="font-semibold text-gray-900">{medicine}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


      </div>
      <div className='fixed bottom-20 left-0 right-0 p-4'>
        <Button
          onClick={() => navigate('/drug-cart')}
          variant="primary"
          size="lg"
          fullWidth
        >
          담은 약 {carts.length}개 보러가기
        </Button>
      </div>
    </div>
  );
};

export default AddMedicineSearch; 