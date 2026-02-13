import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';

const AdminCustomers = () => {
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['admin-customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Quản lý khách hàng</h1>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Đang tải...</p>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Khách hàng</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">SĐT</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Giới tính</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Sinh nhật</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c: any) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                        {c.avatar_url ? (
                          <img src={c.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <span className="font-medium">{c.display_name || 'Chưa đặt tên'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.phone_number || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.gender || '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.birthday ? new Date(c.birthday).toLocaleDateString('vi-VN') : '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(c.created_at).toLocaleDateString('vi-VN')}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">Chưa có khách hàng</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCustomers;
