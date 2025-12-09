# Food Locker Store - 매장 주문 관리 시스템

매장용 주문 관리 웹 애플리케이션입니다.

## 기술 스택

- React 18
- Vite
- Tailwind CSS
- Lucide React (아이콘)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 5174)
npm run dev

# 프로덕션 빌드
npm run build

# 매장 관리자 계정 생성 (brands마다 계정 생성)
npm run seed
```

## 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:3001
```

## 기능

- 매장 관리자 로그인 (brands별 계정)
- 실시간 주문 목록 조회
- 주문 상태 업데이트 (접수 → 조리 중 → 완료)
- 주문 상세 정보 확인 (야구장, 좌석 정보 포함)
- 통계 대시보드

## 매장 관리자 계정 생성

먼저 `server/seed.js`를 실행하여 기본 데이터(stadiums, categories, brands, items)를 생성한 후:

```bash
# Store 폴더에서 실행
npm run seed
```

이 명령어는 모든 brands마다 매장 관리자 계정을 생성합니다:
- 아이디: `brandname_brandId` (예: `tongbbap_abc123`)
- 비밀번호: `store123` (기본값)

## API 엔드포인트

백엔드 서버(`server/index.js`)와 통신합니다:

- `GET /api/orders` - 모든 주문 조회
- `PATCH /api/orders/:orderId/status` - 주문 상태 업데이트

