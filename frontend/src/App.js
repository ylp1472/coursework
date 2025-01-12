import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '././pages/user/Home';
import RegisterPage from './pages/Register';
import LoginPage from '././pages/Login';
import ForgotPasswordPage from './pages/ForgotPassword';
import EmailVerificationPage from './pages/EmailVerification';
import ResetPasswordPage from './pages/ResetPassword';
import ResetPasswordResultPage from './pages/ResetPasswordResult';

import AdminPage from '././pages/admin/Admin';
import AdminUsersPage from './pages/admin/AdminUsers';
import AdminCategoriesPage from './pages/admin/AdminCategories';
import AdminProductsPage from './pages/admin/AdminProducts';
import AdminReservationsPage from './pages/admin/AdminReservations';
import AdminOrdersPage from './pages/admin/AdminOrders';
import AdminReviewsPage from './pages/admin/AdminReviews';
import AdminHelpdeskPage from './pages/admin/AdminHelpdesk';
import AdminHelpChatPage from './pages/admin/AdminHelpChat';

import ProductPage from './pages/user/Product';
import AllCategoriesPage from './pages/user/AllCategoriesPage';
import { SingleCategoryPage } from '././pages/user/SingleCategoryPage';

import CheckoutPage from './pages/user/Checkout';
import CheckoutResultPage from './pages/user/CheckoutResult';

import OrdersPage from './pages/user/Orders';

import ReservationsPage from './pages/user/Reservations';

import Profile from './pages/user/Profile';

import PrivacyPolicy from './pages/user/PrivacyPolicy';
import TermsAndConditions from './pages/user/TermsAndConditions';
import ReturnPolicy from './pages/user/ReturnPolicy';
import HelpCenterPage from './pages/user/HelpCenter';
import Article1 from './pages/user/helpcenter/Article1';
import Article2 from './pages/user/helpcenter/Article2';
import Article3 from './pages/user/helpcenter/Article3';
import Article4 from './pages/user/helpcenter/Article4';
import Article5 from './pages/user/helpcenter/Article5';
import Article6 from './pages/user/helpcenter/Article6';
import Article7 from './pages/user/helpcenter/Article7';
import Article8 from './pages/user/helpcenter/Article8';
import Article9 from './pages/user/helpcenter/Article9';
import Article10 from './pages/user/helpcenter/Article10';

import ErrorPage from './pages/user/ErrorPage';

import SearchResults from './pages/user/Search';

import FeedbackPage from './pages/user/Feedback';

import HelpChatPage from './pages/user/HelpChat';

import { CartProvider } from './contexts/CartContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const initialOptions = {
    "client-id": "AXPi5tROQlVtelf0DvLH1KEz17Q4dYDCQLtZpJWtA-PgeBHzOABZ-Uqyir12Q7ksxNX62uXKX6mWUEto",
    currency: "USD",
    intent: "capture"
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/forgotpassword/verify" element={<EmailVerificationPage />} />
            <Route path="/forgotpassword/reset" element={<ResetPasswordPage />} />
            <Route path="/forgotpassword/reset/result" element={<ResetPasswordResultPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/reservations" element={<AdminReservationsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/reviews" element={<AdminReviewsPage />} />
            <Route path="/admin/helpdesk" element={<AdminHelpdeskPage />} />
            <Route path="/admin/helpchat" element={<AdminHelpChatPage />} />
            <Route path="/categories" element={<AllCategoriesPage />} />
            <Route path="/categories/:categoryId" element={<SingleCategoryPage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout/result" element={<CheckoutResultPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/helpchat" element={<HelpChatPage />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/returnpolicy" element={<ReturnPolicy />} />
            <Route path="/helpcenter" element={<HelpCenterPage />} />
            <Route path="/helpcenter/article1" element={<Article1 />} />
            <Route path="/helpcenter/article2" element={<Article2 />} />
            <Route path="/helpcenter/article3" element={<Article3 />} />
            <Route path="/helpcenter/article4" element={<Article4 />} />
            <Route path="/helpcenter/article5" element={<Article5 />} />
            <Route path="/helpcenter/article6" element={<Article6 />} />
            <Route path="/helpcenter/article7" element={<Article7 />} />
            <Route path="/helpcenter/article8" element={<Article8 />} />
            <Route path="/helpcenter/article9" element={<Article9 />} />
            <Route path="/helpcenter/article10" element={<Article10 />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </PayPalScriptProvider>
  );
}

export default App;