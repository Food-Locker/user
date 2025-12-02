import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useCartStore from '../store/cartStore';

const SearchPage = () => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStadium, setSelectedStadium] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Firebase에서 stadiums 데이터 가져오기
  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const stadiumsCollection = collection(db, 'stadiums');
        const stadiumsSnapshot = await getDocs(stadiumsCollection);
        const stadiumsList = stadiumsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStadiums(stadiumsList);
      } catch (error) {
        console.error('Error fetching stadiums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStadiums();
  }, []);

  // 선택된 Stadium의 categories 서브컬렉션 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedStadium) {
        setCategories([]);
        setSelectedCategory(null);
        return;
      }

      setLoadingCategories(true);
      try {
        const categoriesCollection = collection(db, 'stadiums', selectedStadium.id, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesList = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [selectedStadium]);

  // 선택된 Category의 brands 서브컬렉션 가져오기
  useEffect(() => {
    const fetchBrands = async () => {
      if (!selectedStadium || !selectedCategory) {
        setBrands([]);
        setSelectedBrand(null);
        return;
      }

      setLoadingBrands(true);
      try {
        const brandsCollection = collection(
          db, 
          'stadiums', 
          selectedStadium.id, 
          'categories', 
          selectedCategory.id, 
          'brands'
        );
        const brandsSnapshot = await getDocs(brandsCollection);
        const brandsList = brandsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBrands(brandsList);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, [selectedStadium, selectedCategory]);

  // 선택된 Brand의 items 서브컬렉션 가져오기
  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedStadium || !selectedCategory || !selectedBrand) {
        setItems([]);
        return;
      }

      setLoadingItems(true);
      try {
        const itemsCollection = collection(
          db, 
          'stadiums', 
          selectedStadium.id, 
          'categories', 
          selectedCategory.id, 
          'brands',
          selectedBrand.id,
          'items'
        );
        const itemsSnapshot = await getDocs(itemsCollection);
        const itemsList = itemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(itemsList);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, [selectedStadium, selectedCategory, selectedBrand]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedBrand(null);
    setItems([]);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

  // public 폴더에서 이미지 찾기: item 이름을 기반으로 파일명 생성
  const getImagePath = (name) => {
    if (!name) return null;
    
    // 한글 이름을 영문 파일명으로 매핑
    const imageMap = {
      '황금올리브핫윙': '/Golden-Olive-Hot.png',
      '황금올리브치킨': '/Golden-Olive.png',
      '황금올리브닭다리': '/Chicken-Leg.png',
    };
    
    // 정확한 매칭 시도
    if (imageMap[name]) {
      return imageMap[name];
    }
    
    // 부분 매칭 시도
    for (const [key, value] of Object.entries(imageMap)) {
      if (name.includes(key) || key.includes(name)) {
        return value;
      }
    }
    
    // 기본 이미지 시도 (이름 기반)
    const sanitizedName = name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    return `/${sanitizedName}.png`;
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/home')}
            className="mr-4"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 flex-1">Search</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Stadium</h2>
          {loading ? (
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mx-auto"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {stadiums.map((stadium) => {
                const isSelected = selectedStadium?.id === stadium.id;
                const stadiumName = stadium.name || stadium.stadiumName || '';
                const firstTwoChars = stadiumName.substring(0, 2) || 'St';
                
                return (
                  <button
                    key={stadium.id}
                    onClick={() => setSelectedStadium(stadium)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-semibold mx-auto transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-lg ring-2 ring-primary ring-offset-2 scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title={stadiumName || 'Stadium'}
                  >
                    {firstTwoChars}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Categories는 Stadium이 선택되었을 때만 표시 */}
        {selectedStadium && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Category</h2>
            {loadingCategories ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-gray-200 animate-pulse"
                    style={{ width: '80px', height: '36px' }}
                  />
                ))}
              </div>
            ) : categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isSelected = selectedCategory?.id === category.id;
                  const categoryName = category.name || category.categoryName || 'Category';
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {categoryName}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">카테고리가 없습니다.</p>
            )}
          </div>
        )}

        {/* Brands는 Category가 선택되었을 때만 표시 */}
        {selectedStadium && selectedCategory && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Brand</h2>
            {loadingBrands ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg bg-gray-200 animate-pulse"
                    style={{ width: '100px', height: '36px' }}
                  />
                ))}
              </div>
            ) : brands.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => {
                  const isSelected = selectedBrand?.id === brand.id;
                  // DB 필드명: name 또는 다른 가능한 필드명들
                  const brandName = brand.name || brand.brandName || brand.title || 'Brand';
                  return (
                    <button
                      key={brand.id}
                      onClick={() => handleBrandSelect(brand)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {brandName}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">브랜드가 없습니다.</p>
            )}
          </div>
        )}

        {/* Items는 Brand가 선택되었을 때만 표시 */}
        {selectedStadium && selectedCategory && selectedBrand && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Food</h2>
            {loadingItems ? (
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-32 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : items.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {items.map((item) => {
                  // DB 필드명: name 또는 다른 가능한 필드명들
                  const itemName = item.name || item.itemName || item.title || 'Item';
                  const itemPrice = item.price || item.itemPrice || 0;
                  const itemImage = getImagePath(itemName);
                  const isSelected = selectedItem?.id === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`w-full bg-white rounded-lg overflow-hidden border-2 shadow-sm transition-all ${
                        isSelected 
                          ? 'border-primary ring-2 ring-primary ring-offset-2' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-full h-32 bg-gray-100 relative overflow-hidden">
                        {itemImage ? (
                          <img 
                            src={itemImage} 
                            alt={itemName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // 이미지 로드 실패 시 플레이스홀더 표시
                              e.target.style.display = 'none';
                              const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                              if (placeholder) {
                                placeholder.classList.remove('hidden');
                              }
                            }}
                          />
                        ) : null}
                        <div className={`${itemImage ? 'hidden' : ''} image-placeholder w-full h-full flex items-center justify-center`}>
                          <span className="text-4xl">🍔</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm">{itemName}</h3>
                        <p className="text-primary font-semibold text-sm">
                          {itemPrice.toLocaleString()}원
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">아이템이 없습니다.</p>
            )}
          </div>
        )}
      </div>

      {/* 장바구니에 담기 버튼 - 아이템이 선택되었을 때만 표시 */}
      {selectedItem && (
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 mobile-container px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">선택된 아이템</p>
              <p className="font-semibold text-gray-900">
                {selectedItem.name || selectedItem.itemName || selectedItem.title || 'Item'}
              </p>
              <p className="text-primary font-semibold text-sm mt-1">
                {(selectedItem.price || selectedItem.itemPrice || 0).toLocaleString()}원
              </p>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <button
            onClick={() => {
              const itemName = selectedItem.name || selectedItem.itemName || selectedItem.title || 'Item';
              const itemPrice = selectedItem.price || selectedItem.itemPrice || 0;
              
              addItem({
                id: selectedItem.id,
                name: itemName,
                price: itemPrice,
                quantity: 1,
                image: getImagePath(itemName),
                options: {}
              });
              
              // 성공 알림 (커스텀 토스트 메시지)
              setToastMessage(`${itemName}이(가) 장바구니에 추가되었습니다.`);
              setShowToast(true);
              setSelectedItem(null);
              
              // 3초 후 자동으로 토스트 닫기
              setTimeout(() => {
                setShowToast(false);
              }, 3000);
            }}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart size={20} />
            장바구니에 담기
          </button>
        </div>
      )}

      {/* 모달 팝업 */}
      {showToast && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowToast(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              {/* 성공 아이콘 */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={40} className="text-primary" />
              </div>
              
              {/* 메시지 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                장바구니에 추가됨
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {toastMessage}
              </p>
              
              {/* 확인 버튼 */}
              <button
                onClick={() => {
                  setShowToast(false);
                  navigate('/cart');
                }}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

