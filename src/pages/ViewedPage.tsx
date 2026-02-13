import UserLayout from '@/components/UserLayout';
import { Eye } from 'lucide-react';

const ViewedPage = () => {
  return (
    <UserLayout>
      <h1 className="text-xl font-bold mb-6">Sản phẩm đã xem</h1>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Eye className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground">Bạn chưa xem sản phẩm nào</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Các sản phẩm bạn đã xem sẽ hiển thị ở đây</p>
      </div>
    </UserLayout>
  );
};

export default ViewedPage;
