import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

const MyPage = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
      </div>

      <div className="px-4 py-6">
        <div className="mb-6">
          <Link to="/profile" className="flex items-center justify-between py-3">
            <span className="text-lg font-semibold text-gray-900">
              {user?.displayName || '조용필'}님&gt;
            </span>
          </Link>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">적립금</p>
            <p className="text-lg font-semibold text-gray-900">0원</p>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">볼락머니</p>
            <p className="text-lg font-semibold text-gray-900">0원</p>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">쿠폰</p>
            <p className="text-lg font-semibold text-gray-900">0장</p>
          </div>
        </div>

        <div className="mb-6">
          <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold mb-4">
            1000원 충전하기 0장
          </button>
          <Link
            to="/reviews"
            className="block w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold text-center"
          >
            작성 가능한 후기 1개 &gt;
          </Link>
        </div>

        <div className="space-y-2">
          <Link
            to="/order/history"
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="text-gray-900">주문내역</span>
            <span className="text-gray-400">&gt;</span>
          </Link>
          <Link
            to="/refunds"
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="text-gray-900">취소/환불 내역</span>
            <span className="text-gray-400">&gt;</span>
          </Link>
          <Link
            to="/favorites"
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="text-gray-900">즐겨찾는 매장</span>
            <span className="text-gray-400">&gt;</span>
          </Link>
          <Link
            to="/customer-service"
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="text-gray-900">고객센터</span>
            <span className="text-gray-400">&gt;</span>
          </Link>
          <Link
            to="/attendance"
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="text-gray-900">출석체크</span>
            <span className="text-gray-400">&gt;</span>
          </Link>
          <Link
            to="/events"
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="text-gray-900">이벤트</span>
            <span className="text-gray-400">&gt;</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <span className="text-gray-900">설정</span>
            <span className="text-gray-400">&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

