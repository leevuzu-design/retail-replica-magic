import { Tag, Store, Package, ChevronDown, Menu, Clock, Coins, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-nav border-b border-border hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-11">
          <div className="flex items-center gap-0.5">
            <Link to="/" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <Menu className="w-4 h-4" />
              <span>Danh mục sản phẩm</span>
            </Link>
            <span className="text-border mx-1">|</span>
            <Link to="/hot-deals" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <Tag className="w-4 h-4" />
              <span>Hot Deals</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </Link>
            <Link to="/brands" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <span>Thương hiệu</span>
            </Link>
            <Link to="/referral" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <span>Giới thiệu bạn bè</span>
            </Link>
            <Link to="/download-app" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <Download className="w-4 h-4" />
              <span>Tải ứng dụng - Nhận voucher 300k</span>
            </Link>
          </div>
          <div className="flex items-center gap-0.5">
            <Link to="/cashback" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <Clock className="w-4 h-4" />
              <span>Hoàn tiền</span>
            </Link>
            <Link to="/lixicoin" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <Coins className="w-4 h-4" />
              <span>Lixicoin</span>
            </Link>
            <Link to="/stores" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <Store className="w-4 h-4" />
              <span>Cửa hàng</span>
            </Link>
            <Link to="/orders" className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors">
              <Package className="w-4 h-4" />
              <span>Đơn hàng</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
