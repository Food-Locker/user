# 화면 캡처 가이드

이 폴더는 앱의 각 페이지 스크린샷을 저장하는 용도입니다.

## 페이지 목록

### 인증 관련
- `/` - SplashPage (스플래시 화면)
- `/signin` - SignInPage (로그인)
- `/signup` - SignUpPage (회원가입)

### 메인 페이지
- `/home` - HomePage (홈 - 카테고리 및 메뉴)
- `/search` - SearchPage (야구장 검색 및 메뉴 탐색)

### 주문 관련
- `/cart` - CartPage (장바구니)
- `/payment` - PaymentPage (결제 화면)
- `/delivery-status/:orderId` - DeliveryStatusPage (배달 현황)
- `/order/status` - OrderStatusPage (주문 현황)
- `/order/history` - OrderHistoryPage (주문 내역)

### 기타
- `/mypage` - MyPage (마이페이지)
- `/wishlist` - WishlistPage (관심목록)

## 캡처 방법

1. 개발 서버 실행: `npm run dev`
2. 각 페이지로 이동하여 스크린샷 캡처
3. 파일명 형식: `페이지명_설명.png` (예: `HomePage_메인화면.png`)

## 권장 캡처 도구

- 브라우저 개발자 도구 (F12) → 디바이스 모드
- 모바일 에뮬레이터
- 실제 모바일 기기

