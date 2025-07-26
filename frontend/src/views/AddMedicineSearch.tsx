import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const AddMedicineSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('아라라정');
  const [showSearchResults, setShowSearchResults] = useState(true);

  const searchResults = [
    {
      id: 1,
      name: '다이그린정',
      englishName: 'Digreenjeong',
      hasProhibitedDrugs: true,
      hasDuplicateIngredients: true,
      image: '/public/images/medication/pill1.png'
    },
    {
      id: 2,
      name: '글루파정',
      englishName: 'Glupajeong',
      hasProhibitedDrugs: false,
      hasDuplicateIngredients: false,
      image: '/public/images/medication/pill2.png'
    }
  ];

  const handleSearch = () => {
    setShowSearchResults(true);
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
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            원하시는 약이 있으신가요?
          </h2>
        </div>

        {/* 검색바 */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="약 이름을 입력하세요"
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 검색 결과 */}
        {showSearchResults && searchQuery && (
          <div>
            <p className="text-sm text-gray-600 mb-4">총 검색 결과 2건</p>

            <div className="space-y-4">
              {searchResults.map((medicine) => (
                <div
                  key={medicine.id}
                  onClick={() => handleMedicineSelect(medicine.id)}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{medicine.name}</h3>
                        <p className="text-sm text-gray-500">{medicine.englishName}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Time change</span>
                      <span className="text-sm text-blue-600">수정</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">병용 금지 약물</span>
                      <div className={`w-3 h-3 rounded-full ${medicine.hasProhibitedDrugs ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">중복 성분</span>
                      <div className={`w-3 h-3 rounded-full ${medicine.hasDuplicateIngredients ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                    </div>
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