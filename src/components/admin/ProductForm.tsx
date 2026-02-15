import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Upload, Plus, Trash2, GripVertical } from 'lucide-react';

interface ProductFormProps {
  product?: any;
  onClose: () => void;
}

const emptyForm = {
  name: '', brand: '', description: '', price: 0, original_price: null as number | null,
  image_url: '', category: '', stock: 0, is_active: true, badge: '',
  sku: '', weight: null as number | null, width: null as number | null,
  height: null as number | null, length: null as number | null,
  condition: 'new', pre_order_days: null as number | null, video_url: '',
};

interface Variant {
  id?: string;
  variant_name: string;
  sku: string;
  price: number;
  stock: number;
  image_url: string;
  is_active: boolean;
  attributes: Record<string, string>;
}

const categories = [
  'Thời trang nam', 'Thời trang nữ', 'Điện thoại & Phụ kiện', 'Máy tính & Laptop',
  'Máy ảnh & Quay phim', 'Đồng hồ', 'Giày dép', 'Túi ví', 'Thiết bị điện tử',
  'Sức khỏe & Làm đẹp', 'Nhà cửa & Đời sống', 'Thể thao & Du lịch',
  'Mẹ & Bé', 'Ô tô & Xe máy', 'Sách & Văn phòng phẩm', 'Khác',
];

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState(() => {
    if (product) {
      return {
        name: product.name || '', brand: product.brand || '', description: product.description || '',
        price: product.price || 0, original_price: product.original_price, image_url: product.image_url || '',
        category: product.category || '', stock: product.stock || 0, is_active: product.is_active ?? true,
        badge: product.badge || '', sku: product.sku || '',
        weight: product.weight, width: product.width, height: product.height, length: product.length,
        condition: product.condition || 'new', pre_order_days: product.pre_order_days, video_url: product.video_url || '',
      };
    }
    return emptyForm;
  });

  const [images, setImages] = useState<{ id?: string; url: string; file?: File }[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [uploading, setUploading] = useState(false);

  // Load images & variants for editing
  useState(() => {
    if (product?.id) {
      supabase.from('product_images' as any).select('*').eq('product_id', product.id).order('sort_order')
        .then(({ data }: any) => {
          if (data) setImages(data.map((d: any) => ({ id: d.id, url: d.image_url })));
        });
      supabase.from('product_variants' as any).select('*').eq('product_id', product.id)
        .then(({ data }: any) => {
          if (data) setVariants(data.map((d: any) => ({
            id: d.id, variant_name: d.variant_name, sku: d.sku || '', price: d.price,
            stock: d.stock, image_url: d.image_url || '', is_active: d.is_active,
            attributes: d.attributes || {},
          })));
        });
    }
  });

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('product-images').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    return data.publicUrl;
  };

  const handleImageFiles = async (files: FileList) => {
    setUploading(true);
    try {
      const newImages: { url: string }[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadImage(file);
        newImages.push({ url });
      }
      setImages(prev => [...prev, ...newImages]);
      if (!form.image_url && newImages.length > 0) {
        setForm(f => ({ ...f, image_url: newImages[0].url }));
      }
    } catch (e: any) {
      toast({ title: 'Lỗi upload', description: e.message, variant: 'destructive' });
    }
    setUploading(false);
  };

  const removeImage = (idx: number) => {
    const removed = images[idx];
    setImages(prev => prev.filter((_, i) => i !== idx));
    if (form.image_url === removed.url && images.length > 1) {
      const next = images.find((_, i) => i !== idx);
      setForm(f => ({ ...f, image_url: next?.url || '' }));
    }
  };

  const addVariant = () => {
    setVariants(prev => [...prev, {
      variant_name: '', sku: '', price: form.price, stock: 0, image_url: '', is_active: true, attributes: {},
    }]);
  };

  const updateVariant = (idx: number, field: string, value: any) => {
    setVariants(prev => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v));
  };

  const removeVariant = (idx: number) => {
    setVariants(prev => prev.filter((_, i) => i !== idx));
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload: any = {
        name: form.name, brand: form.brand, description: form.description || null,
        price: form.price, original_price: form.original_price || null,
        image_url: form.image_url || (images[0]?.url ?? null),
        category: form.category || null, stock: form.stock, is_active: form.is_active,
        badge: form.badge || null, sku: form.sku || null,
        weight: form.weight, width: form.width, height: form.height, length: form.length,
        condition: form.condition || 'new', pre_order_days: form.pre_order_days, video_url: form.video_url || null,
      };

      let productId = product?.id;
      if (productId) {
        const { error } = await supabase.from('products').update(payload as any).eq('id', productId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('products').insert(payload as any).select('id').single();
        if (error) throw error;
        productId = (data as any).id;
      }

      // Save images
      await supabase.from('product_images' as any).delete().eq('product_id', productId);
      if (images.length > 0) {
        const imgRows = images.map((img, i) => ({
          product_id: productId, image_url: img.url, sort_order: i,
        }));
        await supabase.from('product_images' as any).insert(imgRows);
      }

      // Save variants
      await supabase.from('product_variants' as any).delete().eq('product_id', productId);
      if (variants.length > 0) {
        const varRows = variants.map(v => ({
          product_id: productId, variant_name: v.variant_name, sku: v.sku || null,
          price: v.price, stock: v.stock, image_url: v.image_url || null,
          is_active: v.is_active, attributes: v.attributes,
        }));
        await supabase.from('product_variants' as any).insert(varRows);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ title: product ? 'Cập nhật thành công' : 'Thêm sản phẩm thành công' });
      onClose();
    },
    onError: (err: any) => toast({ title: 'Lỗi', description: err.message, variant: 'destructive' }),
  });

  const inputCls = "w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring";
  const labelCls = "text-sm font-medium mb-1 block text-foreground";
  const sectionCls = "bg-card border border-border rounded-lg p-5 space-y-4";

  return (
    <div className="fixed inset-0 bg-foreground/40 z-50 flex items-start justify-center overflow-y-auto py-8" onClick={onClose}>
      <div className="bg-background rounded-lg border border-border w-full max-w-3xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold">{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
          <Tabs defaultValue="basic">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="detail">Chi tiết</TabsTrigger>
              <TabsTrigger value="media">Hình ảnh & Video</TabsTrigger>
              <TabsTrigger value="variants">Phân loại hàng</TabsTrigger>
              <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className={sectionCls}>
                <div><label className={labelCls}>Tên sản phẩm *</label><input className={inputCls} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nhập tên sản phẩm" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Danh mục</label>
                    <select className={inputCls} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      <option value="">Chọn danh mục</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Thương hiệu</label><input className={inputCls} value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} /></div>
                </div>
                <div><label className={labelCls}>Mô tả sản phẩm</label><textarea className={`${inputCls} h-32 resize-none`} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Mô tả chi tiết sản phẩm..." /></div>
              </div>
            </TabsContent>

            <TabsContent value="detail">
              <div className={sectionCls}>
                <h3 className="font-semibold text-sm">Giá bán & Kho</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className={labelCls}>Giá bán (₫) *</label><input type="number" className={inputCls} value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} /></div>
                  <div><label className={labelCls}>Giá gốc (₫)</label><input type="number" className={inputCls} value={form.original_price || ''} onChange={e => setForm({ ...form, original_price: Number(e.target.value) || null })} /></div>
                  <div><label className={labelCls}>Tồn kho</label><input type="number" className={inputCls} value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>SKU</label><input className={inputCls} value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} placeholder="Mã SKU sản phẩm" /></div>
                  <div>
                    <label className={labelCls}>Tình trạng</label>
                    <select className={inputCls} value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}>
                      <option value="new">Mới</option>
                      <option value="used">Đã sử dụng</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Badge</label>
                    <select className={inputCls} value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })}>
                      <option value="">Không</option>
                      <option value="hot">HOT</option>
                      <option value="sale">SALE</option>
                      <option value="new">MỚI</option>
                      <option value="gift">QUÀ</option>
                    </select>
                  </div>
                  <div><label className={labelCls}>Hàng đặt trước (ngày)</label><input type="number" className={inputCls} value={form.pre_order_days || ''} onChange={e => setForm({ ...form, pre_order_days: Number(e.target.value) || null })} /></div>
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="accent-primary" />
                  Đang bán (hiển thị trên cửa hàng)
                </label>
              </div>
            </TabsContent>

            <TabsContent value="media">
              <div className={sectionCls}>
                <h3 className="font-semibold text-sm">Hình ảnh sản phẩm</h3>
                <p className="text-xs text-muted-foreground">Ảnh đầu tiên sẽ là ảnh bìa. Kéo thả để sắp xếp. Tối đa 9 ảnh.</p>
                <div className="grid grid-cols-5 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg border border-border overflow-hidden group bg-secondary">
                      <img src={img.url} className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-foreground/60 text-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                      {idx === 0 && <span className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-[10px] text-center py-0.5">Ảnh bìa</span>}
                    </div>
                  ))}
                  {images.length < 9 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                      disabled={uploading}
                    >
                      <Upload className="w-5 h-5 mb-1" />
                      <span className="text-xs">{uploading ? 'Đang tải...' : 'Thêm ảnh'}</span>
                    </button>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && handleImageFiles(e.target.files)} />

                <div className="pt-3 border-t border-border">
                  <label className={labelCls}>URL hình ảnh chính</label>
                  <input className={inputCls} value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="Hoặc nhập URL trực tiếp" />
                </div>
                <div>
                  <label className={labelCls}>Video sản phẩm (URL)</label>
                  <input className={inputCls} value={form.video_url} onChange={e => setForm({ ...form, video_url: e.target.value })} placeholder="URL YouTube hoặc video" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="variants">
              <div className={sectionCls}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">Phân loại hàng</h3>
                    <p className="text-xs text-muted-foreground">Thêm biến thể như Màu sắc, Kích cỡ</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={addVariant} className="gap-1">
                    <Plus className="w-3 h-3" /> Thêm phân loại
                  </Button>
                </div>
                {variants.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">Chưa có phân loại nào. Bấm "Thêm phân loại" để bắt đầu.</p>
                )}
                {variants.map((v, idx) => (
                  <div key={idx} className="border border-border rounded-md p-4 space-y-3 bg-secondary/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Phân loại #{idx + 1}</span>
                      <button onClick={() => removeVariant(idx)} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={labelCls}>Tên phân loại *</label><input className={inputCls} value={v.variant_name} onChange={e => updateVariant(idx, 'variant_name', e.target.value)} placeholder="VD: Đỏ - XL" /></div>
                      <div><label className={labelCls}>SKU</label><input className={inputCls} value={v.sku} onChange={e => updateVariant(idx, 'sku', e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className={labelCls}>Giá (₫)</label><input type="number" className={inputCls} value={v.price} onChange={e => updateVariant(idx, 'price', Number(e.target.value))} /></div>
                      <div><label className={labelCls}>Tồn kho</label><input type="number" className={inputCls} value={v.stock} onChange={e => updateVariant(idx, 'stock', Number(e.target.value))} /></div>
                    </div>
                    <div><label className={labelCls}>URL hình ảnh</label><input className={inputCls} value={v.image_url} onChange={e => updateVariant(idx, 'image_url', e.target.value)} /></div>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={v.is_active} onChange={e => updateVariant(idx, 'is_active', e.target.checked)} className="accent-primary" />
                      Còn hàng
                    </label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipping">
              <div className={sectionCls}>
                <h3 className="font-semibold text-sm">Thông tin vận chuyển</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelCls}>Cân nặng (gram)</label><input type="number" className={inputCls} value={form.weight || ''} onChange={e => setForm({ ...form, weight: Number(e.target.value) || null })} placeholder="VD: 500" /></div>
                  <div><label className={labelCls}>Chiều dài (cm)</label><input type="number" className={inputCls} value={form.length || ''} onChange={e => setForm({ ...form, length: Number(e.target.value) || null })} /></div>
                  <div><label className={labelCls}>Chiều rộng (cm)</label><input type="number" className={inputCls} value={form.width || ''} onChange={e => setForm({ ...form, width: Number(e.target.value) || null })} /></div>
                  <div><label className={labelCls}>Chiều cao (cm)</label><input type="number" className={inputCls} value={form.height || ''} onChange={e => setForm({ ...form, height: Number(e.target.value) || null })} /></div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex gap-3 p-5 border-t border-border">
          <Button onClick={() => saveMutation.mutate()} disabled={!form.name || !form.price || saveMutation.isPending} className="flex-1">
            {saveMutation.isPending ? 'Đang lưu...' : product ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
          </Button>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
