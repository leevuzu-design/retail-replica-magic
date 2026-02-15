import UserLayout from '@/components/UserLayout';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, MapPin, Pencil, Trash2, ArrowLeft, X, ChevronRight } from 'lucide-react';
import AddressPicker from '@/components/AddressPicker';
import { z } from 'zod';

const addressSchema = z.object({
  recipient_name: z.string().trim().min(1, 'Vui lòng nhập tên').max(100, 'Tên quá dài'),
  phone: z.string().regex(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ (10-11 số)'),
  province: z.string().trim().min(1, 'Vui lòng chọn tỉnh/thành phố').max(50),
  district: z.string().trim().min(1, 'Vui lòng chọn quận/huyện').max(50),
  ward: z.string().trim().min(1, 'Vui lòng chọn phường/xã').max(50),
  street_address: z.string().trim().min(1, 'Vui lòng nhập địa chỉ').max(200, 'Địa chỉ quá dài'),
});

interface Address {
  id: string;
  recipient_name: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street_address: string;
  is_default: boolean;
}

const emptyForm = { recipient_name: '', phone: '', province: '', district: '', ward: '', street_address: '' };

const AddressesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [addressPickerOpen, setAddressPickerOpen] = useState(false);
  const fetchAddresses = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    setAddresses((data as Address[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (addr: Address) => {
    setForm({
      recipient_name: addr.recipient_name,
      phone: addr.phone,
      province: addr.province,
      district: addr.district,
      ward: addr.ward,
      street_address: addr.street_address,
    });
    setEditingId(addr.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!user) return;
    const result = addressSchema.safeParse(form);
    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Dữ liệu không hợp lệ';
      toast({ title: firstError, variant: 'destructive' });
      return;
    }
    const validated = result.data;
    setSaving(true);
    if (editingId) {
      const { error } = await supabase.from('addresses').update(validated).eq('id', editingId);
      if (error) {
        toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Cập nhật thành công!' });
      }
    } else {
      const { error } = await supabase.from('addresses').insert({ ...validated, user_id: user.id, is_default: addresses.length === 0 } as any);
      if (error) {
        toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Thêm địa chỉ thành công!' });
      }
    }
    setSaving(false);
    setShowModal(false);
    fetchAddresses();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('addresses').delete().eq('id', id);
    if (error) {
      toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Đã xóa địa chỉ' });
      fetchAddresses();
    }
  };

  const setDefault = async (id: string) => {
    if (!user) return;
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id);
    await supabase.from('addresses').update({ is_default: true }).eq('id', id);
    fetchAddresses();
  };

  return (
    <UserLayout>
      <h1 className="text-lg font-semibold mb-6">Địa chỉ giao hàng</h1>

      {/* Add new address card */}
      <button
        onClick={openAdd}
        className="w-full max-w-md border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors mb-6"
      >
        <Plus className="w-8 h-8" />
        <span className="text-sm font-medium">Thêm địa chỉ mới</span>
      </button>

      {/* Address list */}
      {loading ? (
        <p className="text-muted-foreground text-sm">Đang tải...</p>
      ) : (
        <div className="space-y-4 max-w-lg">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-border rounded-lg p-4 relative">
              {addr.is_default && (
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Mặc định</span>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">{addr.recipient_name} · <span className="text-muted-foreground">{addr.phone}</span></p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {addr.street_address}, {addr.ward}, {addr.district}, {addr.province}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <button onClick={() => openEdit(addr)} className="text-xs text-primary hover:underline flex items-center gap-1">
                      <Pencil className="w-3 h-3" /> Sửa
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="text-xs text-destructive hover:underline flex items-center gap-1">
                      <Trash2 className="w-3 h-3" /> Xóa
                    </button>
                    {!addr.is_default && (
                      <button onClick={() => setDefault(addr.id)} className="text-xs text-muted-foreground hover:underline">
                        Đặt mặc định
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-background rounded-xl w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="font-semibold">Địa chỉ nhận hàng</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium">Tên người nhận *</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên người nhận"
                  value={form.recipient_name}
                  onChange={(e) => setForm({ ...form, recipient_name: e.target.value })}
                  className="w-full h-11 px-0 border-0 border-b border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Số điện thoại *</label>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại người nhận"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full h-11 px-0 border-0 border-b border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tỉnh / Thành phố *</label>
                <button
                  type="button"
                  onClick={() => setAddressPickerOpen(true)}
                  className="w-full h-11 px-0 border-0 border-b border-border bg-transparent text-sm text-left focus:outline-none focus:border-primary transition-colors flex items-center justify-between"
                >
                  <span className={form.province ? 'text-foreground' : 'text-muted-foreground'}>
                    {form.province || 'Chọn Tỉnh / Thành phố'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div>
                <label className="text-sm font-medium">Quận / Huyện *</label>
                <div className="w-full h-11 px-0 border-0 border-b border-border bg-transparent text-sm flex items-center text-muted-foreground">
                  {form.district || 'Chọn Quận / Huyện'}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Phường / Xã *</label>
                <div className="w-full h-11 px-0 border-0 border-b border-border bg-transparent text-sm flex items-center text-muted-foreground">
                  {form.ward || 'Chọn Phường / Xã'}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Địa chỉ nhận hàng *</label>
                <input
                  type="text"
                  placeholder="Nhập số nhà và tên đường..."
                  value={form.street_address}
                  onChange={(e) => setForm({ ...form, street_address: e.target.value })}
                  className="w-full h-11 px-0 border-0 border-b border-border bg-transparent text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full h-12 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
              >
                {saving ? 'Đang lưu...' : 'Lưu địa chỉ'}
              </button>
            </div>
          </div>
        </div>
      )}

      <AddressPicker
        open={addressPickerOpen}
        onClose={() => setAddressPickerOpen(false)}
        onSelect={(province, district, ward) => {
          setForm(f => ({ ...f, province, district, ward }));
        }}
      />
    </UserLayout>
  );
};

export default AddressesPage;
