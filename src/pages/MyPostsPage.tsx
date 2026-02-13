import UserLayout from '@/components/UserLayout';
import { FileText } from 'lucide-react';

const MyPostsPage = () => {
  return (
    <UserLayout>
      <h1 className="text-xl font-bold mb-6">Bài viết của tôi</h1>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileText className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground">Bạn chưa có bài viết nào</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Chia sẻ trải nghiệm của bạn với cộng đồng Vutru</p>
      </div>
    </UserLayout>
  );
};

export default MyPostsPage;
