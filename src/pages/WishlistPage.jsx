import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { auth } from '../lib/firebase';
import { getImagePath } from '../utils/imageUtils';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Firebase에서 사용자의 관심목록 가져오기
        // 관심목록은 users/{userId}/wishlist 컬렉션에 저장된다고 가정
        const wishlistRef = collection(db, 'users', auth.currentUser.uid, 'wishlist');
        const wishlistSnapshot = await getDocs(wishlistRef);
        
        const items = [];
        for (const doc of wishlistSnapshot.docs) {
          const itemData = doc.data();
          const itemName = itemData.name || itemData.itemName || itemData.title || 'Item';
          items.push({
            id: doc.id,
            ...itemData,
            name: itemName,
            image: getImagePath(itemName) || '/hamburger.png',
            price: itemData.price || itemData.itemPrice || 0
          });
        }
        
        setWishlistItems(items);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        // 에러 발생 시 빈 배열
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">관심목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">관심목록</h1>
      </div>

      <div className="px-4 py-6">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart size={64} className="text-primary" strokeWidth={1.5} fill="currentColor" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">관심목록이 비어있습니다</h2>
            <p className="text-sm text-gray-500 mb-6">
              좋아하는 메뉴를 관심목록에 추가해보세요
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white rounded-xl p-4 border border-gray-100 shadow-soft hover:shadow-medium transition-all">
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden mr-4 flex-shrink-0 border border-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/hamburger.png';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  {item.price && (
                    <p className="text-primary font-semibold mt-1">{item.price.toLocaleString()}원</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default WishlistPage;

