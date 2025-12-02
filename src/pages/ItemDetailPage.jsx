import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import useCartStore from '../store/cartStore';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  // 실제로는 서버에서 아이템 정보를 가져옴
  const item = {
    id: id,
    name: '메뉴이름',
    description: '맛있는 햄버거입니다. 신선한 재료로 만든 특별한 메뉴입니다.',
    price: 25.99,
    image: '🍔',
    storeName: '매장이름',
  };

  const relatedItems = [
    { id: 1, name: '메뉴이름', price: 25.99, image: '🍟' },
    { id: 2, name: '메뉴이름', price: 25.99, image: '🥤' },
  ];

  const handleAddToCart = () => {
    addItem({
      ...item,
      quantity,
      options: selectedOptions,
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link to="/order" className="text-gray-600">
            {item.storeName} &gt;
          </Link>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-8xl">
          {item.image}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h1>
        <p className="text-gray-600 mb-4">{item.description}</p>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">수량</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded"
            >
              <Minus size={20} />
            </button>
            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">함께 먹으면 좋아요!</h3>
          <div className="space-y-3">
            {relatedItems.map((related) => (
              <div key={related.id} className="flex items-center bg-gray-50 rounded-lg p-4">
                <div className="text-4xl mr-4">{related.image}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{related.name}</h4>
                  <p className="text-primary font-semibold">${related.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">가격</span>
            <span className="text-2xl font-bold text-primary">
              ${(item.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-4 bg-primary text-white rounded-lg font-semibold"
        >
          장바구니에 추가
        </button>
      </div>
    </div>
  );
};

export default ItemDetailPage;

