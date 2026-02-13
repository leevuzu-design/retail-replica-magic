import UserLayout from '@/components/UserLayout';
import { Package, ShoppingBag } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const tabs = [
  { key: 'all', label: 'Tất cả' },
  { key: 'unpaid', label: 'Chưa thanh toán' },
  { key: 'confirmed', label: 'Đã xác nhận' },
  { key: 'shipping', label: 'Đang đợi giao hàng' },
  { key: 'delivered', label: 'Đã nhận hàng' },
  { key: 'cancelled', label: 'Đã hủy' },
  { key: 'returned', label: 'Đã trả hàng' },
];

const statusLabels: Record<string, string> = {
  unpaid: 'Chưa thanh toán',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao hàng',
  delivered: 'Đã nhận hàng',
  cancelled: 'Đã hủy',
  returned: 'Đã trả hàng',
};

const statusColors: Record<string, string> = {
  unpaid: 'text-muted-foreground bg-secondary',
  confirmed: 'text-primary bg-accent',
  shipping: 'text-foreground bg-secondary',
  delivered: 'text-primary bg-accent',
  cancelled: 'text-destructive bg-destructive/10',
  returned: 'text-muted-foreground bg-secondary',
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

interface OrderItem {
  product_id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  original_price: number | null;
  quantity: number;
}

const OrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter((o: any) => o.status === activeTab);

  return (
    <UserLayout>
      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSearchParams(tab.key === 'all' ? {} : { tab: tab.key })}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-muted-foreground text-sm">Đang tải...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 mb-6 text-muted-foreground/20">
            <Package className="w-full h-full" strokeWidth={1} />
          </div>
          <p className="text-muted-foreground mb-6">Không tìm thấy đơn hàng</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-11 px-8 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order: any) => {
            const items = (order.items || []) as OrderItem[];
            const createdAt = new Date(order.created_at).toLocaleDateString('vi-VN', {
              day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
            });

            return (
              <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{createdAt}</span>
                    <span className="text-xs font-medium text-muted-foreground">{order.order_number}</span>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status] || 'bg-secondary text-muted-foreground'}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="p-4 space-y-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <Link to={`/product/${item.product_id}`} className="w-14 h-14 rounded-md overflow-hidden bg-secondary shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.product_id}`} className="text-sm line-clamp-1 hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-medium">{formatPrice(item.price)}</span>
                          <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {order.payment_method === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                  </span>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Tổng: </span>
                    <span className="text-base font-bold text-price-sale">{formatPrice(order.total_amount)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </UserLayout>
  );
};

export default OrdersPage;
