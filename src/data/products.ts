import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import product8 from '@/assets/product-8.jpg';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: 'hot' | 'sale' | 'new' | 'gift';
  discount?: number;
}

export const bestSellers: Product[] = [
  { id: 1, name: 'Serum Dưỡng Ẩm Hyaluronic Acid', brand: 'Vutru', price: 350000, originalPrice: 450000, image: product1, rating: 4.8, reviews: 1250, badge: 'hot', discount: 22 },
  { id: 2, name: 'Son Thỏi Lì Mềm Mượt Màu Hồng Đào', brand: 'Lustre', price: 280000, originalPrice: 350000, image: product2, rating: 4.9, reviews: 890, badge: 'sale', discount: 20 },
  { id: 3, name: 'Kem Dưỡng Da Ban Đêm Collagen', brand: 'Beauté', price: 520000, image: product3, rating: 4.7, reviews: 650 },
  { id: 4, name: 'Kem Chống Nắng SPF50+ PA++++', brand: 'SunShield', price: 290000, originalPrice: 380000, image: product4, rating: 4.6, reviews: 2100, badge: 'hot', discount: 24 },
  { id: 5, name: 'Nước Hoa Sang Trọng Eau de Parfum', brand: 'Élégance', price: 1250000, image: product5, rating: 4.9, reviews: 340 },
];

export const newArrivals: Product[] = [
  { id: 6, name: 'Phấn Mắt Highlight Shimmer Glow', brand: 'Glow Lab', price: 195000, image: product6, rating: 4.5, reviews: 120, badge: 'new' },
  { id: 7, name: 'Mascara Dày Mi Cong Tự Nhiên', brand: 'LashPro', price: 220000, originalPrice: 280000, image: product8, rating: 4.4, reviews: 430, discount: 21 },
  { id: 8, name: 'Serum Vitamin C Trắng Da', brand: 'Vutru', price: 380000, image: product1, rating: 4.8, reviews: 780, badge: 'new' },
  { id: 9, name: 'Son Kem Lì Siêu Bền Màu', brand: 'Lustre', price: 245000, originalPrice: 320000, image: product2, rating: 4.7, reviews: 560, badge: 'sale', discount: 23 },
  { id: 10, name: 'Kem Dưỡng Ẩm Cấp Nước 72h', brand: 'Beauté', price: 450000, image: product3, rating: 4.6, reviews: 290, badge: 'gift' },
];

export const categories = [
  { name: 'Skin Care', label: 'Chăm Sóc Da', count: 1250 },
  { name: 'Makeup', label: 'Trang Điểm', count: 890 },
  { name: 'Body Care', label: 'Chăm Sóc Cơ Thể', count: 650 },
  { name: 'Hair Care', label: 'Chăm Sóc Tóc', count: 430 },
  { name: 'Fragrance', label: 'Nước Hoa', count: 320 },
  { name: 'Accessories', label: 'Phụ Kiện', count: 210 },
  { name: 'Beauty Box', label: 'Beauty Box', count: 85 },
  { name: 'Gifts', label: 'Quà Tặng', count: 160 },
];
