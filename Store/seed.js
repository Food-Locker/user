import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 같은 디렉토리의 .env 파일 읽기
dotenv.config({ path: join(__dirname, '.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI가 설정되지 않았습니다.');
  process.exit(1);
}

async function seedStoreManagers() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('food-locker');
    console.log('MongoDB 연결 성공');

    // 기존 매장 관리자 데이터 삭제
    await db.collection('store-managers').deleteMany({});
    console.log('기존 매장 관리자 데이터 삭제 완료');

    // 모든 brands 가져오기
    const brands = await db.collection('brands').find({}).toArray();
    console.log(`${brands.length}개의 Brands 발견`);

    if (brands.length === 0) {
      console.log('⚠️ Brands가 없습니다. 먼저 backend 프로젝트의 seed.js를 실행하여 데이터를 생성해주세요.');
      return;
    }

    // 각 brand의 category와 stadium 정보 가져오기
    const storeManagersData = [];

    for (const brand of brands) {
      // Category 정보 가져오기
      const categoryId = brand.categoryId instanceof ObjectId ? brand.categoryId : new ObjectId(brand.categoryId);
      const category = await db.collection('categories').findOne({ _id: categoryId });
      if (!category) {
        console.log(`⚠️ Category를 찾을 수 없습니다: ${brand.categoryId}`);
        continue;
      }

      // Stadium 정보 가져오기
      const stadiumId = category.stadiumId instanceof ObjectId ? category.stadiumId : new ObjectId(category.stadiumId);
      const stadium = await db.collection('stadiums').findOne({ _id: stadiumId });
      if (!stadium) {
        console.log(`⚠️ Stadium을 찾을 수 없습니다: ${category.stadiumId}`);
        continue;
      }

      // Brand 이름을 기반으로 username 생성 (한글을 영문으로 변환)
      const usernameMap = {
        '통빱': 'tongbbap',
        '잭슨피자': 'jacksonpizza',
        '파오파오': 'paopao',
        '쉬림프 쉐프': 'shrimpchef',
        '백남옥달인손만두': 'baeknamok',
        '올드페리도넛': 'oldferrydonut',
        '스테이션': 'station',
        '스타벅스': 'starbucks',
        '진미통닭': 'jimitongdak',
        '보영만두': 'boyoungmandu',
        '광주제일햄버고': 'gwangjujeilhambergo',
        '마성떡볶이': 'maseongtteokbokki',
        '코아양과': 'corebakery',
        '알통떡강정': 'altongtteokgangjeong',
        '해피치즈스마일': 'happicheesesmile',
        '땅땅치킨': 'tangtangchicken',
        '빽보이피자': 'paikboypizza',
        '연돈볼카츠': 'yeondonballkatsu',
        '33떡볶이': '33tteokbokki',
        '다리집': 'darijib'
      };

      const brandName = brand.name || brand.nameEn || '';
      const username = usernameMap[brandName] || brandName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
      
      // 중복 방지를 위해 brandId 추가
      const uniqueUsername = `${username}_${brand._id.toString().substring(0, 6)}`;

      storeManagersData.push({
        username: uniqueUsername,
        password: 'store123', // 기본 비밀번호
        brandId: brand._id.toString(),
        brandName: brandName,
        categoryId: category._id.toString(),
        categoryName: category.nameKo || category.name,
        stadiumId: stadium._id.toString(),
        stadiumName: stadium.name,
        createdAt: new Date().toISOString()
      });
    }

    // 매장 관리자 계정 생성
    if (storeManagersData.length > 0) {
      await db.collection('store-managers').insertMany(storeManagersData);
      console.log(`✅ ${storeManagersData.length}개의 매장 관리자 계정 생성 완료`);
      
      // 생성된 계정 목록 출력
      console.log('\n📋 생성된 매장 관리자 계정:');
      storeManagersData.forEach((manager, index) => {
        console.log(`${index + 1}. ${manager.brandName} (${manager.stadiumName})`);
        console.log(`   아이디: ${manager.username} / 비밀번호: store123`);
      });
    } else {
      console.log('⚠️ 생성할 매장 관리자 계정이 없습니다.');
    }

    // 전체 주문 관리자 계정 생성
    const adminAccount = {
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      isAdmin: true,
      brandId: null,
      brandName: '전체 관리자',
      stadiumId: null,
      stadiumName: '전체',
      createdAt: new Date().toISOString()
    };

    // 기존 admin 계정이 있으면 삭제 후 재생성
    await db.collection('store-managers').deleteOne({ username: 'admin' });
    await db.collection('store-managers').insertOne(adminAccount);
    console.log('\n✅ 전체 주문 관리자 계정 생성 완료');
    console.log('   아이디: admin / 비밀번호: admin123');

    console.log('\n✅ 매장 관리자 시드 완료!');
  } catch (error) {
    console.error('매장 관리자 시드 중 오류:', error);
  } finally {
    await client.close();
  }
}

seedStoreManagers();

