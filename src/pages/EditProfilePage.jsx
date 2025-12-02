import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';

const EditProfilePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.displayName || 'Amy Young');
  const [department, setDepartment] = useState('Technology');
  const [phone, setPhone] = useState('+98 1245560090');
  const [email] = useState(user?.email || 'amyoung@random.com');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (user) {
        await updateProfile(user, { displayName: name });
      }
      // 실제로는 Firestore에 추가 정보도 저장
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">프로필 수정</h1>
      </div>

      <div className="px-4 py-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-4xl relative">
            👤
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xl">
              +
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-600 text-sm mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-2">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-2">Phone no.</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-2">E-Mail</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-4 bg-primary text-white text-center rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;

