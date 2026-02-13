import UserLayout from '@/components/UserLayout';
import { MessageSquare } from 'lucide-react';

const ReviewedPage = () => {
  return (
    <UserLayout>
      <h1 className="text-xl font-bold mb-6">Sản phẩm đã đánh giá</h1>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <MessageSquare className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground">Bạn chưa đánh giá sản phẩm nào</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Sau khi nhận hàng, hãy đánh giá sản phẩm để nhận Vutrucoin</p>
      </div>
    </UserLayout>
  );
};

export default ReviewedPage;
