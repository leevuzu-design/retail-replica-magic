import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { bestSellers, newArrivals } from '@/data/products';
import { Link } from 'react-router-dom';

const allProducts = [...bestSellers, ...newArrivals];

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const products = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-7 h-7 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Sản Phẩm Yêu Thích</h1>
          <span className="text-sm text-muted-foreground">({products.length})</span>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Chưa có sản phẩm yêu thích nào</p>
            <p className="text-sm text-muted-foreground mb-4">Hãy thêm sản phẩm yêu thích để dễ dàng theo dõi</p>
            <Link to="/" className="text-primary hover:underline text-sm">Khám phá sản phẩm</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default WishlistPage;
