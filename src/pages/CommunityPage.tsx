import PageLayout from '@/components/PageLayout';
import { MessageCircle, Heart, MessageSquare, Users } from 'lucide-react';

const posts = [
  { id: 1, user: 'Minh Anh', avatar: '👩', time: '2 giờ trước', content: 'Mình mới dùng serum Vitamin C của Vutru, da sáng lên rõ rệt sau 2 tuần luôn! Recommend mọi người thử nhé 💛', likes: 245, comments: 32, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop' },
  { id: 2, user: 'Thu Hà', avatar: '👩‍🦰', time: '5 giờ trước', content: 'Son kem lì mới ra mà màu đẹp quá, lên môi mượt mà không khô. Ai đã mua chưa ạ? 💄', likes: 189, comments: 56, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop' },
  { id: 3, user: 'Phương Linh', avatar: '👧', time: '1 ngày trước', content: 'Review nhanh kem chống nắng SPF50+: thẩm thấu nhanh, không bết dính, kiểm soát dầu tốt. Rating 9/10! ☀️', likes: 412, comments: 78 },
  { id: 4, user: 'Ngọc Trâm', avatar: '👩‍🎓', time: '1 ngày trước', content: 'Mình vừa nhận box tháng 2, quà tặng kèm xinh quá trời! Vutru luôn biết cách làm mình vui 🎁', likes: 156, comments: 21, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop' },
];

const CommunityPage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-7 h-7 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">Trang Cộng Đồng</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Thành viên', value: '125K+' },
          { label: 'Bài viết', value: '48K+' },
          { label: 'Đánh giá', value: '230K+' },
        ].map((s) => (
          <div key={s.label} className="bg-accent rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="max-w-2xl mx-auto space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{post.avatar}</span>
              <div>
                <p className="font-semibold text-sm">{post.user}</p>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3">{post.content}</p>
            {post.image && (
              <img src={post.image} alt="" className="w-full rounded-lg mb-3 max-h-80 object-cover" loading="lazy" />
            )}
            <div className="flex items-center gap-6 pt-2 border-t border-border">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-4 h-4" /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="w-4 h-4" /> {post.comments}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default CommunityPage;
