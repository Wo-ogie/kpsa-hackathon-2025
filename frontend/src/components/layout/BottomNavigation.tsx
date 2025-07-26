import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: 'add-medicine',
    label: '약 추가',
    icon: '/icons/medication.png',
    path: '/add-medicine'
  },
  {
    id: 'family',
    label: '가족',
    icon: '/icons/family.png',
    path: '/family'
  },
  {
    id: 'home',
    label: '홈',
    icon: '/icons/home.png',
    path: '/main'
  },
  {
    id: 'record',
    label: '기록',
    icon: '/icons/record.png',
    path: '/record'
  },
  {
    id: 'settings',
    label: '설정',
    icon: '/icons/settings.png',
    path: '/settings'
  }
];

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  // 이미지 색상 필터 - orange-primary (#FF6600)에 맞게 조정
  const getIconFilter = (isActive: boolean) => {
    if (isActive) {
      // orange-primary 색상으로 변경 (#FF6600)
      return 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(16deg) brightness(118%) contrast(119%)';
    } else {
      // 회색으로 변경
      return 'brightness(0) saturate(0%) opacity(40%)';
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom flex justify-around items-center py-2 px-4">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.path)}
            className="flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1"
          >
            <div className="text-2xl mb-1">
              <img
                src={item.icon}
                alt={item.label}
                className="w-6 h-6"
                style={{ filter: getIconFilter(isActive) }}
              />
            </div>
            <span className={`text-xs ${isActive ? 'text-orange-primary' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;