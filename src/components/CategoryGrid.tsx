import { Sparkles, Palette, Bath, Scissors, Flower2, Gem, Gift, Package } from 'lucide-react';
import { categories } from '@/data/products';

const icons = [Sparkles, Palette, Bath, Scissors, Flower2, Gem, Gift, Package];

const CategoryGrid = () => {
  return (
    <section className="py-8 bg-section-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Danh Mục Sản Phẩm</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, i) => {
            const Icon = icons[i];
            return (
              <a
                key={cat.name}
                href="#"
                className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-center">{cat.label}</span>
                <span className="text-[10px] text-muted-foreground">{cat.count} sản phẩm</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
