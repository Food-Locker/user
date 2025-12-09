import { useState } from 'react';
import { Home, Lock, User, CheckCircle2, X } from 'lucide-react';
import { api } from '../lib/mongodb';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [managerInfo, setManagerInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await api.login(username, password);
      if (result.success) {
        // 로그인 성공 - 매장 정보 저장
        setManagerInfo(result.manager);
        setShowSuccessModal(true);
        // 팝업 표시 후 2초 뒤에 실제 로그인 처리
        setTimeout(() => {
          localStorage.setItem('storeManager', JSON.stringify(result.manager));
          onLogin(result.manager);
        }, 2000);
      }
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 로고 및 타이틀 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Home size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Food Locker Store</h1>
          <p className="text-gray-600">매장 주문 관리 시스템</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-soft p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* 아이디 입력 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                아이디
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="아이디를 입력하세요"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>

        {/* 안내 문구 */}
        <p className="text-center text-sm text-gray-500 mt-6">
          매장 관리자만 접근 가능합니다
        </p>
      </div>

      {/* 로그인 성공 팝업 */}
      {showSuccessModal && managerInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              {/* 성공 아이콘 */}
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              
              {/* 성공 메시지 */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인 성공!</h2>
              <p className="text-gray-600 mb-6">매장 관리 시스템에 접속합니다</p>
              
              {/* 매장 정보 */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 mb-6 border-2 border-primary/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Home size={20} className="text-primary" />
                  <p className="text-sm font-semibold text-gray-600">매장 정보</p>
                </div>
                <p className="text-xl font-bold text-primary mb-1">
                  {managerInfo.brandName || '매장'}
                </p>
                <p className="text-sm text-gray-600">
                  {managerInfo.stadiumName || '야구장'}
                </p>
              </div>
              
              {/* 로딩 인디케이터 */}
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

