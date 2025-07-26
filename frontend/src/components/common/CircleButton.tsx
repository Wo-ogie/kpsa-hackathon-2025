import React from 'react';

interface CircleButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  color?: 'orange' | 'blue' | 'green' | 'gray';
}

const CircleButton: React.FC<CircleButtonProps> = ({
  icon,
  label,
  onClick,
  size = 'md',
  color = 'orange'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  const colorClasses = {
    orange: 'bg-orange-primary',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    gray: 'bg-gray-500'
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full flex items-center justify-center mb-1 hover:opacity-80 transition-opacity`}
      >
        <img src={icon} alt={label} className="w-6 h-6" />
      </button>
      <span className="text-xl text-gray-600">{label}</span>
    </div>
  );
};

export default CircleButton;