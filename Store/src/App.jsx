import { useState, useEffect } from 'react';
import StoreOrderPage from './pages/StoreOrderPage';
import AllOrdersPage from './pages/AllOrdersPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    // localStorage에서 저장된 매장 관리자 정보 확인
    const savedManager = localStorage.getItem('storeManager');
    if (savedManager) {
      try {
        setManager(JSON.parse(savedManager));
      } catch (error) {
        console.error('Error parsing saved manager:', error);
        localStorage.removeItem('storeManager');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (managerData) => {
    setManager(managerData);
  };

  const handleLogout = () => {
    localStorage.removeItem('storeManager');
    setManager(null);
    setShowAllOrders(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-primary text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!manager) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 전체 관리자 계정이면 전체 주문 페이지 표시
  if (manager.isAdmin || manager.role === 'admin') {
    return <AllOrdersPage onBack={null} onLogout={handleLogout} />;
  }

  // 일반 매장 관리자는 매장별 주문 페이지 표시
  return <StoreOrderPage manager={manager} onLogout={handleLogout} onShowAllOrders={null} />;
}

export default App;

