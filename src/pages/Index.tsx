import SiteHeader from '@/components/SiteHeader';
import NavBar from '@/components/NavBar';
import HeroBanner from '@/components/HeroBanner';
import PromoBanner from '@/components/PromoBanner';
import ProductSection from '@/components/ProductSection';
import CategoryGrid from '@/components/CategoryGrid';
import SiteFooter from '@/components/SiteFooter';
import { bestSellers, newArrivals } from '@/data/products';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <NavBar />
      <main className="flex-1">
        <HeroBanner />
        <PromoBanner />
        <ProductSection title="Box Bán Chạy" products={bestSellers} />
        <ProductSection title="Mua Lẻ Mới Nhất" products={newArrivals} />
        <CategoryGrid />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
