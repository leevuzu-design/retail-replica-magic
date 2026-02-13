import { Gift, Tag, Store, Package, ChevronDown } from 'lucide-react';

const NavBar = () => {
  const leftLinks = [
    { label: 'Danh mục sản phẩm', icon: null, hasDropdown: true },
    { label: 'Hot Deals', icon: <Tag className="w-4 h-4" />, hot: true },
    { label: 'Thương hiệu', icon: null },
    { label: 'Giới thiệu bạn bè', icon: null },
  ];

  const rightLinks = [
    { label: 'Hoàn tiền', icon: null },
    { label: 'Lixicoin', icon: null },
    { label: 'Cửa hàng', icon: <Store className="w-4 h-4" /> },
    { label: 'Đơn hàng', icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-nav border-b border-border hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-11">
          <div className="flex items-center gap-1">
            {leftLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors"
              >
                {link.icon}
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                {link.hot && (
                  <span className="bg-badge-hot text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-sm leading-none">
                    HOT
                  </span>
                )}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {rightLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-nav-foreground hover:text-primary transition-colors"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
