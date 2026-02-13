import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye } from 'lucide-react';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const statusOptions = [
  { value: 'unpaid', label: 'Chưa thanh toán' },
  { value: 'confirmed', label: 'Đã xác nhận' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'delivered', label: 'Đã nhận hàng' },
  { value: 'cancelled', label: 'Đã hủy' },
  { value: 'returned', label: 'Đã trả hàng' },
];

const statusColors: Record<string, string> = {
  unpaid: 'bg-secondary text-muted-foreground',
  confirmed: 'bg-accent text-primary',
  shipping: 'bg-blue-50 text-blue-600',
  delivered: 'bg-emerald-50 text-emerald-600',
  cancelled: 'bg-destructive/10 text-destructive',
  returned: 'bg-secondary text-muted-foreground',
};

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('orders').update({ status } as any).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast({ title: 'Cập nhật trạng thái thành công' });
    },
  });

  const filtered = filterStatus === 'all' ? orders : orders.filter((o: any) => o.status === filterStatus);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Lọc:</span>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả ({orders.length})</SelectItem>
              {statusOptions.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Đang tải...</p>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Mã ĐH</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Ngày</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Sản phẩm</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Tổng tiền</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Trạng thái</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order: any) => {
                const items = (order.items || []) as any[];
                const date = new Date(order.created_at).toLocaleDateString('vi-VN');
                return (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                    <td className="px-4 py-3 font-mono text-xs">{order.order_number}</td>
                    <td className="px-4 py-3 text-muted-foreground">{date}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs">{items.length} sản phẩm</span>
                    </td>
                    <td className="px-4 py-3 font-medium">{formatPrice(order.total_amount)}</td>
                    <td className="px-4 py-3">
                      <Select
                        value={order.status}
                        onValueChange={(val) => updateStatus.mutate({ id: order.id, status: val })}
                      >
                        <SelectTrigger className={`h-7 text-xs w-36 ${statusColors[order.status] || ''}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedOrder(order)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Không có đơn hàng</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-background rounded-lg border border-border w-full max-w-lg max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Chi tiết đơn hàng</h2>
            <div className="space-y-2 text-sm mb-4">
              <p><span className="text-muted-foreground">Mã:</span> {selectedOrder.order_number}</p>
              <p><span className="text-muted-foreground">Thanh toán:</span> {selectedOrder.payment_method === 'cod' ? 'COD' : 'Chuyển khoản'}</p>
              {selectedOrder.shipping_address && (
                <p><span className="text-muted-foreground">Địa chỉ:</span> {selectedOrder.shipping_address.recipient_name} — {selectedOrder.shipping_address.phone}<br/>
                  {selectedOrder.shipping_address.street_address}, {selectedOrder.shipping_address.ward}, {selectedOrder.shipping_address.district}, {selectedOrder.shipping_address.province}
                </p>
              )}
              {selectedOrder.note && <p><span className="text-muted-foreground">Ghi chú:</span> {selectedOrder.note}</p>}
            </div>
            <div className="space-y-2 border-t border-border pt-3">
              {(selectedOrder.items || []).map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.image} alt="" className="w-10 h-10 rounded object-cover bg-secondary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(item.price)} x{item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold">
              <span>Tổng</span>
              <span>{formatPrice(selectedOrder.total_amount)}</span>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => setSelectedOrder(null)}>Đóng</Button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
