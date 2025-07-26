import { useState } from 'react';
import BackButton from '../components/common/BackButton';
import CheckBox from '../components/common/CheckBox';

const Dose = () => {
  const [checkedItems, setCheckedItems] = useState({
    essential: false,
    optional: false
  });

  const handleCheckboxChange = (item: 'essential' | 'optional') => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const allChecked = Object.values(checkedItems).every(checked => checked);

  return (
    <div className='flex flex-col'>
      <BackButton />
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-900">
          오늘 점심 약 복용하셨나요?
        </h2>
      </div>

      <div className="space-y-4">
        <CheckBox
          id="essential"
          checked={checkedItems.essential}
          onChange={() => handleCheckboxChange('essential')}
          label="필수약"
        />

        <CheckBox
          id="optional"
          checked={checkedItems.optional}
          onChange={() => handleCheckboxChange('optional')}
          label="당뇨병약"
        />
      </div>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[412px] px-4 z-50">
        <div className="space-y-3">
          <button
            disabled={!allChecked}
            className={`w-full font-bold  py-3 px-4 rounded-full text-xl transition-colors ${allChecked
              ? 'bg-orange-primary text-white hover:bg-orange-primary'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            복용 완료하기
          </button>
        </div>
      </div>


    </div >
  );
};

export default Dose;