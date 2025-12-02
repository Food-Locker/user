import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const LockerInfoPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [lockerInfo, setLockerInfo] = useState(null);

  useEffect(() => {
    if (orderId) {
      const stored = localStorage.getItem(`order_${orderId}`);
      if (stored) {
        const data = JSON.parse(stored);
        setOrderData(data);

        // 락커 정보 시뮬레이션 (실제로는 서버에서 받아옴)
        // 조리 완료 후 락커 배정 시뮬레이션
        setTimeout(() => {
          setLockerInfo({
            lockerNumber: Math.floor(Math.random() * 100) + 1,
            password: Math.floor(1000 + Math.random() * 9000), // 4자리 비밀번호
            qrCode: `LOCKER-${orderId}`,
            location: '1층 입구 옆',
            status: 'ready', // ready, preparing, completed
          });
        }, 2000);
      }
    }
  }, [orderId]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-white pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">주문 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">락커 정보</h1>
      </div>

      <div className="px-4 py-6">
        {!lockerInfo ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 mb-2">조리 중입니다...</p>
            <p className="text-sm text-gray-500">락커 배정 대기 중</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                락커 #{lockerInfo.lockerNumber}
              </h2>
              <p className="text-gray-600">위치: {lockerInfo.location}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">락커 비밀번호</h3>
              <div className="text-4xl font-bold text-center text-primary mb-2">
                {lockerInfo.password}
              </div>
              <p className="text-sm text-gray-500 text-center">
                위 비밀번호를 락커에 입력하세요
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-4">QR 코드</h3>
              <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-xs text-gray-500">{lockerInfo.qrCode}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                QR 코드를 락커 스캐너에 비춰주세요
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">안내사항</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 락커는 주문 완료 후 10-15분 내에 배정됩니다</li>
                <li>• 음식이 준비되면 알림을 받게 됩니다</li>
                <li>• 락커 위치는 앱 내 지도에서 확인할 수 있습니다</li>
              </ul>
            </div>

            <Link
              to="/home"
              className="block w-full py-4 bg-primary text-white text-center rounded-lg font-semibold"
            >
              홈으로 돌아가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LockerInfoPage;

