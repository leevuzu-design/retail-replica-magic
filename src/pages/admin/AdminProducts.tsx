import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const emptyForm = { name: '', brand: '', description: '', price: 0, original_price: null as number | null, image_url: '', category: '', stock: 0, is_active: true, badge: '' };

const AdminProducts = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name,
        brand: form.brand,
        description: form.description || null,
        price: form.price,
        original_price: form.original_price || null,
        image_url: form.image_url || null,
        category: form.category || null,
        stock: form.stock,
        is_active: form.is_active,
        badge: form.badge || null,
      };
      if (editingId) {
        const { error } = await supabase.from('products').update(payload as any).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(payload as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: editingId ? 'Cập nhật thành công' : 'Thêm sản phẩm thành công' });
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    },
    onError: (err: any) => toast({ title: 'Lỗi', description: err.message, variant: 'destructive' }),
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

  const startEdit = (p: any) => {
    setForm({ name: p.name, brand: p.brand || '', description: p.description || '', price: p.price, original_price: p.original_price, image_url: p.image_url || '', category: p.category || '', stock: p.stock, is_active: p.is_active, badge: p.badge || '' });
    setEditingId(p.id);
    setShowForm(true);
  };

  const inputCls = "w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring";
  const labelCls = "text-sm font-medium mb-1 block";

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }} className="gap-2">
          <Plus className="w-4 h-4" /> Thêm sản phẩm
        </Button>
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
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Thương hiệu</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Giá</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tồn kho</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Trạng thái</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    {p.image_url ? <img src={p.image_url} className="w-10 h-10 rounded object-cover bg-secondary" /> : <div className="w-10 h-10 rounded bg-secondary" />}
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                  <td className="px-4 py-3">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${p.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-secondary text-muted-foreground'}`}>
                      {p.is_active ? 'Đang bán' : 'Ẩn'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(p)}><Pencil className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { if (confirm('Xóa sản phẩm này?')) deleteMutation.mutate(p.id); }}><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">Chưa có sản phẩm</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Product form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-background rounded-lg border border-border w-full max-w-lg max-h-[85vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
            <div className="space-y-3">
              <div><label className={labelCls}>Tên sản phẩm *</label><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Thương hiệu</label><input className={inputCls} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></div>
                <div><label className={labelCls}>Danh mục</label><input className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              </div>
              <div><label className={labelCls}>Mô tả</label><textarea className={`${inputCls} h-20 resize-none`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className={labelCls}>Giá bán *</label><input type="number" className={inputCls} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
                <div><label className={labelCls}>Giá gốc</label><input type="number" className={inputCls} value={form.original_price || ''} onChange={(e) => setForm({ ...form, original_price: Number(e.target.value) || null })} /></div>
                <div><label className={labelCls}>Tồn kho</label><input type="number" className={inputCls} value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></div>
              </div>
              <div><label className={labelCls}>URL hình ảnh</label><input className={inputCls} value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Badge</label>
                  <select className={inputCls} value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}>
                    <option value="">Không</option>
                    <option value="hot">HOT</option>
                    <option value="sale">SALE</option>
                    <option value="new">MỚI</option>
                    <option value="gift">QUÀ</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="accent-primary" />
                    Đang bán
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <Button onClick={() => saveMutation.mutate()} disabled={!form.name || !form.price} className="flex-1">
                {editingId ? 'Cập nhật' : 'Thêm sản phẩm'}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Hủy</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
