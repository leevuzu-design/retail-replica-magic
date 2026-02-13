import PageLayout from '@/components/PageLayout';
import { Package, Search, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useState } from 'react';

const sampleOrders = [
  { id: 'LX202602001', date: '10/02/2026', total: 850000, status: 'delivered', items: 3, statusLabel: 'Đã giao hàng' },
  { id: 'LX202601025', date: '28/01/2026', total: 1250000, status: 'shipping', items: 2, statusLabel: 'Đang vận chuyển' },
  { id: 'LX202601012', date: '15/01/2026', total: 450000, status: 'processing', items: 1, statusLabel: 'Đang xử lý' },
  { id: 'LX202601005', date: '05/01/2026', total: 2100000, status: 'delivered', items: 5, statusLabel: 'Đã giao hàng' },
  { id: 'LX202512020', date: '20/12/2025', total: 680000, status: 'cancelled', items: 2, statusLabel: 'Đã hủy' },
];

const statusIcons: Record<string, React.ReactNode> = {
  delivered: <CheckCircle className="w-5 h-5 text-green-600" />,
  shipping: <Truck className="w-5 h-5 text-primary" />,
  processing: <Clock className="w-5 h-5 text-star" />,
  cancelled: <XCircle className="w-5 h-5 text-muted-foreground" />,
};

const statusColors: Record<string, string> = {
  delivered: 'bg-green-50 text-green-700',
  shipping: 'bg-accent text-accent-foreground',
  processing: 'bg-yellow-50 text-yellow-700',
  cancelled: 'bg-secondary text-muted-foreground',
};

const OrdersPage = () => {
  const [trackingId, setTrackingId] = useState('');

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-7 h-7 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Đơn Hàng</h1>
        </div>

        {/* Tracking */}
        <div className="bg-accent rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-3">Tra cứu đơn hàng</h2>
          <div className="flex gap-3 max-w-lg">
            <input
              type="text"
              placeholder="Nhập mã đơn hàng..."
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 h-11 px-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button className="h-11 px-6 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <Search className="w-4 h-4" /> Tra cứu
            </button>
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {sampleOrders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {statusIcons[order.status]}
                  <div>
                    <p className="font-semibold text-sm">Đơn hàng #{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date} · {order.items} sản phẩm</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                  {order.statusLabel}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Tổng tiền</span>
                <span className="font-bold text-price-sale">{new Intl.NumberFormat('vi-VN').format(order.total)}₫</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default OrdersPage;
