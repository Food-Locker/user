import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import useSeatStore from './store/seatStore';

// Pages
import SplashPage from './pages/SplashPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import LockerInfoPage from './pages/LockerInfoPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import MyPage from './pages/MyPage';
import CustomerServicePage from './pages/CustomerServicePage';
import CustomerServiceInquiryPage from './pages/CustomerServiceInquiryPage';
import CustomerServiceConfirmPage from './pages/CustomerServiceConfirmPage';
import ItemDetailPage from './pages/ItemDetailPage';
import WishlistPage from './pages/WishlistPage';

// Components
import SeatSelectionModal from './components/SeatSelectionModal';
import BottomNavigation from './components/BottomNavigation';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { seatBlock, seatNumber, hasSeat } = useSeatStore();
  const [showSeatModal, setShowSeatModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // 로그인된 사용자가 있고 좌석 정보가 없으면 좌석 선택 모달 표시
    if (user && !hasSeat() && !loading) {
      setShowSeatModal(true);
    }
  }, [user, loading, hasSeat]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  const isAuthPage = window.location.pathname === '/signin' || 
                     window.location.pathname === '/signup' || 
                     window.location.pathname === '/';

  return (
    <Router>
      <div className="min-h-screen bg-white mobile-container">
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route 
            path="/signin" 
            element={user ? <Navigate to="/home" /> : <SignInPage />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/home" /> : <SignUpPage />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={user ? <HomePage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/search" 
            element={user ? <SearchPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/cart" 
            element={user ? <CartPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <ProfilePage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/profile/edit" 
            element={user ? <EditProfilePage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/order" 
            element={user ? <OrderPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/order/history" 
            element={user ? <OrderHistoryPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/payment" 
            element={user ? <PaymentPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/payment/success" 
            element={user ? <PaymentSuccessPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/locker/:orderId" 
            element={user ? <LockerInfoPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/settings" 
            element={user ? <SettingsPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/notifications" 
            element={user ? <NotificationsPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/mypage" 
            element={user ? <MyPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/customer-service" 
            element={user ? <CustomerServicePage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/customer-service/inquiry" 
            element={user ? <CustomerServiceInquiryPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/customer-service/confirm" 
            element={user ? <CustomerServiceConfirmPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/item/:id" 
            element={user ? <ItemDetailPage /> : <Navigate to="/signin" />} 
          />
          <Route 
            path="/wishlist" 
            element={user ? <WishlistPage /> : <Navigate to="/signin" />} 
          />
        </Routes>

        {/* 좌석 선택 모달 */}
        {user && showSeatModal && (
          <SeatSelectionModal 
            isOpen={showSeatModal}
            onClose={() => setShowSeatModal(false)}
            required={true}
          />
        )}

        {/* Bottom Navigation - 인증된 페이지에서만 표시 */}
        {user && !isAuthPage && <BottomNavigation />}
      </div>
    </Router>
  );
}

export default App;

