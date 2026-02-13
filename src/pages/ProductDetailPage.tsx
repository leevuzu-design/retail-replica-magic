import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ChevronRight, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import { bestSellers, newArrivals, type Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWishlist } from '@/hooks/useWishlist';
import { useViewedProducts } from '@/hooks/useViewedProducts';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

const allProducts = [...bestSellers, ...newArrivals];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addViewed } = useViewedProducts();
  const { addToCart } = useCart();

  const liked = product ? isWishlisted(product.id) : false;

  useEffect(() => {
    if (product) addViewed(product.id);
  }, [product?.id]);

  if (!product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <Link to="/" className="text-primary hover:underline">Quay về trang chủ</Link>
        </div>
      </PageLayout>
    );
  }

  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 5);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary border border-border">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.badge && (
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-sm ${
                product.badge === 'hot' ? 'bg-badge-hot text-primary-foreground' :
                product.badge === 'sale' ? 'bg-badge-sale text-primary-foreground' :
                product.badge === 'new' ? 'bg-foreground text-background' :
                'bg-accent text-accent-foreground'
              }`}>
                {product.badge === 'hot' ? 'HOT' : product.badge === 'sale' ? 'SALE' : product.badge === 'new' ? 'MỚI' : 'QUÀ'}
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{product.brand}</p>
            <h1 className="text-xl md:text-2xl font-bold leading-tight mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-star text-star' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} đánh giá)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-price-sale">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-price-original line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-semibold text-primary bg-accent px-2 py-0.5 rounded">-{discountPercent}%</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Số lượng:</span>
              <div className="flex items-center border border-border rounded-md">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <Button className="flex-1 h-12 text-base gap-2" onClick={() => { addToCart(product.id, quantity); toast({ title: 'Đã thêm vào giỏ hàng', description: `${product.name} x${quantity}` }); }}>
                <ShoppingBag className="w-5 h-5" />
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 ${liked ? 'text-primary border-primary' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-primary' : ''}`} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-border pt-5">
              {[
                { icon: Truck, text: 'Giao hàng toàn quốc' },
                { icon: RotateCcw, text: 'Đổi trả 30 ngày' },
                { icon: Shield, text: 'Hàng chính hãng' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mt-10">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 gap-6">
            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-sm font-medium">
              Mô tả sản phẩm
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 text-sm font-medium">
              Đánh giá ({product.reviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>{product.name} từ thương hiệu {product.brand} – sản phẩm được yêu thích với công thức đột phá, mang lại hiệu quả vượt trội cho làn da của bạn.</p>
              <p>Thành phần chính bao gồm các hoạt chất dưỡng da cao cấp, giúp cấp ẩm sâu, nuôi dưỡng và bảo vệ da suốt cả ngày dài.</p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <p className="text-sm text-muted-foreground">Chưa có đánh giá nào cho sản phẩm này.</p>
          </TabsContent>
        </Tabs>

        <section className="mt-12 mb-8">
          <h2 className="text-xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
