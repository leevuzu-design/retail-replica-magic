import UserLayout from '@/components/UserLayout';
import { Package, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { key: 'all', label: 'Tất cả' },
  { key: 'unpaid', label: 'Chưa thanh toán' },
  { key: 'confirmed', label: 'Đã xác nhận' },
  { key: 'shipping', label: 'Đang đợi giao hàng' },
  { key: 'delivered', label: 'Đã nhận hàng' },
  { key: 'cancelled', label: 'Đã hủy' },
  { key: 'returned', label: 'Đã trả hàng' },
];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <UserLayout>
      {/* Tabs */}
      <div className="border-b border-border mb-8">
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
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

      {/* Empty State */}
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
    </UserLayout>
  );
};

export default OrdersPage;
