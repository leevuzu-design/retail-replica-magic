import { Gift, Truck, Shield, RotateCcw } from 'lucide-react';

const promos = [
  { icon: Truck, title: 'Miễn phí vận chuyển', desc: 'Đơn hàng từ 300.000₫' },
  { icon: Gift, title: 'Quà tặng hấp dẫn', desc: 'Mỗi đơn hàng' },
  { icon: Shield, title: 'Cam kết chính hãng', desc: '100% sản phẩm' },
  { icon: RotateCcw, title: 'Đổi trả miễn phí', desc: 'Trong 30 ngày' },
];

const PromoBanner = () => (
  <section className="py-6 border-b border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {promos.map((p, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
              <p.icon className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PromoBanner;
