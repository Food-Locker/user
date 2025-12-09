import { useState, useEffect } from 'react';
import StoreOrderPage from './pages/StoreOrderPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return <StoreOrderPage manager={manager} onLogout={handleLogout} />;
}

export default App;

