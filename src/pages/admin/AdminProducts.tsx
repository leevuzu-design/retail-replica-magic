import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Copy, Search } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: 'Đã xóa sản phẩm' });
    },
  });

  const copyProduct = (p: any) => {
    setEditingProduct({
      ...p,
      id: undefined, // remove id so it creates a new one
      name: `${p.name} (bản sao)`,
    });
    setShowForm(true);
  };

  const startEdit = (p: any) => {
    setEditingProduct(p);
    setShowForm(true);
  };

  const startAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const categories = [...new Set(products.map((p: any) => p.category).filter(Boolean))];

  const filtered = products.filter((p: any) => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm ({products.length})</h1>
        <Button onClick={startAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Thêm sản phẩm
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            className="w-full border border-border rounded-md pl-9 pr-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Tìm sản phẩm..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="border border-border rounded-md px-3 py-2 text-sm bg-background"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Đang tải...</p>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Hình</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tên sản phẩm</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">SKU</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Giá</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tồn kho</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Trạng thái</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: any) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    {p.image_url ? <img src={p.image_url} className="w-10 h-10 rounded object-cover bg-secondary" /> : <div className="w-10 h-10 rounded bg-secondary" />}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium max-w-[200px] truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.brand} · {p.category || 'Chưa phân loại'}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{(p as any).sku || '—'}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{formatPrice(p.price)}</p>
                    {p.original_price && <p className="text-xs text-muted-foreground line-through">{formatPrice(p.original_price)}</p>}
                  </td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${p.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-secondary text-muted-foreground'}`}>
                      {p.is_active ? 'Đang bán' : 'Ẩn'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(p)} title="Sửa"><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyProduct(p)} title="Sao chép"><Copy className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { if (confirm('Xóa sản phẩm này?')) deleteMutation.mutate(p.id); }} title="Xóa"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">Không tìm thấy sản phẩm</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
