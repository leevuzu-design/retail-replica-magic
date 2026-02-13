import UserLayout from '@/components/UserLayout';
import { Clock } from 'lucide-react';

const WaitingPage = () => {
  return (
    <UserLayout>
      <h1 className="text-xl font-bold mb-6">Sản phẩm chờ hàng về</h1>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Clock className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground">Chưa có sản phẩm nào trong danh sách chờ</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Khi bạn đăng ký nhận thông báo hàng về, sản phẩm sẽ hiển thị ở đây</p>
      </div>
    </UserLayout>
  );
};

export default WaitingPage;
