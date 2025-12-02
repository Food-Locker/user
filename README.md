⚾ Food_Locker (User App)

야구장 관람객을 위한 **비대면 음식 주문 및 락커 픽업 서비스**의 사용자용(User) 모바일 웹 애플리케이션입니다.
사용자가 입력한 좌석 정보를 기반으로 **가장 가까운 락커를 자동으로 배정**하는 스마트한 시스템을 제공합니다.

## ✨ Key Features (주요 기능)

1.  **좌석 기반 자동 매칭 (Seat-Based Matching)**
    * 앱 진입 시 자신의 좌석(Block)을 입력합니다.
    * 주문 시 해당 좌석 구역(Zone)에 위치한 '사용 가능한 락커'가 자동으로 배정됩니다.
2.  **모바일 음식 주문**
    * 카테고리별 메뉴 확인 및 장바구니 담기.
    * **결제 시뮬레이션:** PG사 연동 없이 가상의 결제 프로세스(2초 로딩 후 승인)를 수행합니다.
3.  **실시간 상태 확인**
    * 주문 접수 -> 조리 중 -> **락커 적재 완료** 상태를 실시간으로 확인합니다.
4.  **비대면 픽업**
    * 배정된 락커의 위치(약도)와 락커 번호를 확인하고 음식을 수령합니다.

## 🛠 Tech Stack

* **Frontend:** React (Vite), Tailwind CSS
* **Database:** Firebase Firestore (Shared with Admin)
* **State Management:** Context API / Zustand (선택)
* **Deployment:** Vercel (Recommended)

## 🚀 Getting Started

### 1. Installation
```bash
git clone [repository-url]
cd food-locker-user
npm install
```

### 2. Environment Setup (.env)
프로젝트 루트에 `.env` 파일을 생성하고 Firebase 설정 정보를 입력하세요.

**방법 1: 예시 파일 복사**
```bash
cp env.example .env
```

**방법 2: 직접 생성**
프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 입력하세요:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Firebase 설정 값 확인 방법:**
> 1. [Firebase Console](https://console.firebase.google.com) 접속
> 2. 프로젝트 선택 > 프로젝트 설정 (⚙️ 아이콘)
> 3. 일반 탭 > 내 앱 > 웹 앱에서 설정 값 확인

### 3. Run Development Server
```bash
npm run dev
```
📂 Project Structure
/src
├── /assets         # 이미지 및 정적 파일
├── /components     # UI 컴포넌트 (Button, Card, Modal...)
├── /pages          # 페이지 (Home, Menu, Cart, OrderStatus...)
├── /context        # 전역 상태 (UserSeat, Cart...)
├── /lib            # Firebase 설정 및 유틸 함수
└── App.jsx