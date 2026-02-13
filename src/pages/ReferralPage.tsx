import PageLayout from '@/components/PageLayout';
import { Gift, Users, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const ReferralPage = () => {
  const [copied, setCopied] = useState(false);
  const code = 'LIXIBOX2026';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-accent to-secondary rounded-xl p-8 md:p-12 text-center mb-8">
          <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Giới Thiệu Bạn Bè</h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Nhận ngay <span className="text-primary font-bold">500.000₫</span> cho mỗi đơn hàng giới thiệu thành công. Thưởng không giới hạn!
          </p>

          {/* Referral Code */}
          <div className="inline-flex items-center gap-3 bg-card border-2 border-dashed border-primary rounded-lg px-6 py-3">
            <span className="text-lg font-bold tracking-wider">{code}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </button>
          </div>
        </div>

        {/* How it works */}
        <h2 className="text-xl font-bold mb-6">Cách thức hoạt động</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { step: '1', title: 'Chia sẻ mã', desc: 'Gửi mã giới thiệu cho bạn bè qua tin nhắn hoặc mạng xã hội' },
            { step: '2', title: 'Bạn bè đặt hàng', desc: 'Bạn bè sử dụng mã và hoàn tất đơn hàng đầu tiên' },
            { step: '3', title: 'Nhận thưởng', desc: 'Cả hai cùng nhận 500.000₫ vào tài khoản Lixibox' },
          ].map((item) => (
            <div key={item.step} className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-section-bg rounded-xl p-6">
          <h3 className="font-bold mb-4">Thống kê của bạn</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Lời mời đã gửi</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground">Đăng ký thành công</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">0₫</p>
              <p className="text-xs text-muted-foreground">Tổng thưởng</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReferralPage;
