import React from 'react';

interface FamilyNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  currentName: string;
}

const FamilyNameModal: React.FC<FamilyNameModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentName
}) => {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setName(currentName);
  }, [currentName]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border p-6 w-80 mx-4">
        {/* 닫기 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 제목 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            회원의 이름(별명)을<br />
            변경해주세요.
          </h3>
        </div>

        {/* 입력 필드 */}
        <div className="mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-orange-primary text-lg"
            placeholder="엄마"
            autoFocus
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${name.trim()
            ? 'bg-orange-primary text-white hover:bg-orange-600'
            : 'bg-gray-300 text-gray-700 opacity-50 cursor-not-allowed'
            }`}
        >
          변경 완료
        </button>
      </div>
    </div>
  );
};

export default FamilyNameModal; 