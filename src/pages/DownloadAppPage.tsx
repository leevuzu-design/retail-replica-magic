import PageLayout from '@/components/PageLayout';
import { Download, Smartphone } from 'lucide-react';

const DownloadAppPage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <Smartphone className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Tải Ứng Dụng Vutru</h1>
        <p className="text-muted-foreground mb-2">Nhận ngay voucher <span className="text-primary font-bold">300.000₫</span> khi tải app</p>
        <p className="text-sm text-muted-foreground mb-8">Mua sắm mọi lúc mọi nơi với ứng dụng Vutru</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a href="#" className="flex items-center gap-3 bg-foreground text-background rounded-xl px-6 py-3 hover:opacity-90 transition-opacity">
            <span className="text-2xl">🍎</span>
            <div className="text-left">
              <p className="text-[10px] opacity-70">Download on the</p>
              <p className="font-semibold">App Store</p>
            </div>
          </a>
          <a href="#" className="flex items-center gap-3 bg-foreground text-background rounded-xl px-6 py-3 hover:opacity-90 transition-opacity">
            <span className="text-2xl">▶️</span>
            <div className="text-left">
              <p className="text-[10px] opacity-70">Get it on</p>
              <p className="font-semibold">Google Play</p>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🎁', title: 'Ưu đãi độc quyền', desc: 'Nhận deal chỉ có trên app' },
            { icon: '🔔', title: 'Thông báo nhanh', desc: 'Không bỏ lỡ flash sale' },
            { icon: '📦', title: 'Theo dõi đơn hàng', desc: 'Cập nhật trạng thái real-time' },
          ].map((feature) => (
            <div key={feature.title} className="bg-card border border-border rounded-lg p-5">
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="font-semibold mt-3 mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageLayout>
);

export default DownloadAppPage;
