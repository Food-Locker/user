import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import useCartStore from '../store/cartStore';

const HomePage = () => {
  const { getItemCount } = useCartStore();

  const categories = [
    { id: 1, name: 'Sandwich', icon: '🥪' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Burger', icon: '🍔' },
    { id: 4, name: 'Drinks', icon: '🥤' },
  ];

  const recommendedItems = [
    { id: 1, name: 'Sandwich', price: 15.50, image: '🥪' },
    { id: 2, name: 'Hamburger', price: 19.99, image: '🍔' },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Food Locker!</h1>
        
        <Link to="/search">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
            <Search size={20} className="text-gray-400 mr-2" />
            <span className="text-gray-500">Q 야구장 검색!</span>
          </div>
        </Link>
      </div>

      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Categories</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 flex flex-col items-center bg-gray-50 rounded-lg p-4 min-w-[100px]"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Recommended</h2>
        <div className="space-y-4">
          {recommendedItems.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="flex items-center bg-gray-50 rounded-lg p-4"
            >
              <div className="text-5xl mr-4">{item.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-primary font-medium">Starting From ${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {getItemCount() > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-24 right-4 bg-primary text-white rounded-full p-4 shadow-lg"
        >
          <div className="flex items-center">
            <span className="mr-2">장바구니</span>
            <span className="bg-white text-primary rounded-full px-2 py-1 text-sm font-bold">
              {getItemCount()}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default HomePage;

