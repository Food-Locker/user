import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const ProfilePage = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">프로필</h1>
      </div>

      <div className="px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-4xl">
            👤
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-600">Name</p>
            <p className="text-lg font-semibold text-gray-900">
              {user?.displayName || 'Amy Young'}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-gray-600 text-sm mb-1">Department</p>
            <p className="text-gray-900 font-medium">Technology</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Phone no.</p>
            <p className="text-gray-900 font-medium">+98 1245560090</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">E-Mail</p>
            <p className="text-gray-900 font-medium">
              {user?.email || 'amyoung@random.com'}
            </p>
          </div>
        </div>

        <Link
          to="/profile/edit"
          className="block w-full py-4 bg-primary text-white text-center rounded-lg font-semibold"
        >
          프로필 수정하기
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;

