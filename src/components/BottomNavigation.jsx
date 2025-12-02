import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, ShoppingCart, Receipt, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/home', icon: Home, label: '홈' },
    { path: '/wishlist', icon: Heart, label: '관심목록' },
    { path: '/cart', icon: ShoppingCart, label: '장바구니' },
    { path: '/order/history', icon: Receipt, label: '결제내역' },
    { path: '/mypage', icon: User, label: '마이페이지' },
  ];

  const isActive = (path) => {
    if (path === '/home') {
      return currentPath === '/home' || currentPath === '/search' || currentPath === '/order';
    }
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50 mobile-container">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                active ? 'text-primary' : 'text-gray-500'
              }`}
            >
              <Icon size={24} className={active ? 'text-primary' : 'text-gray-500'} />
              <span className={`text-xs mt-1 ${active ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;

