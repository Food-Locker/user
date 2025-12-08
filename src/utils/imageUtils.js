// public 폴더에서 이미지 경로를 가져오는 유틸리티 함수

/**
 * 아이템 이름을 기반으로 public 폴더의 이미지 경로를 반환
 * @param {string} name - 아이템 이름
 * @returns {string|null} 이미지 경로 또는 null
 */
export const getImagePath = (name) => {
  if (!name) return null;
  
  // 한글 이름을 영문 파일명으로 매핑
  const imageMap = {
    '황금올리브핫윙': '/Golden-Olive-Hot.png',
    '황금올리브치킨': '/Golden-Olive.png',
    '황금올리브닭다리': '/Chicken-Leg.png',
    'Sandwich': '/sandwich.png',
    '샌드위치': '/sandwich.png',
    'Hamburger': '/hamburger.png',
    '햄버거': '/hamburger.png',
    'Burger': '/hamburger.png',
    '버거': '/hamburger.png',
    'Pizza': '/pizza.png',
    '피자': '/pizza.png',
    'Drinks': '/drinks.png',
    '음료': '/drinks.png',
    'Cola': '/drinks.png',
    '콜라': '/drinks.png',
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
  return sanitizedName ? `/${sanitizedName}.png` : null;
};

/**
 * 카테고리 이름을 기반으로 이미지 경로 반환
 * @param {string} categoryName - 카테고리 이름
 * @returns {string} 이미지 경로
 */
export const getCategoryImage = (categoryName) => {
  const categoryMap = {
    'Sandwich': '/sandwich.png',
    '샌드위치': '/sandwich.png',
    'Pizza': '/pizza.png',
    '피자': '/pizza.png',
    'Burger': '/hamburger.png',
    '버거': '/hamburger.png',
    'Hamburger': '/hamburger.png',
    'Drinks': '/drinks.png',
    '음료': '/drinks.png',
  };
  
  return categoryMap[categoryName] || '/hamburger.png';
};

