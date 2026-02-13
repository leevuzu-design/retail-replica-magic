import PageLayout from '@/components/PageLayout';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="w-7 h-7 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">Giỏ Hàng</h1>
      </div>
      <div className="text-center py-20">
        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">Giỏ hàng trống</p>
        <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  </PageLayout>
);

export default CartPage;
