import { Package, FileText, UserCog, KeyRound, MapPin, Eye, Heart, Clock, MessageSquare, LogOut, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const accountItems = [
  { icon: Package, label: 'Đơn hàng của tôi', to: '/orders' },
  { icon: FileText, label: 'Bài viết của tôi', to: '/my-posts' },
  { icon: UserCog, label: 'Chỉnh sửa thông tin cá nhân', to: '/profile' },
  { icon: KeyRound, label: 'Đổi mật khẩu', to: '/change-password' },
  { icon: MapPin, label: 'Địa chỉ giao hàng', to: '/addresses' },
];

const productItems = [
  { icon: Eye, label: 'Sản phẩm đã xem', to: '/viewed' },
  { icon: Heart, label: 'Sản phẩm yêu thích', to: '/wishlist' },
  { icon: Clock, label: 'Sản phẩm chờ hàng về', to: '/waiting' },
  { icon: MessageSquare, label: 'Sản phẩm đã đánh giá', to: '/reviewed' },
];

const UserSidebar = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <User className="w-6 h-6 text-primary-foreground" />
          )}
        </div>
        <div className="min-w-0">
          <div className="font-semibold truncate">{profile?.display_name || user?.email?.split('@')[0]}</div>
          <div className="text-xs text-muted-foreground">MEMBER</div>
        </div>
      </div>

      <nav className="space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
              location.pathname === item.to ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
            )}
          >
            <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-border my-4" />

      <nav className="space-y-1">
        {productItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
              location.pathname === item.to ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
            )}
          >
            <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-border my-4" />

      <button
        onClick={signOut}
        className="w-full h-10 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
      >
        Đăng xuất
      </button>
    </aside>
  );
};

export default UserSidebar;
