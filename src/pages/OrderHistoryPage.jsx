import { useState, useEffect } from 'react';
import { Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // localStorage에서 주문 내역 가져오기
    const orderKeys = Object.keys(localStorage).filter(key => key.startsWith('order_'));
    const orderList = orderKeys.map(key => {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch {
        return null;
      }
    }).filter(Boolean);
    
    setOrders(orderList);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">주문 내역</h1>
      </div>

      <div className="px-4 py-6">
        {orders.length === 0 ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-sm w-full">
              <div className="mb-6 flex justify-center">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                  <Receipt size={64} className="text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">주문 내역이 없습니다</h2>
              <p className="text-sm text-gray-500 mb-6">
                주문한 내역이 여기에 표시됩니다
              </p>
              <Link 
                to="/home" 
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                메뉴 둘러보기
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">매장이름</h3>
                    <p className="text-sm text-gray-600">메뉴이름</p>
                  </div>
                  <span className="text-primary font-semibold">
                    ${order.total?.toFixed(2) || '25.99'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;

