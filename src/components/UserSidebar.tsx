import { Package, FileText, UserCog, KeyRound, MapPin, Eye, Heart, Clock, MessageSquare, User, Wallet, Award, Gift, Ticket, ChevronRight, CreditCard, Truck, CheckCircle, XCircle, Store, Plus, Minus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const orderShortcuts = [
  { icon: CreditCard, label: 'Chưa thanh toán', to: '/orders?tab=unpaid' },
  { icon: CheckCircle, label: 'Đã xác nhận', to: '/orders?tab=confirmed' },
  { icon: Truck, label: 'Đang đợi giao hàng', to: '/orders?tab=shipping' },
  { icon: Package, label: 'Đã nhận hàng', to: '/orders?tab=delivered' },
];

const orderExtras = [
  { icon: Store, label: 'Mua tại cửa hàng', to: '/orders?tab=store' },
  { icon: XCircle, label: 'Đơn hàng đã hủy', to: '/orders?tab=cancelled' },
];

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

const infoItems = [
  { icon: Ticket, label: 'Mã giảm giá', to: '/cashback', badge: 'Hot' },
  { icon: Award, label: 'Ưu đãi thành viên', to: '/membership' },
  { icon: Wallet, label: 'Lịch sử giao dịch', to: '/transactions' },
  { icon: Gift, label: 'Giới thiệu bạn bè', to: '/referral', subtitle: 'Nhận ngay 500.000đ cho mỗi đơn hàng gi...' },
];

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CollapsibleSection = ({ title, defaultOpen = false, children }: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-1 text-sm font-semibold hover:text-primary transition-colors"
      >
        {title}
        {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
};

const UserSidebar = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-72 shrink-0">
      {/* Profile Card */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <User className="w-7 h-7 text-primary-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-base truncate">{profile?.display_name || user?.email?.split('@')[0]}</div>
            <span className="inline-block text-[10px] font-bold bg-foreground text-background px-2 py-0.5 rounded mt-0.5">MEMBER</span>
          </div>
        </div>

        {/* Wallet & Coin */}
        <div className="flex gap-4 mb-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">💳</span>
            <div>
              <div className="text-muted-foreground">Số dư Ví</div>
              <div className="font-semibold">0 đ</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500">🪙</span>
            <div>
              <div className="text-muted-foreground">Vutrucoin</div>
              <div className="font-semibold">0 Vutrucoin</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <p className="text-xs text-muted-foreground mb-1.5">Kiếm thêm <span className="font-semibold text-foreground">100 điểm</span> để lên hạng <span className="font-semibold text-foreground">Silver</span></p>
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-foreground rounded-full" style={{ width: '0%' }} />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-muted-foreground rounded-full border-2 border-background" />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
            <span>MEMBER</span>
            <span>SILVER</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-secondary/50 rounded-lg p-3 mb-3 text-xs">
          <p className="font-semibold text-primary mb-1">Quyền lợi khi lên hạng Silver</p>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <Wallet className="w-3 h-3" /> Hoàn tiền lên đến 0%
            </li>
            <li className="flex items-center gap-1.5">
              <Award className="w-3 h-3" /> Nhận 1 Vutrucoin cho mỗi 1.000 đ khi mua hàng
            </li>
          </ul>
        </div>

        <p className="text-xs text-primary cursor-pointer hover:underline mb-3">
          Vui lòng cập nhật số điện thoại để nhận thêm nhiều ưu đãi. <span className="font-semibold">Cập nhật ngay</span>
        </p>

        {/* Birthday Banner */}
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-lg p-4 text-center mb-4">
          <div className="text-2xl mb-1">🎂</div>
          <p className="text-sm font-bold text-primary">CẬP NHẬT NGÀY SINH</p>
          <p className="text-xs text-muted-foreground mb-2">Để Vutru chuẩn bị quà sinh nhật cho bạn nhé!</p>
          <button className="h-8 px-5 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:opacity-90 transition-opacity">
            Cập nhật ngay
          </button>
        </div>
      </div>

      {/* Order History */}
      <div className="border-t border-border py-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-sm font-semibold">Lịch sử mua hàng</span>
          <Link to="/orders" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-0.5">
            Xem tất cả <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {orderShortcuts.map((item) => (
            <Link key={item.label} to={item.to} className="flex flex-col items-center gap-1 text-center hover:text-primary transition-colors">
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-[10px] leading-tight">{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex gap-4 px-1">
          {orderExtras.map((item) => (
            <Link key={item.label} to={item.to} className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors">
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Collapsible Sections */}
      <CollapsibleSection title="Tài khoản">
        <nav className="space-y-0.5">
          {accountItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                location.pathname === item.to ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
              )}
            >
              <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </CollapsibleSection>

      <CollapsibleSection title="Sản phẩm">
        <nav className="space-y-0.5">
          {productItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                location.pathname === item.to ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
              )}
            >
              <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </CollapsibleSection>

      <CollapsibleSection title="Thông tin" defaultOpen>
        <nav className="space-y-0.5">
          {infoItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-secondary/50 transition-colors"
            >
              <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-destructive text-destructive-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
                  )}
                </div>
                {item.subtitle && (
                  <div className="text-[11px] text-primary truncate">{item.subtitle}</div>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </CollapsibleSection>

      {/* Logout */}
      <div className="border-t border-border pt-3 mt-1">
        <button
          onClick={signOut}
          className="w-full h-10 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
        >
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
