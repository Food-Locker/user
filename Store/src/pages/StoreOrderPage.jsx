import { useState, useEffect } from 'react';
import { Clock, UtensilsCrossed, CheckCircle2, RefreshCw, Home, Users, LogOut, MapPin } from 'lucide-react';
import { api } from '../lib/mongodb';

const StoreOrderPage = ({ manager, onLogout }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [stadiums, setStadiums] = useState([]);

  // 주문 목록 가져오기 (received, cooking 상태만)
  const fetchOrders = async () => {
    try {
      // 파라미터 없이 모든 주문 가져오기
      const allOrders = await api.getOrders(null, null);
      // received, cooking 상태만 필터링
      const activeOrders = allOrders.filter(
        order => order.status === 'received' || order.status === 'cooking'
      );
      // 최신 주문부터 정렬
      activeOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(activeOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Stadium 정보 가져오기
    const fetchStadiums = async () => {
      try {
        const stadiumsList = await api.getStadiums();
        setStadiums(stadiumsList);
      } catch (error) {
        console.error('Error fetching stadiums:', error);
      }
    };

    fetchStadiums();
    fetchOrders();

    // 실시간 업데이트를 위한 폴링 (3초마다)
    const intervalId = setInterval(fetchOrders, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Stadium 이름 가져오기
  const getStadiumName = (stadiumId) => {
    if (!stadiumId || !stadiums.length) return '야구장';
    const stadium = stadiums.find(s => s.id === stadiumId);
    return stadium?.name || '야구장';
  };

  // 주문 상태 업데이트
  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await api.updateOrderStatus(orderId, newStatus);
      // 상태 업데이트 후 목록 새로고침
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('주문 상태 업데이트에 실패했습니다.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // 상태별 버튼 렌더링
  const renderStatusButton = (order) => {
    if (order.status === 'received') {
      return (
        <button
          onClick={() => handleStatusUpdate(order.id, 'cooking')}
          disabled={updatingOrderId === order.id}
          className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-md"
        >
          {updatingOrderId === order.id ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              처리 중...
            </>
          ) : (
            <>
              <UtensilsCrossed size={16} />
              조리 시작
            </>
          )}
        </button>
      );
    } else if (order.status === 'cooking') {
      return (
        <button
          onClick={() => handleStatusUpdate(order.id, 'completed')}
          disabled={updatingOrderId === order.id}
          className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-md"
        >
          {updatingOrderId === order.id ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              처리 중...
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              조리 완료
            </>
          )}
        </button>
      );
    }
    return null;
  };

  // 상태 텍스트 및 색상
  const getStatusInfo = (status) => {
    switch (status) {
      case 'received':
        return {
          text: '주문 접수',
          color: 'bg-primary/10 text-primary border border-primary/20',
          icon: Clock
        };
      case 'cooking':
        return {
          text: '조리 중',
          color: 'bg-orange-100 text-orange-700 border border-orange-200',
          icon: UtensilsCrossed
        };
      case 'completed':
        return {
          text: '완료',
          color: 'bg-green-100 text-green-700 border border-green-200',
          icon: CheckCircle2
        };
      default:
        return {
          text: '알 수 없음',
          color: 'bg-gray-100 text-gray-700 border border-gray-200',
          icon: Clock
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw size={32} className="text-primary animate-spin mx-auto mb-4" />
          <div className="text-primary text-xl">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <Home size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Food Locker Store</h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  {manager?.stadiumName || '야구장'} 주문 관리 시스템
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchOrders}
                className="px-4 py-2.5 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-semibold hover:border-primary/30 hover:shadow-md transition-all duration-200 flex items-center gap-2 shadow-soft"
              >
                <RefreshCw size={18} />
                새로고침
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2.5 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-semibold hover:border-red-300 hover:text-red-600 transition-all duration-200 flex items-center gap-2 shadow-soft"
              >
                <LogOut size={18} />
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-soft hover:shadow-medium transition-all hover:border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">주문 접수</p>
                <p className="text-3xl font-bold text-primary">
                  {orders.filter(o => o.status === 'received').length}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <Clock size={26} className="text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-soft hover:shadow-medium transition-all hover:border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">조리 중</p>
                <p className="text-3xl font-bold text-primary">
                  {orders.filter(o => o.status === 'cooking').length}
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <UtensilsCrossed size={26} className="text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-soft hover:shadow-medium transition-all hover:border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">전체 대기</p>
                <p className="text-3xl font-bold text-primary">{orders.length}</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                <Users size={26} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* 주문 목록 */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border-2 border-gray-100 shadow-soft text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock size={48} className="text-primary/60" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">대기 중인 주문이 없습니다</h2>
            <p className="text-gray-600">새로운 주문이 들어오면 여기에 표시됩니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-medium transition-all duration-200 shadow-soft overflow-hidden"
                >
                  <div className="p-6">
                    {/* 주문 헤더 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 ${statusInfo.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                            <StatusIcon size={22} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              주문 #{order.id.substring(0, 8)}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {new Date(order.createdAt).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        {order.stadiumId && (
                          <div className="ml-15 mb-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                              <MapPin size={16} className="text-primary" />
                              <p className="text-sm font-semibold text-primary">
                                {getStadiumName(order.stadiumId)}
                              </p>
                            </div>
                          </div>
                        )}
                        {order.seatBlock && order.seatNumber && (
                          <div className="ml-15 mb-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                              <Home size={16} className="text-primary" />
                              <p className="text-sm font-semibold text-primary">
                                {order.seatBlock}블록 {order.seatNumber}번 좌석
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="ml-15">
                          <p className="text-sm text-gray-600">
                            결제수단: <span className="font-semibold text-gray-900">{order.paymentMethod || '미지정'}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1.5 ${statusInfo.color} rounded-xl text-sm font-semibold mb-2 shadow-sm`}>
                          {statusInfo.text}
                        </span>
                        <p className="text-2xl font-bold gradient-text">
                          {order.total?.toLocaleString() || 0}원
                        </p>
                      </div>
                    </div>

                    {/* 주문 아이템 목록 */}
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">주문 메뉴</h4>
                      <div className="space-y-2">
                        {order.items?.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-xl"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">수량: {item.quantity}개</p>
                              </div>
                            </div>
                            <p className="font-semibold text-primary">
                              {(item.price * item.quantity).toLocaleString()}원
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="border-t border-gray-100 pt-4 mt-4 flex justify-end">
                      {renderStatusButton(order)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOrderPage;

