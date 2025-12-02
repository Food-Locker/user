import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (user) {
          navigate('/home');
        } else {
          navigate('/signin');
        }
      }, 2000);
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Food Locker</h1>
        <div className="w-32 h-32 mx-auto mb-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white text-6xl">⚾</span>
        </div>
        <p className="text-gray-600">야구장 음식 주문 서비스</p>
      </div>
    </div>
  );
};

export default SplashPage;

