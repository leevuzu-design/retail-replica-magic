import PageLayout from '@/components/PageLayout';
import { Coins, Gift, Star, TrendingUp, ChevronRight } from 'lucide-react';

const tiers = [
  { name: 'Member', min: 0, max: 999, color: 'bg-secondary', textColor: 'text-foreground' },
  { name: 'Silver', min: 1000, max: 4999, color: 'bg-gray-300', textColor: 'text-foreground' },
  { name: 'Gold', min: 5000, max: 14999, color: 'bg-yellow-400', textColor: 'text-foreground' },
  { name: 'Diamond', min: 15000, max: 99999, color: 'bg-primary', textColor: 'text-primary-foreground' },
];

const rewards = [
  { name: 'Voucher 50K', coins: 500, icon: '🎫' },
  { name: 'Voucher 100K', coins: 1000, icon: '🎟️' },
  { name: 'Miễn phí vận chuyển', coins: 300, icon: '🚚' },
  { name: 'Gift Box Mini', coins: 2000, icon: '🎁' },
  { name: 'Quà sinh nhật', coins: 1500, icon: '🎂' },
  { name: 'Sản phẩm sample', coins: 800, icon: '✨' },
];

const LixicoinPage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-badge-sale text-primary-foreground rounded-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Coins className="w-8 h-8" />
          <h1 className="text-2xl md:text-3xl font-bold">Lixicoin</h1>
        </div>
        <p className="text-primary-foreground/80 mb-6">Tích lũy điểm thưởng - Đổi quà hấp dẫn</p>
        <div className="bg-primary-foreground/20 rounded-lg p-4 inline-block">
          <p className="text-sm opacity-70">Số coin hiện tại</p>
          <p className="text-3xl font-bold">0 <span className="text-lg">coins</span></p>
        </div>
      </div>

      {/* Membership Tiers */}
      <h2 className="text-xl font-bold mb-4">Hạng Thành Viên</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tiers.map((tier) => (
          <div key={tier.name} className={`${tier.color} ${tier.textColor} rounded-lg p-4 text-center`}>
            <Star className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-bold">{tier.name}</h3>
            <p className="text-xs mt-1 opacity-80">{tier.min.toLocaleString()} - {tier.max.toLocaleString()} coins</p>
          </div>
        ))}
      </div>

      {/* How to earn */}
      <h2 className="text-xl font-bold mb-4">Cách Tích Lũy</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: '🛒', title: 'Mua hàng', desc: 'Nhận 1 coin cho mỗi 1.000₫ chi tiêu' },
          { icon: '⭐', title: 'Đánh giá', desc: 'Nhận 50 coins cho mỗi đánh giá sản phẩm' },
          { icon: '👥', title: 'Giới thiệu', desc: 'Nhận 500 coins khi giới thiệu thành công' },
        ].map((item) => (
          <div key={item.title} className="bg-card border border-border rounded-lg p-5">
            <span className="text-3xl">{item.icon}</span>
            <h3 className="font-semibold mt-3 mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Rewards */}
      <h2 className="text-xl font-bold mb-4">Đổi Quà</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <div key={reward.name} className="bg-card border border-border rounded-lg p-4 hover:shadow-md hover:border-primary transition-all group cursor-pointer">
            <span className="text-3xl">{reward.icon}</span>
            <h3 className="font-semibold text-sm mt-2">{reward.name}</h3>
            <div className="flex items-center justify-between mt-3">
              <span className="text-primary font-bold text-sm">{reward.coins} coins</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default LixicoinPage;
