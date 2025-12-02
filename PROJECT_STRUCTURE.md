# Food Locker User - 프로젝트 구조

## 📁 폴더 구조

```
food-locker-user/
├── public/                 # 정적 파일
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── BottomNavigation.jsx
│   │   └── SeatSelectionModal.jsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── SplashPage.jsx
│   │   ├── SignInPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── ItemDetailPage.jsx
│   │   ├── PaymentPage.jsx
│   │   ├── PaymentSuccessPage.jsx
│   │   ├── LockerInfoPage.jsx
│   │   ├── OrderPage.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── EditProfilePage.jsx
│   │   ├── MyPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── CustomerServicePage.jsx
│   │   ├── CustomerServiceInquiryPage.jsx
│   │   ├── CustomerServiceConfirmPage.jsx
│   │   └── WishlistPage.jsx
│   ├── store/             # Zustand 상태 관리
│   │   ├── seatStore.js   # 좌석 정보 전역 상태
│   │   └── cartStore.js   # 장바구니 전역 상태
│   ├── lib/               # 라이브러리 설정
│   │   └── firebase.js    # Firebase 초기화
│   ├── App.jsx            # 메인 앱 컴포넌트 (라우팅)
│   ├── main.jsx           # 진입점
│   └── index.css          # 전역 스타일
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js     # Tailwind CSS 설정 (그린 컬러 테마)
├── postcss.config.js
└── README.md
```

## 🎨 주요 기능

### 1. 좌석 선택 시스템
- **위치**: `src/store/seatStore.js`
- **기능**: 사용자 좌석 정보(블록, 번호)를 전역으로 관리
- **저장**: localStorage에 영구 저장
- **사용**: 앱 최초 진입 시 또는 주문 전 필수 입력

### 2. 장바구니 시스템
- **위치**: `src/store/cartStore.js`
- **기능**: 메뉴 아이템 추가/삭제/수량 조절
- **저장**: localStorage에 영구 저장

### 3. 결제 시뮬레이션
- **위치**: `src/pages/PaymentPage.jsx`
- **기능**: 2초 대기 후 결제 성공 처리
- **플로우**: PaymentPage → PaymentSuccessPage → LockerInfoPage

### 4. 락커 정보 표시
- **위치**: `src/pages/LockerInfoPage.jsx`
- **기능**: 배정된 락커 번호, 비밀번호, QR 코드 표시
- **시뮬레이션**: 주문 후 2초 뒤 락커 정보 생성

## 🔐 Firebase 설정

Firebase 설정은 환경 변수로 관리됩니다:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎨 디자인 시스템

### 색상 (Tailwind Config)
- **Primary Green**: `#22C55E` (메인 컬러)
- **Primary Dark**: `#16A34A`
- **Primary Light**: `#4ADE80`
- **Secondary Gray**: `#F3F4F6`

### 반응형
- 모바일 퍼스트 디자인
- 최대 너비: `max-w-md` (모바일 컨테이너)
- Bottom Navigation Bar 고정

## 🚀 실행 방법

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
`.env` 파일을 생성하고 Firebase 설정 정보를 입력하세요.

3. 개발 서버 실행:
```bash
npm run dev
```

4. 빌드:
```bash
npm run build
```

## 📱 주요 라우트

- `/` - 스플래시 화면
- `/signin` - 로그인
- `/signup` - 회원가입
- `/home` - 메인 홈 (메뉴 브라우징)
- `/search` - 검색/필터
- `/cart` - 장바구니
- `/item/:id` - 아이템 상세
- `/payment` - 결제 화면
- `/payment/success` - 결제 성공
- `/locker/:orderId` - 락커 정보
- `/order` - 주문하기
- `/order/history` - 주문 내역
- `/profile` - 프로필
- `/mypage` - 마이페이지
- `/settings` - 설정
- `/notifications` - 알림
- `/customer-service` - 고객센터

## 🔄 상태 관리

### Zustand Stores
1. **seatStore**: 좌석 정보 관리
2. **cartStore**: 장바구니 관리

모든 상태는 localStorage에 자동 저장되어 새로고침 후에도 유지됩니다.

