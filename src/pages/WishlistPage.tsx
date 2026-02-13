import PageLayout from '@/components/PageLayout';
import { Heart } from 'lucide-react';

const WishlistPage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-7 h-7 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">Sản Phẩm Yêu Thích</h1>
      </div>
      <div className="text-center py-20">
        <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground mb-2">Chưa có sản phẩm yêu thích nào</p>
        <p className="text-sm text-muted-foreground">Hãy thêm sản phẩm yêu thích để dễ dàng theo dõi</p>
      </div>
    </div>
  </PageLayout>
);

export default WishlistPage;
