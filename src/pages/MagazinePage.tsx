import PageLayout from '@/components/PageLayout';
import { BookOpen, TrendingUp, Clock, Eye } from 'lucide-react';

const articles = [
  { id: 1, title: 'Top 10 Sản Phẩm Skincare Không Thể Thiếu Trong Mùa Hè', category: 'Skincare', date: '12/02/2026', views: 15200, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop' },
  { id: 2, title: 'Cách Chọn Son Môi Phù Hợp Với Tông Da Của Bạn', category: 'Makeup', date: '10/02/2026', views: 8900, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=400&fit=crop' },
  { id: 3, title: 'Review Kem Chống Nắng: Nên Dùng Loại Nào?', category: 'Review', date: '08/02/2026', views: 22100, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=400&fit=crop' },
  { id: 4, title: 'Bí Quyết Dưỡng Tóc Mềm Mượt Tại Nhà', category: 'Hair Care', date: '05/02/2026', views: 6700, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop' },
  { id: 5, title: '5 Bước Chăm Sóc Da Ban Đêm Cho Làn Da Hoàn Hảo', category: 'Skincare', date: '03/02/2026', views: 18400, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop' },
  { id: 6, title: 'Xu Hướng Makeup 2026: Glass Skin Vẫn Lên Ngôi', category: 'Trends', date: '01/02/2026', views: 31200, image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=400&fit=crop' },
];

const MagazinePage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-7 h-7 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">Lixi Magazines</h1>
      </div>

      {/* Featured Article */}
      <div className="relative rounded-xl overflow-hidden mb-8 group cursor-pointer">
        <img src={articles[0].image} alt={articles[0].title} className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-3">{articles[0].category}</span>
          <h2 className="text-xl md:text-3xl font-bold text-background mb-2">{articles[0].title}</h2>
          <div className="flex items-center gap-4 text-background/70 text-sm">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{articles[0].date}</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{articles[0].views.toLocaleString()} lượt xem</span>
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(1).map((article) => (
          <article key={article.id} className="bg-card rounded-lg border border-border overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-4">
              <span className="inline-block bg-accent text-accent-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full mb-2">{article.category}</span>
              <h3 className="font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
              <div className="flex items-center gap-3 text-muted-foreground text-xs">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.date}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{article.views.toLocaleString()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default MagazinePage;
