import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
      </div>

      <div className="px-4 py-6 space-y-4">
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <span className="text-gray-900">알림설정</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <span className="text-gray-900">위치확인</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={location}
              onChange={(e) => setLocation(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <span className="text-gray-900">언어</span>
          <span className="text-gray-600">KOR &gt;</span>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <span className="text-gray-900">온도</span>
          <span className="text-gray-600">&gt;</span>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <span className="text-gray-900">다크모드</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="py-4 border-b border-gray-200">
          <p className="text-gray-900 mb-1">현재버전</p>
          <p className="text-sm text-gray-600">현재 최신 버전입니다.</p>
          <p className="text-sm text-gray-500 mt-1">현재 버전 1.1.0</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-4 text-red-500 text-center font-semibold"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

