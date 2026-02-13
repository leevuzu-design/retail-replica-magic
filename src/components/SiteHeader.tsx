import { Search, Heart, ShoppingBag, User, Menu, Newspaper, MessageCircle, LogOut, Eye, Clock, Star, MessageSquare, Package, FileText, UserCog, KeyRound, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const SiteHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  const accountMenuItems = [
    { icon: Package, label: 'Đơn hàng của tôi', to: '/orders' },
    { icon: FileText, label: 'Bài viết của tôi', to: '/my-posts' },
    { icon: UserCog, label: 'Chỉnh sửa thông tin cá nhân', to: '/profile' },
    { icon: KeyRound, label: 'Đổi mật khẩu', to: '/change-password' },
    { icon: MapPin, label: 'Địa chỉ giao hàng', to: '/addresses' },
  ];

  const productMenuItems = [
    { icon: Eye, label: 'Sản phẩm đã xem', to: '/viewed' },
    { icon: Heart, label: 'Sản phẩm yêu thích', to: '/wishlist' },
    { icon: Clock, label: 'Sản phẩm chờ hàng về', to: '/waiting' },
    { icon: MessageSquare, label: 'Sản phẩm đã đánh giá', to: '/reviewed' },
  ];

  return (
    <header className="bg-header text-header-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-[0.3em] shrink-0">
            VUTRU
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm: son, máy rửa mặt, bình sữa,..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-10 rounded-lg bg-background/10 border border-header-foreground/20 text-sm text-header-foreground placeholder:text-header-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <Link to="/magazine" className="hidden lg:flex items-center gap-2 text-xs hover:text-primary transition-colors">
              <Newspaper className="w-5 h-5" />
              <div className="leading-tight">
                <div className="opacity-70">Thông tin hot</div>
                <div className="font-medium">Vutru Magazines</div>
              </div>
            </Link>
            <Link to="/community" className="hidden lg:flex items-center gap-2 text-xs hover:text-primary transition-colors">
              <MessageCircle className="w-5 h-5" />
              <div className="leading-tight">
                <div className="opacity-70">Kết nối bạn bè</div>
                <div className="font-medium">Trang cộng đồng</div>
              </div>
            </Link>

            {/* User area with dropdown */}
            <div className="hidden lg:block relative group">
              {user ? (
                <div className="flex items-center gap-2 text-xs cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div className="leading-tight">
                    <div className="opacity-70">Xin chào</div>
                    <div className="font-medium">{profile?.display_name || user.email?.split('@')[0]}</div>
                  </div>
                </div>
              ) : (
                <Link to="/sign-in" state={{ from: location.pathname }} className="flex items-center gap-2 text-xs hover:text-primary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-muted-foreground/30 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="leading-tight">
                    <div className="opacity-70">Hi, Beautiful</div>
                    <div className="font-medium">Đăng nhập ngay</div>
                  </div>
                </Link>
              )}

              {/* Hover Dropdown */}
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-background text-foreground rounded-xl shadow-xl border border-border w-72 overflow-hidden">
                  {!user ? (
                    <>
                      <div className="p-4 pb-3">
                        <p className="text-sm text-muted-foreground mb-3">
                          Đăng nhập để trải nghiệm những ưu đãi độc quyền của bạn tại Vutru
                        </p>
                        <div className="flex gap-2">
                          <Link to="/sign-in" state={{ from: location.pathname }} className="flex-1 h-9 bg-primary text-primary-foreground rounded-full text-sm font-medium flex items-center justify-center hover:opacity-90 transition-opacity">
                            Đăng nhập
                          </Link>
                          <Link to="/sign-up" className="flex-1 h-9 border border-border rounded-full text-sm font-medium flex items-center justify-center hover:bg-secondary transition-colors">
                            Đăng ký
                          </Link>
                        </div>
                      </div>
                      <div className="border-t border-border" />
                      <div className="py-1">
                        {productMenuItems.map((item) => (
                          <Link key={item.to} to={item.to} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                            <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 pb-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
                          {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-primary-foreground" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{profile?.display_name || user.email?.split('@')[0]}</div>
                          <div className="text-xs text-muted-foreground">MEMBER</div>
                        </div>
                      </div>
                      <div className="border-t border-border" />

                      <div className="py-1">
                        {accountMenuItems.map((item) => (
                          <Link key={item.to} to={item.to} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                            <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-border" />

                      <div className="py-1">
                        {productMenuItems.map((item) => (
                          <Link key={item.to} to={item.to} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                            <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-border" />
                      <div className="p-3">
                        <button onClick={signOut} className="w-full h-9 border border-border rounded-full text-sm font-medium hover:bg-secondary transition-colors">
                          Đăng xuất
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Link to="/wishlist" className="relative hover:text-primary transition-colors" aria-label="Yêu thích">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="relative hover:text-primary transition-colors" aria-label="Giỏ hàng">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <button className="md:hidden hover:text-primary transition-colors" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
