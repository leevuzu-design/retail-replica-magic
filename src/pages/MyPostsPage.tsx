import PageLayout from '@/components/PageLayout';
import { useAuth } from '@/hooks/useAuth';
import { Heart, ShoppingBag, Clock, Gift, Star, User } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const filterTabs = [
  { key: 'latest', label: 'Mới nhất', icon: Clock },
  { key: 'unboxing', label: 'Đập hộp', icon: Gift },
  { key: 'from-vutru', label: 'Từ Vutru', icon: Star },
];

const MyPostsPage = () => {
  const { user, profile, loading } = useAuth();
  const [activeFilter, setActiveFilter] = useState('latest');
  const [activeTab, setActiveTab] = useState<'posts' | 'reviews'>('posts');

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">Đang tải...</div>
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: '/my-posts' }} replace />;
  }

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'Người dùng';
  const joinDate = user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : '';

  return (
    <PageLayout>
      {/* Profile Banner */}
      <div className="bg-header text-header-foreground">
        <div className="container mx-auto px-4 py-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center overflow-hidden border-4 border-background mb-4">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-primary-foreground" />
            )}
          </div>
          <h1 className="text-xl font-bold">{displayName}</h1>
          {joinDate && <p className="text-sm opacity-70 mt-1">Tham gia {joinDate}</p>}
          <span className="inline-block text-[10px] font-bold bg-background text-foreground px-2 py-0.5 rounded mt-2">MEMBER</span>

          <div className="flex gap-8 mt-5">
            <div className="text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-xs opacity-70">Bài viết</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-xs opacity-70">Đập hộp</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">0</div>
              <div className="text-xs opacity-70">Đánh giá</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="hidden md:block w-56 shrink-0">
            <nav className="space-y-1 mb-6">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                    activeFilter === tab.key ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4 text-muted-foreground" />
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="border-t border-border pt-4 space-y-1">
              <button
                onClick={() => setActiveTab('posts')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  activeTab === 'posts' ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
                {displayName}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  activeTab === 'reviews' ? 'bg-secondary font-medium' : 'hover:bg-secondary/50'
                }`}
              >
                <Star className="w-4 h-4 text-muted-foreground" />
                Đánh giá sản phẩm
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center mb-4">
                <Heart className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <p className="text-muted-foreground mb-1">Không tìm thấy hoạt động nào</p>
              <p className="text-sm text-muted-foreground/70 mb-6">Vui lòng quay trở lại sau bạn nhé!</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 h-11 px-8 bg-foreground text-background rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4" />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Right Sidebar - Keywords */}
          <div className="hidden lg:block w-48 shrink-0">
            <h3 className="text-sm font-semibold mb-3">Từ khóa nổi bật</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1.5 border border-border rounded-full hover:bg-secondary transition-colors cursor-pointer"># vutrugwp</span>
              <span className="text-xs px-3 py-1.5 border border-border rounded-full hover:bg-secondary transition-colors cursor-pointer"># halio</span>
              <span className="text-xs px-3 py-1.5 border border-border rounded-full hover:bg-secondary transition-colors cursor-pointer"># skincare</span>
              <span className="text-xs px-3 py-1.5 border border-border rounded-full hover:bg-secondary transition-colors cursor-pointer"># makeup</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MyPostsPage;
