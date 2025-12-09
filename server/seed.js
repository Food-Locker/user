import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 상위 디렉토리의 .env 파일 읽기
dotenv.config({ path: join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI가 설정되지 않았습니다.');
  process.exit(1);
}

async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('food-locker');
    console.log('MongoDB 연결 성공');

    // 기존 데이터 삭제 (선택사항)
    await db.collection('stadiums').deleteMany({});
    await db.collection('categories').deleteMany({});
    await db.collection('brands').deleteMany({});
    await db.collection('items').deleteMany({});
    console.log('기존 데이터 삭제 완료');

    // 1. Stadiums 생성 (모든 한국 야구장)
    const stadiumsData = [
      { name: '고척 스카이돔', location: '서울시 구로구' },
      { name: '광주 기아 챔피언스 필드', location: '광주광역시 북구' },
      { name: '대구 삼성 라이온즈 파크', location: '대구광역시 수성구' },
      { name: '대전 한화생명 볼파크', location: '대전광역시 중구' },
      { name: '부산 사직야구장', location: '부산광역시 동래구' },
      { name: '수원 KT 위즈 파크', location: '경기도 수원시 영통구' },
      { name: '인천 SSG 랜더스필드', location: '인천광역시 미추홀구' },
      { name: '잠실야구장', location: '서울시 송파구' },
      { name: '창원 NC 파크', location: '경상남도 창원시 마산회원구' }
    ];

    const stadiums = await db.collection('stadiums').insertMany(
      stadiumsData.map(stadium => ({
        ...stadium,
        createdAt: new Date().toISOString()
      }))
    );
    
    const stadiumIds = Object.values(stadiums.insertedIds);
    console.log(`${stadiumsData.length}개의 Stadiums 생성 완료`);
    
    // 첫 번째 stadium (고척 스카이돔)을 기본으로 사용
    const stadium1Id = stadiumIds[0];

    // 2. Categories 생성 (고척 스카이돔)
    const category1 = await db.collection('categories').insertOne({
      stadiumId: stadium1Id,
      name: 'Sandwich',
      nameKo: '샌드위치',
      createdAt: new Date().toISOString()
    });
    const category1Id = category1.insertedId;

    const category2 = await db.collection('categories').insertOne({
      stadiumId: stadium1Id,
      name: 'Pizza',
      nameKo: '피자',
      createdAt: new Date().toISOString()
    });
    const category2Id = category2.insertedId;

    const category3 = await db.collection('categories').insertOne({
      stadiumId: stadium1Id,
      name: 'Burger',
      nameKo: '햄버거',
      createdAt: new Date().toISOString()
    });
    const category3Id = category3.insertedId;

    const category4 = await db.collection('categories').insertOne({
      stadiumId: stadium1Id,
      name: 'Drinks',
      nameKo: '음료',
      createdAt: new Date().toISOString()
    });
    const category4Id = category4.insertedId;
    console.log('Categories 생성 완료');

    // 3. Brands 생성
    const brand1 = await db.collection('brands').insertOne({
      categoryId: category1Id,
      name: 'Subway',
      createdAt: new Date().toISOString()
    });
    const brand1Id = brand1.insertedId;

    const brand2 = await db.collection('brands').insertOne({
      categoryId: category2Id,
      name: 'Pizza Hut',
      createdAt: new Date().toISOString()
    });
    const brand2Id = brand2.insertedId;

    const brand3 = await db.collection('brands').insertOne({
      categoryId: category3Id,
      name: 'McDonald\'s',
      createdAt: new Date().toISOString()
    });
    const brand3Id = brand3.insertedId;

    const brand4 = await db.collection('brands').insertOne({
      categoryId: category4Id,
      name: 'Coca-Cola',
      createdAt: new Date().toISOString()
    });
    const brand4Id = brand4.insertedId;
    console.log('Brands 생성 완료');

    // 4. Items 생성
    // Sandwich Items
    await db.collection('items').insertMany([
      {
        brandId: brand1Id,
        name: '황금올리브핫윙',
        price: 15000,
        description: '맛있는 치킨 샌드위치',
        createdAt: new Date().toISOString()
      },
      {
        brandId: brand1Id,
        name: '황금올리브치킨',
        price: 12000,
        description: '클래식 치킨 샌드위치',
        createdAt: new Date().toISOString()
      }
    ]);

    // Pizza Items
    await db.collection('items').insertMany([
      {
        brandId: brand2Id,
        name: 'Cheese Pizza',
        price: 20000,
        description: '치즈 피자',
        createdAt: new Date().toISOString()
      }
    ]);

    // Burger Items
    await db.collection('items').insertMany([
      {
        brandId: brand3Id,
        name: 'Sandwich',
        price: 8000,
        description: '햄버거',
        createdAt: new Date().toISOString()
      },
      {
        brandId: brand3Id,
        name: 'Burger',
        price: 9000,
        description: '클래식 버거',
        createdAt: new Date().toISOString()
      }
    ]);

    // Drinks Items
    await db.collection('items').insertMany([
      {
        brandId: brand4Id,
        name: 'Cola',
        price: 3000,
        description: '콜라',
        createdAt: new Date().toISOString()
      }
    ]);

    console.log('Items 생성 완료');
    console.log('✅ 데이터베이스 시드 완료!');
  } catch (error) {
    console.error('데이터베이스 시드 중 오류:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();

