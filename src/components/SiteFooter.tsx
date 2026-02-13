import { Phone, Mail, MapPin } from 'lucide-react';

const SiteFooter = () => (
  <footer className="bg-footer text-footer-foreground">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold tracking-[0.3em] text-background mb-4">LIXIBOX</h3>
          <p className="text-sm leading-relaxed mb-4">
            Bringing affordable luxury to the urban population. Nền tảng mua sắm mỹ phẩm hàng đầu Việt Nam.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" /> 1900 6979
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" /> support@lixibox.com
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
              <MapPin className="w-4 h-4" /> TP. Hồ Chí Minh, Việt Nam
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold text-background mb-4 uppercase tracking-wide">Về Lixibox</h4>
          <ul className="space-y-2 text-sm">
            {['Giới thiệu', 'Tuyển dụng', 'Liên hệ', 'Magazine', 'Cộng đồng'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-primary transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-background mb-4 uppercase tracking-wide">Hỗ trợ</h4>
          <ul className="space-y-2 text-sm">
            {['Hướng dẫn mua hàng', 'Chính sách đổi trả', 'Chính sách bảo mật', 'Điều khoản sử dụng', 'FAQ'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-primary transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-background mb-4 uppercase tracking-wide">Đăng ký nhận tin</h4>
          <p className="text-sm mb-3">Nhận thông tin khuyến mãi và sản phẩm mới nhất</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 h-10 px-3 bg-background/10 border border-footer-foreground/30 rounded-l-md text-sm text-background placeholder:text-footer-foreground/50 focus:outline-none focus:border-primary"
            />
            <button className="h-10 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-r-md hover:opacity-90 transition-opacity">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-footer-foreground/20 mt-8 pt-6 text-center text-xs">
        <p>© 2025 Lixibox. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
