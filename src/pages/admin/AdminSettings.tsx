import AdminLayout from '@/components/AdminLayout';
import { Settings } from 'lucide-react';

const AdminSettings = () => (
  <AdminLayout>
    <h1 className="text-2xl font-bold mb-6">Cài đặt</h1>
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-lg font-medium">Cài đặt cửa hàng</h2>
      </div>
      <p className="text-sm text-muted-foreground">Các tùy chỉnh cửa hàng sẽ được cập nhật trong phiên bản sau.</p>
    </div>
  </AdminLayout>
);

export default AdminSettings;
