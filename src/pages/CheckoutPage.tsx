import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, ShoppingBag, CreditCard, Truck, FileText, Minus, Plus, ChevronRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { bestSellers, newArrivals } from '@/data/products';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const allProducts = [...bestSellers, ...newArrivals];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const paymentMethods = [
  { id: 'cod', label: 'Tiền mặt (COD)', desc: 'Thanh toán khi nhận hàng' },
  { id: 'bank', label: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản trước khi giao' },
];

const CheckoutPage = () => {
  const { items, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [note, setNote] = useState('');

  const { data: addresses = [] } = useQuery({
    queryKey: ['checkout-addresses'],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });
      return data || [];
    },
    enabled: !!user,
  });

  const defaultAddress = addresses.find((a) => a.is_default) || addresses[0];

  const cartProducts = items
    .map((item) => {
      const product = allProducts.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (typeof allProducts[number] & { quantity: number })[];

  const subtotal = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shippingFee = subtotal >= 500000 ? 0 : 25000;
  const shippingDiscount = shippingFee;
  const total = subtotal + shippingFee - shippingDiscount;

  const [ordering, setOrdering] = useState(false);

  const handleOrder = async () => {
    if (!user) {
      toast({ title: 'Vui lòng đăng nhập để đặt hàng', variant: 'destructive' });
      navigate('/sign-in');
      return;
    }
    if (!defaultAddress) {
      toast({ title: 'Vui lòng thêm địa chỉ giao hàng', variant: 'destructive' });
      navigate('/addresses');
      return;
    }

    setOrdering(true);
    try {
      const orderItems = cartProducts.map((p) => ({
        product_id: p.id,
        name: p.name,
        brand: p.brand,
        image: p.image,
        price: p.price,
        original_price: p.originalPrice || null,
        quantity: p.quantity,
      }));

      const { error } = await supabase.from('orders').insert({
        user_id: user.id,
        items: orderItems,
        subtotal,
        shipping_fee: shippingFee,
        shipping_discount: shippingDiscount,
        total_amount: total,
        status: 'confirmed',
        payment_method: paymentMethod,
        shipping_address: {
          recipient_name: defaultAddress.recipient_name,
          phone: defaultAddress.phone,
          province: defaultAddress.province,
          district: defaultAddress.district,
          ward: defaultAddress.ward,
          street_address: defaultAddress.street_address,
        },
        note: note || null,
      } as any);

      if (error) throw error;

      toast({ title: 'Đặt hàng thành công! 🎉', description: `Đơn hàng ${formatPrice(total)} đang được xử lý.` });
      clearCart();
      navigate('/orders');
    } catch (err: any) {
      toast({ title: 'Đặt hàng thất bại', description: err.message, variant: 'destructive' });
    } finally {
      setOrdering(false);
    }
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="bg-background border-b border-border py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-[0.3em]">VUTRU</Link>
          </div>
        </div>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Chưa có sản phẩm nào</p>
          <Link to="/" className="text-primary hover:underline text-sm">Tiếp tục mua sắm</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Mini header */}
      <div className="bg-background border-b border-border py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-[0.3em]">VUTRU</Link>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">MUA THÊM</Link>
            </Button>
            <Button size="sm" onClick={handleOrder} disabled={ordering}>
              {ordering ? 'Đang xử lý...' : 'ĐẶT HÀNG'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mua hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Address */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-bold uppercase tracking-wide">ĐỊA CHỈ NHẬN HÀNG</span>
              </div>
              {defaultAddress ? (
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">{defaultAddress.recipient_name}</span>
                    <span className="text-muted-foreground"> — {defaultAddress.phone}</span>
                    <p className="text-muted-foreground mt-0.5">
                      {defaultAddress.street_address}, {defaultAddress.ward}, {defaultAddress.district}, {defaultAddress.province}
                    </p>
                  </div>
                  <Link to="/addresses" className="text-primary text-sm hover:underline shrink-0">Thay đổi</Link>
                </div>
              ) : (
                <Link to="/addresses" className="text-primary text-sm hover:underline">
                  Nhập địa chỉ giao hàng
                </Link>
              )}
            </div>

            {/* Cart items */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    GIỎ HÀNG ({cartProducts.length} SẢN PHẨM)
                  </span>
                </div>
                <Link to="/cart" className="text-primary text-sm hover:underline">Sửa</Link>
              </div>
              <div className="space-y-4">
                {cartProducts.map((product) => (
                  <div key={product.id} className="flex gap-4">
                    <Link to={`/product/${product.id}`} className="w-16 h-16 rounded-md overflow-hidden bg-secondary shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-2">{product.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-price-sale">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-price-original line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-0 mt-2 border border-border rounded w-fit">
                        <button onClick={() => updateQuantity(product.id, product.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium">{product.quantity}</span>
                        <button onClick={() => updateQuantity(product.id, product.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-secondary transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-bold uppercase tracking-wide">PHƯƠNG THỨC THANH TOÁN</span>
                <span className="text-sm text-muted-foreground">({paymentMethods.find((m) => m.id === paymentMethod)?.label})</span>
              </div>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                      paymentMethod === method.id ? 'border-primary bg-accent' : 'border-border hover:bg-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-primary"
                    />
                    <div>
                      <p className="text-sm font-medium">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-bold uppercase tracking-wide">PHƯƠNG THỨC GIAO HÀNG</span>
              </div>
              <p className="text-sm text-muted-foreground">Giao hàng tiêu chuẩn (2-5 ngày)</p>
            </div>

            {/* Note */}
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-bold uppercase tracking-wide">KHÁC (GHI CHÚ)</span>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú cho đơn hàng..."
                className="w-full border border-border rounded-md p-3 text-sm bg-background resize-none h-20 focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          {/* Right column - Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-5 sticky top-20">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tiền hàng</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {shippingFee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                )}
                {shippingDiscount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>🚚 Giảm phí giao hàng</span>
                    <span>-{formatPrice(shippingDiscount)}</span>
                  </div>
                )}
                <div className="border-t border-dashed border-border pt-3 flex justify-between font-bold text-base">
                  <span>Tổng tiền</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Button onClick={handleOrder} disabled={ordering} className="w-full h-11 mt-5 text-base">
                {ordering ? 'Đang xử lý...' : 'ĐẶT HÀNG'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
