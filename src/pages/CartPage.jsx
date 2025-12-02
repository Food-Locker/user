import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import useCartStore from '../store/cartStore';

const CartPage = () => {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const tax = total * 0.1; // 10% 세금
  const subtotal = total + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pb-24 flex items-center justify-center px-4">
        <div className="text-center max-w-sm w-full">
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingCart size={64} className="text-primary" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">장바구니가 비어있습니다</h2>
          <p className="text-sm text-gray-500 mb-6">
            맛있는 음식을 장바구니에 담아보세요
          </p>
          <Link 
            to="/home" 
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            메뉴 둘러보기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">장바구니</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mr-4 flex-shrink-0">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                    if (placeholder) {
                      placeholder.classList.remove('hidden');
                    }
                  }}
                />
              ) : null}
              <div className={`${item.image ? 'hidden' : ''} image-placeholder w-full h-full flex items-center justify-center`}>
                <span className="text-3xl">🍔</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description || 'Spicy with black pepper sauce'}</p>
              <p className="text-primary font-semibold mt-1">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1, item.options)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1, item.options)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => removeItem(item.id, item.options)}
                className="ml-2 text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-4 border-t border-gray-200 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Items</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Sales Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Promo Code</span>
          <span className="text-primary">-$0.00</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
          <span>Subtotal ({items.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <Link
          to="/payment"
          className="block w-full py-4 bg-primary text-white text-center rounded-lg font-semibold"
        >
          결제하기
        </Link>
      </div>
    </div>
  );
};

export default CartPage;

