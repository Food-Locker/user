import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderPage = () => {
  const [selectedCategories, setSelectedCategories] = useState(['All']);

  const categories = [
    'All', 'Cereal', 'Vegetables', 'Dinner', 'Chinese', 
    'Local Dish', 'Fruit', 'Breakfast', 'Spanish', 'Lunch'
  ];

  const toggleCategory = (category) => {
    if (category === 'All') {
      setSelectedCategories(['All']);
    } else {
      setSelectedCategories(prev => {
        const filtered = prev.filter(c => c !== 'All');
        if (filtered.includes(category)) {
          return filtered.filter(c => c !== category);
        } else {
          return [...filtered, category];
        }
      });
    }
  };

  const stores = [
    { id: 1, name: '매장 이름', price: 18.00 },
    { id: 2, name: '매장 이름', price: 18.00 },
    { id: 3, name: '매장 이름', price: 18.00 },
    { id: 4, name: '매장 이름', price: 18.00 },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">주문하기</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Stadium</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">잠실야구장</h2>
          <div className="grid grid-cols-2 gap-4">
            {stores.map((store) => (
              <Link
                key={store.id}
                to={`/item/${store.id}`}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center text-4xl">
                  🍔
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
                <p className="text-primary font-semibold">${store.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

