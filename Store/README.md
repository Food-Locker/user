# Food Locker Store App

매장용 주문 관리 웹 애플리케이션입니다. 매장 관리자가 주문을 확인하고 상태를 업데이트할 수 있습니다.

## 기술 스택

- React 18
- Vite
- Tailwind CSS
- Lucide React (아이콘)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어서 MongoDB URI와 API 서버 URL을 입력하세요

# 개발 서버 실행 (포트 5174)
npm run dev

# 매장 관리자 계정 생성
npm run seed
```

## 환경 변수

`.env` 파일에 다음 변수를 설정하세요:

### MongoDB (seed.js 실행용)
- `MONGODB_URI`: MongoDB 연결 URI

### API 서버
- `VITE_API_BASE_URL`: 백엔드 API 서버 URL (예: `http://localhost:3001`)

## 기능

- 🔐 매장 관리자 로그인 (브랜드별 계정)
- 📋 실시간 주문 목록 조회
- 🔄 주문 상태 업데이트 (접수 → 조리 중 → 조리 완료 → 락커 배달 완료)
- 📊 통계 대시보드
- 👑 전체 주문 관리 (슈퍼 관리자 계정)

## 매장 관리자 계정 생성

먼저 `backend` 프로젝트의 `seed.js`를 실행하여 기본 데이터(stadiums, categories, brands, items)를 생성한 후:

```bash
# store 폴더에서 실행
npm run seed
```

이 명령어는 모든 brands마다 매장 관리자 계정을 생성합니다:
- 아이디: `brandname_brandId` (예: `tongbbap_abc123`)
- 비밀번호: `store123` (기본값)

또한 전체 주문 관리자 계정도 생성됩니다:
- 아이디: `admin`
- 비밀번호: `admin123`

## API 엔드포인트

백엔드 서버(`backend/index.js`)와 통신합니다:

- `POST /api/store-managers/login` - 매장 관리자 로그인
- `GET /api/orders` - 주문 조회 (brandId 필터링)
- `PATCH /api/orders/:orderId/status` - 주문 상태 업데이트
- `GET /api/brands/:brandId` - 브랜드 정보 조회
- `GET /api/stadiums` - 야구장 목록 조회

## 백엔드 서버 연동

이 앱은 별도의 백엔드 API 서버와 통신합니다. 백엔드 서버가 실행 중이어야 정상적으로 작동합니다.

백엔드 서버 실행:
```bash
cd ../backend
npm install
npm start
```

## 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.
