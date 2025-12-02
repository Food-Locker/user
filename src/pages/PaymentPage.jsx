import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useSeatStore from '../store/seatStore';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { seatBlock, seatNumber } = useSeatStore();
  const [deliveryMethod, setDeliveryMethod] = useState('locker');
  const [loading, setLoading] = useState(false);

  const menuTotal = getTotal();
  const deliveryFee = deliveryMethod === 'locker' ? 1000 : deliveryMethod === 'seat' ? 2500 : 0;
  const discount = menuTotal * 0.1; // 10% 할인
  const finalTotal = menuTotal + deliveryFee - discount;

  const handlePayment = async () => {
    if (!seatBlock || !seatNumber) {
      alert('좌석 정보를 먼저 입력해주세요.');
      return;
    }

    setLoading(true);

    // 결제 시뮬레이션: 2초 대기
    setTimeout(() => {
      // 주문 정보를 localStorage에 저장 (실제로는 서버로 전송)
      const orderId = `ORDER-${Date.now()}`;
      const orderData = {
        id: orderId,
        items,
        seatBlock,
        seatNumber,
        deliveryMethod,
        total: finalTotal,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(`order_${orderId}`, JSON.stringify(orderData));
      clearCart();
      setLoading(false);
      navigate(`/payment/success?orderId=${orderId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">결제화면</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            수령방법을 선택해주세요*
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => setDeliveryMethod('locker')}
              className={`w-full p-4 border-2 rounded-lg text-left ${
                deliveryMethod === 'locker'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">락커 배달</h3>
                  <p className="text-sm text-gray-600">10-15분 후 도착</p>
                </div>
                <span className="font-semibold text-gray-900">1,000원</span>
              </div>
            </button>

            <button
              onClick={() => setDeliveryMethod('seat')}
              className={`w-full p-4 border-2 rounded-lg text-left ${
                deliveryMethod === 'seat'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">좌석 배달</h3>
                  <p className="text-sm text-gray-600">20-25분 후 도착</p>
                </div>
                <span className="font-semibold text-gray-900">2,500원</span>
              </div>
            </button>

            <button
              onClick={() => setDeliveryMethod('pickup')}
              className={`w-full p-4 border-2 rounded-lg text-left ${
                deliveryMethod === 'pickup'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">픽업</h3>
                  <p className="text-sm text-gray-600">10-13분후 픽업</p>
                </div>
                <span className="font-semibold text-gray-900">무료</span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            결제금액을 확인해주세요
          </h2>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>메뉴 금액</span>
              <span>{menuTotal.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>배달팁</span>
              <span>{deliveryFee.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>메뉴할인</span>
              <span>-{discount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
              <span>최종 결제금액</span>
              <span className="text-primary">{finalTotal.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            좌석 정보: {seatBlock}블록 {seatNumber}번
          </p>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-4 bg-primary text-white text-center rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? '결제 처리 중...' : '결제하기'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

