import PageLayout from '@/components/PageLayout';
import { Clock, Coins, ArrowDown, ArrowUp } from 'lucide-react';

const transactions = [
  { id: 1, type: 'cashback', desc: 'Hoàn tiền đơn hàng #VT202602001', amount: 42500, date: '12/02/2026' },
  { id: 2, type: 'cashback', desc: 'Hoàn tiền đơn hàng #VT202601025', amount: 62500, date: '30/01/2026' },
  { id: 3, type: 'used', desc: 'Sử dụng cho đơn hàng #VT202601012', amount: -30000, date: '15/01/2026' },
  { id: 4, type: 'cashback', desc: 'Hoàn tiền đơn hàng #VT202601005', amount: 105000, date: '07/01/2026' },
];

const CashbackPage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Coins className="w-7 h-7 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">Hoàn Tiền</h1>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-primary to-badge-sale text-primary-foreground rounded-xl p-8 mb-8">
        <p className="text-sm opacity-80 mb-1">Số dư hoàn tiền</p>
        <p className="text-3xl font-bold mb-4">180.000₫</p>
        <p className="text-xs opacity-70">Hoàn tiền 5% cho mỗi đơn hàng thành công</p>
      </div>

      {/* How it works */}
      <div className="bg-accent rounded-xl p-6 mb-8">
        <h2 className="font-semibold mb-3">Cách hoạt động</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: '1', text: 'Mua hàng và thanh toán' },
            { step: '2', text: 'Nhận 5% hoàn tiền sau khi giao hàng' },
            { step: '3', text: 'Sử dụng số dư cho đơn hàng tiếp theo' },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <p className="text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <h2 className="font-bold text-xl mb-4">Lịch sử giao dịch</h2>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                tx.amount > 0 ? 'bg-green-50' : 'bg-secondary'
              }`}>
                {tx.amount > 0 ? <ArrowDown className="w-4 h-4 text-green-600" /> : <ArrowUp className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div>
                <p className="text-sm font-medium">{tx.desc}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{tx.date}</p>
              </div>
            </div>
            <span className={`font-bold text-sm ${tx.amount > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
              {tx.amount > 0 ? '+' : ''}{new Intl.NumberFormat('vi-VN').format(tx.amount)}₫
            </span>
          </div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default CashbackPage;
