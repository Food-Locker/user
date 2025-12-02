import { useState } from 'react';

const SearchPage = () => {
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

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="px-4 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Search</h1>
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

        <button className="w-full py-4 bg-primary text-white rounded-lg font-semibold">
          Filter
        </button>
      </div>
    </div>
  );
};

export default SearchPage;

