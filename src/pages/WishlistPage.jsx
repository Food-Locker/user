const WishlistPage = () => {
  const wishlistItems = [
    { id: 1, name: 'Item', image: '🍔' },
    { id: 2, name: 'Item', image: '🍕' },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">관심목록</h1>
      </div>

      <div className="px-4 py-6">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <p className="text-gray-600">관심목록이 비어있습니다</p>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center bg-gray-50 rounded-lg p-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-3xl mr-4">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">1x {item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <textarea
            placeholder="Add order notes."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <button className="w-full mt-4 py-4 bg-primary text-white rounded-lg font-semibold">
          Filter
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;

