import React from 'react';

interface CheckBoxProps {
  id: string;
  checked: boolean;
  onChange: () => void; // id 파라미터 제거
  label: string;
  className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, checked, onChange, label, className = '' }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(); // 부모에서 전달받은 함수 호출
  };

  return (
    <div
      className={`flex text-xl items-center font-bold space-x-3 p-4 bg-gray-100 rounded-full cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange} // input의 onChange도 연결
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border-2 rounded-full cursor-pointer flex items-center justify-center ${checked
            ? 'bg-orange-primary border-orange-primary'
            : 'border-gray-500'
            }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <label htmlFor={id} className="text-gray-900 cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;