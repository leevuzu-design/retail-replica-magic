import PageLayout from '@/components/PageLayout';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { bestSellers, newArrivals } from '@/data/products';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const allProducts = [...bestSellers, ...newArrivals];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();

  const cartProducts = items
    .map((item) => {
      const product = allProducts.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (typeof allProducts[number] & { quantity: number })[];

  const subtotal = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalSaved = cartProducts.reduce(
    (sum, p) => sum + (p.originalPrice ? (p.originalPrice - p.price) * p.quantity : 0),
    0
  );

  const handleCheckout = () => {
    toast({
      title: 'Đặt hàng thành công! 🎉',
      description: `Đơn hàng ${formatPrice(subtotal)} đang được xử lý.`,
    });
    clearCart();
  };

  if (cartProducts.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag className="w-7 h-7 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">Giỏ Hàng</h1>
          </div>
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Giỏ hàng trống</p>
            <Link
              to="/"
              className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-7 h-7 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Giỏ Hàng</h1>
          <span className="text-sm text-muted-foreground">({cartProducts.length} sản phẩm)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-4 bg-card border border-border rounded-lg"
              >
                <Link to={`/product/${product.id}`} className="w-20 h-20 rounded-md overflow-hidden bg-secondary shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`} className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-bold text-price-sale">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-price-original line-through">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-bold">{formatPrice(product.price * product.quantity)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-5 sticky top-20">
              <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {totalSaved > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Tiết kiệm</span>
                    <span>-{formatPrice(totalSaved)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span className="text-primary font-medium">Miễn phí</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-base font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-price-sale">{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Button onClick={handleCheckout} className="w-full h-12 mt-5 text-base gap-2">
                Đặt hàng
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link
                to="/"
                className="block text-center text-sm text-muted-foreground hover:text-primary mt-3 transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CartPage;
