import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MagazinePage from "./pages/MagazinePage";
import CommunityPage from "./pages/CommunityPage";
import HotDealsPage from "./pages/HotDealsPage";
import BrandsPage from "./pages/BrandsPage";
import ReferralPage from "./pages/ReferralPage";
import StoresPage from "./pages/StoresPage";
import OrdersPage from "./pages/OrdersPage";
import LixicoinPage from "./pages/LixicoinPage";
import CashbackPage from "./pages/CashbackPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DownloadAppPage from "./pages/DownloadAppPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/hot-deals" element={<HotDealsPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/lixicoin" element={<LixicoinPage />} />
          <Route path="/cashback" element={<CashbackPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/download-app" element={<DownloadAppPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
