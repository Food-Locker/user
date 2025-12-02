import { useState, useEffect } from 'react';

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
        <h1 className="text-2xl font-bold text-gray-900">결제내역</h1>
      </div>

      <div className="px-4 py-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600">주문 내역이 없습니다</p>
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

