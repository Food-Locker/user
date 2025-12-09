# MongoDB 마이그레이션 가이드

이 프로젝트는 Firebase Firestore에서 MongoDB로 마이그레이션되었습니다.

## 📋 변경 사항

### 1. 데이터베이스 구조
- **Firebase Firestore** (서브컬렉션 구조) → **MongoDB** (관계형 구조)
- Stadiums → Categories → Brands → Items 계층 구조를 참조 기반으로 변경

### 2. 백엔드 API 서버
- Express.js 기반 REST API 서버 추가 (`server/` 폴더)
- MongoDB 연결 및 CRUD 작업 처리

### 3. 프론트엔드 변경
- Firebase Firestore 직접 호출 → MongoDB API 호출로 변경
- `src/lib/mongodb.js`에 API 클라이언트 추가

## 🚀 설정 방법

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Firebase Auth (인증용 - 여전히 사용)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# MongoDB
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.ucxdbka.mongodb.net/?appName=Cluster0

# API Server
VITE_API_BASE_URL=http://localhost:3001
```

### 2. 백엔드 서버 의존성 설치

```bash
cd server
npm install
```

### 3. 데이터베이스 시드 (샘플 데이터 삽입)

```bash
cd server
npm run seed
```

이 명령어는 다음을 생성합니다:
- 2개의 Stadiums (고척 스카이돔, 잠실 야구장)
- 4개의 Categories (Sandwich, Pizza, Burger, Drinks)
- 4개의 Brands
- 여러 Items

### 4. 백엔드 서버 실행

```bash
cd server
npm start
```

서버는 기본적으로 `http://localhost:3001`에서 실행됩니다.

### 5. 프론트엔드 실행

```bash
npm run dev
```

## 📁 프로젝트 구조

```
food-locker-user/
├── server/                 # 백엔드 API 서버
│   ├── index.js           # Express 서버 메인 파일
│   ├── seed.js            # 데이터베이스 시드 스크립트
│   └── package.json       # 서버 의존성
├── src/
│   ├── lib/
│   │   ├── firebase.js    # Firebase Auth 설정 (인증용)
│   │   └── mongodb.js     # MongoDB API 클라이언트
│   └── pages/             # 페이지 컴포넌트들 (MongoDB API 사용)
└── .env                    # 환경 변수
```

## 🔌 API 엔드포인트

### Stadiums
- `GET /api/stadiums` - 모든 Stadiums 가져오기

### Categories
- `GET /api/stadiums/:stadiumId/categories` - 특정 Stadium의 Categories 가져오기

### Brands
- `GET /api/categories/:categoryId/brands` - 특정 Category의 Brands 가져오기

### Items
- `GET /api/brands/:brandId/items` - 특정 Brand의 Items 가져오기
- `GET /api/items?categoryId=xxx` - 카테고리별 모든 Items 가져오기

### Orders
- `POST /api/orders` - 주문 생성
- `GET /api/orders/:orderId` - 특정 주문 가져오기
- `GET /api/orders?userId=xxx&status=active` - 사용자 주문 목록
- `PATCH /api/orders/:orderId/status` - 주문 상태 업데이트

## 🔄 실시간 업데이트

Firebase의 `onSnapshot` 대신 폴링(Polling) 방식을 사용합니다:
- `DeliveryStatusPage`: 2초마다 주문 상태 확인
- `OrderStatusPage`: 3초마다 진행중인 주문 목록 업데이트

## 📝 주의사항

1. **Firebase Auth는 여전히 사용**: 사용자 인증은 Firebase Auth를 계속 사용합니다.
2. **로컬 개발**: 백엔드 서버와 프론트엔드를 동시에 실행해야 합니다.
3. **프로덕션 배포**: 백엔드 서버를 별도로 배포하고 `VITE_API_BASE_URL`을 프로덕션 URL로 변경해야 합니다.

## 🛠 문제 해결

### MongoDB 연결 오류
- `.env` 파일에 `MONGODB_URI`가 올바르게 설정되었는지 확인
- MongoDB Atlas에서 IP 화이트리스트 설정 확인

### API 호출 실패
- 백엔드 서버가 실행 중인지 확인 (`http://localhost:3001`)
- CORS 설정 확인 (서버의 `cors()` 미들웨어)

### 데이터가 표시되지 않음
- `npm run seed`로 샘플 데이터가 삽입되었는지 확인
- MongoDB Atlas에서 데이터베이스와 컬렉션이 생성되었는지 확인

