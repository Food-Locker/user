import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Settings, Bell, ChevronRight, Plus } from 'lucide-react';
import useCartStore from '../store/cartStore';

const HomePage = () => {
  const { getItemCount, addItem } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState(1); // 기본값: Sandwich

  const categories = [
    { id: 1, name: 'Sandwich', nameKo: '샌드위치', image: '/sandwich.png' },
    { id: 2, name: 'Pizza', nameKo: '피자', image: '/pizza.png' },
    { id: 3, name: 'Burger', nameKo: '버거', image: '/hamburger.png' },
    { id: 4, name: 'Drinks', nameKo: '음료', image: '/drinks.png' },
  ];

  // 모든 음식 아이템 (실제로는 서버에서 가져올 데이터)
  const allItems = [
    { 
      id: 1, 
      name: 'Sandwich', 
      categoryId: 1,
      price: 15.50, 
      image: '/sandwich.png',
      description: 'Starting From'
    },
    { 
      id: 2, 
      name: 'Hamburger', 
      categoryId: 3,
      price: 19.99, 
      image: '/hamburger.png',
      description: 'Starting From'
    },
    { 
      id: 3, 
      name: 'Cheese Pizza', 
      categoryId: 2,
      price: 22.00, 
      image: '/pizza.png',
      description: 'Starting From'
    },
    { 
      id: 4, 
      name: 'Cola', 
      categoryId: 4,
      price: 3.50, 
      image: '/drinks.png',
      description: 'Starting From'
    },
  ];

  // 선택된 카테고리에 맞는 아이템 필터링
  const recommendedItems = allItems.filter(item => item.categoryId === selectedCategory);

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header with Settings and Bell icons */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-5 pb-10 border-b border-gray-200">
        <div className="flex items-center justify-between mb-10">
          <Link to="/settings">
            <Settings size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Food Locker!</h1>
          <Link to="/notifications">
            <Bell size={24} className="text-gray-700" />
          </Link>
        </div>
        
        {/* Search Bar */}
        <Link to="/search">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
            <Search size={20} className="text-gray-400 mr-2" />
            <span className="text-gray-500">야구장 검색!</span>
          </div>
        </Link>
      </div>

      {/* Categories Section */}
      <div className="px-4 pt-10 pb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Categories</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((category) => {
            const isActive = category.id === selectedCategory;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex flex-col items-center rounded-lg p-4 min-w-[100px] relative ${
                  isActive 
                    ? 'bg-primary' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {/* Category Image */}
                <div className="w-16 h-16 mb-2 relative overflow-hidden rounded-lg">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <span className={`text-sm font-medium mb-1 ${
                  isActive ? 'text-white' : 'text-gray-700'
                }`}>
                  {category.name}
                </span>
                {/* Arrow icon at bottom center */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <ChevronRight 
                    size={16} 
                    className={isActive ? 'text-yellow-400' : 'text-gray-400'} 
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="px-4 pt-5 pb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-900">
          {categories.find(cat => cat.id === selectedCategory)?.nameKo || '메뉴'}
        </h2>
        {recommendedItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {recommendedItems.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 relative shadow-sm"
            >
              {/* Food Image */}
              <div className="w-full h-48 bg-gray-100 relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // 이미지 로드 실패 시 플레이스홀더 표시
                    const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                    if (placeholder) {
                      e.target.style.display = 'none';
                      placeholder.classList.remove('hidden');
                    }
                  }}
                />
                <div className="hidden image-placeholder w-full h-full items-center justify-center text-6xl bg-gray-100">
                  {item.id === 1 ? '🥪' : '🍔'}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-3 pb-10">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{item.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-500">{item.description}</span>
                  <span className="text-primary font-semibold text-sm">${item.price}</span>
                </div>
              </div>

              {/* Plus Button */}
              <button
                onClick={(e) => handleAddToCart(e, item)}
                className={`absolute bottom-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center shadow-md z-10 ${
                  item.id === 1 
                    ? 'bg-gray-600' 
                    : 'bg-yellow-400'
                }`}
              >
                <Plus size={18} className="text-white" />
              </button>
            </Link>
          ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>선택한 카테고리에 해당하는 메뉴가 없습니다.</p>
          </div>
        )}
      </div>

      {getItemCount() > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-20 right-4 bg-primary text-white rounded-full p-4 shadow-lg z-40"
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

