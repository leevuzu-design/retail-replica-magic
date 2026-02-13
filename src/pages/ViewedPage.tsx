import UserLayout from '@/components/UserLayout';
import ProductCard from '@/components/ProductCard';
import { Eye } from 'lucide-react';
import { useViewedProducts } from '@/hooks/useViewedProducts';
import { bestSellers, newArrivals } from '@/data/products';
import { Link } from 'react-router-dom';

const allProducts = [...bestSellers, ...newArrivals];

const ViewedPage = () => {
  const { viewedIds } = useViewedProducts();
  const products = viewedIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as typeof allProducts;

  return (
    <UserLayout>
      <h1 className="text-xl font-bold mb-6">Sản phẩm đã xem ({products.length})</h1>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Eye className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Bạn chưa xem sản phẩm nào</p>
          <p className="text-sm text-muted-foreground/70 mt-1 mb-4">Các sản phẩm bạn đã xem sẽ hiển thị ở đây</p>
          <Link to="/" className="text-primary hover:underline text-sm">Khám phá sản phẩm</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </UserLayout>
  );
};

export default ViewedPage;
