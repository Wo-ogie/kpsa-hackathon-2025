import React from 'react';

interface ToastProps {
  message: string;
  points?: number;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, points, isVisible, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3초 후 자동으로 사라짐

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-lg shadow-lg px-6 py-4 border border-gray-200">
        <div className="flex items-center justify-center">
          <span className="text-gray-900 text-sm">
            {message}
            {points && (
              <>
                <span className="text-orange-500 font-semibold ml-1">
                  {points} P
                </span>
                <span className="text-gray-900 text-sm">획득했어요!</span>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Toast; 