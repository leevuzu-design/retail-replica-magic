import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfileEditPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/addresses" element={<AddressesPage />} />
            <Route path="/viewed" element={<ViewedPage />} />
            <Route path="/waiting" element={<WaitingPage />} />
            <Route path="/reviewed" element={<ReviewedPage />} />
            <Route path="/my-posts" element={<MyPostsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
