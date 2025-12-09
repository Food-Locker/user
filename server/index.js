import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 상위 디렉토리의 .env 파일 읽기
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 연결
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI가 설정되지 않았습니다.');
  process.exit(1);
}

const client = new MongoClient(uri);
let db;

// MongoDB 연결
async function connectDB() {
  try {
    await client.connect();
    db = client.db('food-locker');
    console.log('MongoDB 연결 성공');
  } catch (error) {
    console.error('MongoDB 연결 실패:', error);
    process.exit(1);
  }
}

connectDB();

// ========== Stadiums API ==========
// 모든 Stadiums 가져오기
app.get('/api/stadiums', async (req, res) => {
  try {
    const stadiums = await db.collection('stadiums').find({}).toArray();
    res.json(stadiums.map(s => ({ ...s, id: s._id.toString() })));
  } catch (error) {
    console.error('Error fetching stadiums:', error);
    res.status(500).json({ error: 'Stadiums를 가져오는 중 오류가 발생했습니다.' });
  }
});

// ========== Categories API ==========
// 특정 Stadium의 Categories 가져오기
app.get('/api/stadiums/:stadiumId/categories', async (req, res) => {
  try {
    const { stadiumId } = req.params;
    const categories = await db.collection('categories')
      .find({ stadiumId: new ObjectId(stadiumId) })
      .toArray();
    res.json(categories.map(c => ({ ...c, id: c._id.toString() })));
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Categories를 가져오는 중 오류가 발생했습니다.' });
  }
});

// ========== Brands API ==========
// 특정 Category의 Brands 가져오기
app.get('/api/categories/:categoryId/brands', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const brands = await db.collection('brands')
      .find({ categoryId: new ObjectId(categoryId) })
      .toArray();
    res.json(brands.map(b => ({ ...b, id: b._id.toString() })));
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Brands를 가져오는 중 오류가 발생했습니다.' });
  }
});

// ========== Items API ==========
// 특정 Brand의 Items 가져오기
app.get('/api/brands/:brandId/items', async (req, res) => {
  try {
    const { brandId } = req.params;
    const items = await db.collection('items')
      .find({ brandId: new ObjectId(brandId) })
      .toArray();
    res.json(items.map(i => ({ ...i, id: i._id.toString() })));
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Items를 가져오는 중 오류가 발생했습니다.' });
  }
});

// 모든 카테고리의 모든 아이템 가져오기 (HomePage용)
app.get('/api/items', async (req, res) => {
  try {
    const { categoryId } = req.query;
    let items = [];
    
    if (categoryId) {
      // categoryId로 필터링하려면 brands를 통해 찾아야 함
      const brands = await db.collection('brands')
        .find({ categoryId: new ObjectId(categoryId) })
        .toArray();
      const brandIds = brands.map(b => b._id);
      
      if (brandIds.length > 0) {
        items = await db.collection('items')
          .find({ brandId: { $in: brandIds } })
          .toArray();
      }
    } else {
      items = await db.collection('items').find({}).toArray();
    }
    
    res.json(items.map(i => ({ ...i, id: i._id.toString() })));
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Items를 가져오는 중 오류가 발생했습니다.' });
  }
});

// ========== Orders API ==========
// 주문 생성
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await db.collection('orders').insertOne(orderData);
    res.json({ id: result.insertedId.toString(), ...orderData });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: '주문 생성 중 오류가 발생했습니다.' });
  }
});

// 특정 주문 가져오기
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await db.collection('orders').findOne({ _id: new ObjectId(orderId) });
    if (!order) {
      return res.status(404).json({ error: '주문을 찾을 수 없습니다.' });
    }
    res.json({ ...order, id: order._id.toString() });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: '주문을 가져오는 중 오류가 발생했습니다.' });
  }
});

// 사용자의 진행중인 주문 가져오기
app.get('/api/orders', async (req, res) => {
  try {
    const { userId, status } = req.query;
    let query = {};
    if (userId) {
      query.userId = userId;
    }
    if (status) {
      if (status === 'active') {
        query.status = { $in: ['received', 'cooking'] };
      } else {
        query.status = status;
      }
    }
    const orders = await db.collection('orders')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.json(orders.map(o => ({ ...o, id: o._id.toString() })));
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: '주문을 가져오는 중 오류가 발생했습니다.' });
  }
});

// 주문 상태 업데이트 (실시간 업데이트용)
app.patch('/api/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    await db.collection('orders').updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status, updatedAt: new Date().toISOString() } }
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: '주문 상태 업데이트 중 오류가 발생했습니다.' });
  }
});

// ========== Users API ==========
// 사용자 생성 (회원가입)
app.post('/api/users', async (req, res) => {
  try {
    const { userId, name, email, newsletter, authProvider } = req.body;
    
    // 이미 존재하는 사용자인지 확인
    const existingUser = await db.collection('users').findOne({ userId });
    if (existingUser) {
      return res.json({ ...existingUser, id: existingUser._id.toString() });
    }

    const userData = {
      userId,
      name,
      email,
      newsletter: newsletter || false,
      authProvider: authProvider || 'email', // 'email', 'google', 'naver', 'kakao'
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await db.collection('users').insertOne(userData);
    res.json({ id: result.insertedId.toString(), ...userData });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: '사용자 생성 중 오류가 발생했습니다.' });
  }
});

// 사용자 조회
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.collection('users').findOne({ userId });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    res.json({ ...user, id: user._id.toString() });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: '사용자를 가져오는 중 오류가 발생했습니다.' });
  }
});

// 사용자 정보 업데이트
app.patch('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    await db.collection('users').updateOne(
      { userId },
      { $set: updateData }
    );
    const user = await db.collection('users').findOne({ userId });
    res.json({ ...user, id: user._id.toString() });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: '사용자 정보 업데이트 중 오류가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

