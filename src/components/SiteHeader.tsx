import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import { useState } from 'react';

const SiteHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-header text-header-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold tracking-[0.3em] shrink-0">
            LIXIBOX
          </a>

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
            <a href="#" className="hidden lg:flex items-center gap-2 text-xs hover:text-primary transition-colors">
              <User className="w-5 h-5" />
              <div className="leading-tight">
                <div className="opacity-70">Hi, Beautiful</div>
                <div className="font-medium">Đăng nhập ngay</div>
              </div>
            </a>
            <button className="relative hover:text-primary transition-colors" aria-label="Yêu thích">
              <Heart className="w-5 h-5" />
            </button>
            <button className="relative hover:text-primary transition-colors" aria-label="Giỏ hàng">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
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
