import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { WishlistProvider } from "@/hooks/useWishlist";
import { ViewedProvider } from "@/hooks/useViewedProducts";
import { CartProvider } from "@/hooks/useCart";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MagazinePage from "./pages/MagazinePage";
import CommunityPage from "./pages/CommunityPage";
import HotDealsPage from "./pages/HotDealsPage";
import StoresPage from "./pages/StoresPage";
import OrdersPage from "./pages/OrdersPage";
import LixicoinPage from "./pages/LixicoinPage";
import CashbackPage from "./pages/CashbackPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AddressesPage from "./pages/AddressesPage";
import ViewedPage from "./pages/ViewedPage";
import WaitingPage from "./pages/WaitingPage";
import ReviewedPage from "./pages/ReviewedPage";
import MyPostsPage from "./pages/MyPostsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartDrawer from "./components/CartDrawer";
import { useCart } from "@/hooks/useCart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const CartDrawerWrapper = () => {
  const { drawerOpen, closeDrawer } = useCart();
  return <CartDrawer open={drawerOpen} onClose={closeDrawer} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
        <ViewedProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <CartDrawerWrapper />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/magazine" element={<MagazinePage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/hot-deals" element={<HotDealsPage />} />
                  <Route path="/stores" element={<StoresPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/vutrucoin" element={<LixicoinPage />} />
                  <Route path="/cashback" element={<CashbackPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/sign-in" element={<SignInPage />} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/profile" element={<ProfileEditPage />} />
                  <Route path="/change-password" element={<ChangePasswordPage />} />
                  <Route path="/addresses" element={<AddressesPage />} />
                  <Route path="/viewed" element={<ViewedPage />} />
                  <Route path="/waiting" element={<WaitingPage />} />
                  <Route path="/reviewed" element={<ReviewedPage />} />
                  <Route path="/my-posts" element={<MyPostsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/customers" element={<AdminCustomers />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </ViewedProvider>
      </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
