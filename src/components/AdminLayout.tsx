import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, ChevronLeft, Store } from 'lucide-react';
import type { ReactNode } from 'react';
import { AdminGuard } from '@/hooks/useAdmin';

const navItems = [
  { icon: LayoutDashboard, label: 'Tổng quan', to: '/admin' },
  { icon: ShoppingCart, label: 'Đơn hàng', to: '/admin/orders' },
  { icon: Package, label: 'Sản phẩm', to: '/admin/products' },
  { icon: Users, label: 'Khách hàng', to: '/admin/customers' },
  { icon: Settings, label: 'Cài đặt', to: '/admin/settings' },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-secondary">
        {/* Sidebar */}
        <aside className="w-60 bg-card border-r border-border flex flex-col shrink-0">
          <div className="p-4 border-b border-border">
            <Link to="/admin" className="text-lg font-bold tracking-widest">VUTRU</Link>
            <p className="text-xs text-muted-foreground mt-0.5">Admin Panel</p>
          </div>
          <nav className="flex-1 py-2">
            {navItems.map((item) => {
              const active = location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors mx-2 rounded-md ${
                    active ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-border">
            <Link to="/" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-2">
              <Store className="w-4 h-4" />
              Về trang cửa hàng
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
};

export default AdminLayout;
