import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import { bestSellers, newArrivals } from '@/data/products';
import { Flame, Clock, Zap } from 'lucide-react';

const allDeals = [...bestSellers.filter(p => p.discount), ...newArrivals.filter(p => p.discount)];

const HotDealsPage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-badge-hot text-primary-foreground rounded-xl p-6 md:p-10 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="w-8 h-8" />
          <h1 className="text-2xl md:text-3xl font-bold">Hot Deals</h1>
        </div>
        <p className="text-primary-foreground/80 mb-4">Ưu đãi cực sốc - Số lượng có hạn!</p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-primary-foreground/20 rounded-lg px-4 py-2">
            <Clock className="w-5 h-5" />
            <div>
              <p className="text-xs opacity-70">Kết thúc sau</p>
              <p className="font-bold">02 : 15 : 30</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Giảm đến 50%</span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allDeals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </PageLayout>
);

export default HotDealsPage;
