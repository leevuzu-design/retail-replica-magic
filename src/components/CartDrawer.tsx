import { X, Minus, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { bestSellers, newArrivals } from '@/data/products';
import { Button } from '@/components/ui/button';

const allProducts = [...bestSellers, ...newArrivals];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeFromCart } = useCart();

  const cartProducts = items
    .map((item) => {
      const product = allProducts.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (typeof allProducts[number] & { quantity: number })[];

  const subtotal = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-foreground/40 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-bold">Giỏ hàng của bạn</h2>
          <button onClick={onClose} className="p-1 hover:text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cartProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm">Giỏ hàng trống</p>
            </div>
          ) : (
            cartProducts.map((product) => (
              <div key={product.id} className="flex gap-3">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="w-16 h-16 rounded-md overflow-hidden bg-secondary shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors leading-tight"
                    >
                      {product.name}
                    </Link>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-0.5 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-price-sale">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-price-original line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-0 mt-2 border border-border rounded w-fit">
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-medium">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartProducts.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tạm tính:</span>
              <span className="text-lg font-bold text-price-sale">{formatPrice(subtotal)}</span>
            </div>
            <Button asChild className="w-full h-11 text-base">
              <Link to="/checkout" onClick={onClose}>
                ĐẶT HÀNG NGAY
              </Link>
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Bạn sẽ nhận được <span className="font-bold text-foreground">{Math.floor(subtotal / 1000)} VUTRUCOIN</span> sau khi thanh toán
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
