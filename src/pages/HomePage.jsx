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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header with Settings and Bell icons */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-4 pt-5 pb-6 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Link to="/settings" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Settings size={22} className="text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Food Locker!
          </h1>
          <Link to="/notifications" className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
            <Bell size={22} className="text-gray-700" />
            {getItemCount() > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </Link>
        </div>
        
        {/* Search Bar */}
        <Link to="/search">
          <div className="flex items-center bg-white rounded-2xl px-4 py-3.5 border-2 border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-200 shadow-soft">
            <Search size={20} className="text-gray-400 mr-3" />
            <span className="text-gray-500 font-medium">야구장 검색!</span>
          </div>
        </Link>
      </div>

      {/* Categories Section */}
      <div className="px-4 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
          <span className="text-xs text-gray-400">{categories.length}개</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
          {categories.map((category) => {
            const isActive = category.id === selectedCategory;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex flex-col items-center rounded-2xl p-5 min-w-[110px] relative transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-primary to-primary/90 shadow-lg scale-105 transform' 
                    : 'bg-white border-2 border-gray-100 hover:border-primary/30 hover:shadow-md hover:scale-[1.02]'
                }`}
              >
                {/* Category Image with gradient overlay */}
                <div className={`w-20 h-20 mb-3 relative overflow-hidden rounded-2xl ${
                  isActive ? 'ring-2 ring-white/30' : ''
                }`}>
                  <div className={`absolute inset-0 ${
                    isActive ? 'bg-gradient-to-br from-white/20 to-transparent' : ''
                  }`}></div>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isActive ? 'scale-110' : 'hover:scale-105'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <span className={`text-sm font-bold mb-2 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-800'
                }`}>
                  {category.name}
                </span>
                {/* Arrow icon at bottom center */}
                <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                  isActive ? 'scale-110' : ''
                }`}>
                  <ChevronRight 
                    size={18} 
                    className={isActive ? 'text-white drop-shadow-sm' : 'text-gray-400'} 
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="px-4 pt-2 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {categories.find(cat => cat.id === selectedCategory)?.nameKo || '메뉴'}
          </h2>
          <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full">
            {recommendedItems.length}개
          </span>
        </div>
        {recommendedItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {recommendedItems.map((item, index) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="bg-white rounded-2xl overflow-hidden border-2 border-gray-50 relative shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/20 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Food Image with gradient overlay */}
              <div className="w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
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
                {/* Badge */}
                <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md z-20">
                  인기
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 pb-16">
                <h3 className="font-bold text-gray-900 mb-2 text-base">{item.name}</h3>
                <div className="flex items-baseline gap-2 pr-14">
                  <span className="text-xs text-gray-500 font-medium">{item.description}</span>
                  <span className="text-primary font-bold text-lg">${item.price}</span>
                </div>
              </div>

              {/* Plus Button */}
              <button
                onClick={(e) => handleAddToCart(e, item)}
                className={`absolute bottom-4 right-4 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg z-10 transition-all duration-300 hover:scale-110 active:scale-95 ${
                  item.id === 1 
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900' 
                    : 'bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary'
                }`}
              >
                <Plus size={20} className="text-white drop-shadow-sm" />
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
          className="fixed bottom-20 right-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl px-5 py-4 shadow-lg z-40 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <span className="font-bold">장바구니</span>
          <span className="bg-white text-primary rounded-full px-3 py-1 text-sm font-bold shadow-md">
            {getItemCount()}
          </span>
        </Link>
      )}
    </div>
  );
};

export default HomePage;

