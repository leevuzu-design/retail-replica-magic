import AdminLayout from '@/components/AdminLayout';
import { ShoppingCart, Package, Users, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [ordersRes, productsRes, customersRes] = await Promise.all([
        supabase.from('orders').select('id, total_amount, status, created_at'),
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
      ]);

      const orders = ordersRes.data || [];
      const totalRevenue = orders.reduce((s: number, o: any) => s + (o.total_amount || 0), 0);
      const confirmedOrders = orders.filter((o: any) => o.status === 'confirmed').length;

      return {
        totalOrders: orders.length,
        totalRevenue,
        confirmedOrders,
        totalProducts: productsRes.count || 0,
        totalCustomers: customersRes.count || 0,
      };
    },
  });

  const cards = [
    { icon: DollarSign, label: 'Doanh thu', value: formatPrice(stats?.totalRevenue || 0), color: 'text-primary', bg: 'bg-accent' },
    { icon: ShoppingCart, label: 'Đơn hàng', value: stats?.totalOrders || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Package, label: 'Sản phẩm', value: stats?.totalProducts || 0, color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Users, label: 'Khách hàng', value: stats?.totalCustomers || 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Tổng quan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-lg font-bold mb-4">Đơn hàng gần đây</h2>
        <p className="text-sm text-muted-foreground">Xem tất cả đơn hàng trong mục Đơn hàng.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
