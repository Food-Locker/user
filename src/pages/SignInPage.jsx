import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 py-6 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex-1 text-center mr-8">로그인</h1>
      </div>

      <div className="px-6 pb-24">
        <form onSubmit={handleEmailSignIn} className="space-y-4 mb-6">
          <div>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <Link to="/forgot-password" className="text-sm text-gray-500 block text-left">
            비밀번호를 잊으셨나요?
          </Link>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-lg font-bold text-lg disabled:opacity-50 mt-6"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-center text-gray-500 mb-4">소셜 로그인</p>
          <div className="flex justify-center gap-4">
            {/* Naver */}
            <button className="w-14 h-14 bg-[#03C75A] rounded-full flex items-center justify-center text-white text-xl font-bold">
              N
            </button>
            {/* Google */}
            <button
              onClick={handleGoogleSignIn}
              className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700"
            >
              G
            </button>
            {/* Kakao */}
            <button className="w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center text-gray-900 text-xs font-bold">
              TALK
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link to="/signup" className="text-gray-500">
            계정이 없으신가요?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

