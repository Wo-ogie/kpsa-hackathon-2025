import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { drugAPI } from '../lib/api';



const AddMedicineSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [searchResults, setSearchResults] = useState<string[]>([]);



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
    setShowSearchResults(false);
  };

  const handleMedicineSelect = (medicineId: number) => {
    navigate(`/add-medicine-detail/${medicineId}`);
  };

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

        {/* 검색 결과 */}
        {searchResults.length && searchQuery && (
          <div>
            <p className="text-sm text-gray-600 mb-4">총 검색 결과 {searchResults.length}건</p>

            <div className="space-y-4">
              {searchResults.map((medicine, index) => (
                <div
                  key={index}
                  onClick={() => handleMedicineSelect(index)}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">

                      <div>
                        <h3 className="font-semibold text-gray-900">{medicine}</h3>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>


                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMedicineSearch; 