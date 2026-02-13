import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';


const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const badgeStyles: Record<string, string> = {
  hot: 'bg-badge-hot text-primary-foreground',
  sale: 'bg-badge-sale text-primary-foreground',
  new: 'bg-foreground text-background',
  gift: 'bg-accent text-accent-foreground',
};

const badgeLabels: Record<string, string> = {
  hot: 'HOT',
  sale: 'SALE',
  new: 'MỚI',
  gift: 'QUÀ',
};

const ProductCard = ({ product }: { product: Product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const liked = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-in">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-sm ${badgeStyles[product.badge]}`}>
            {badgeLabels[product.badge]}
          </span>
        )}
        {product.discount && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
            -{product.discount}%
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button onClick={handleAddToCart} className="flex-1 bg-primary text-primary-foreground text-xs font-medium py-2 rounded-md flex items-center justify-center gap-1 hover:opacity-90 transition-opacity">
            <ShoppingBag className="w-3.5 h-3.5" />
            Thêm vào giỏ
          </button>
          <button onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }} className={`w-9 h-9 bg-background rounded-md flex items-center justify-center transition-colors shadow-sm ${liked ? 'text-primary' : 'hover:text-primary'}`}>
            <Heart className={`w-4 h-4 ${liked ? 'fill-primary' : ''}`} />
          </button>
        </div>
      </div>
      <div className="p-3">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium leading-tight line-clamp-2 mb-2 min-h-[2.5rem]">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-star text-star' : 'text-border'}`} />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-price-sale">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-price-original line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
