import UserLayout from '@/components/UserLayout';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProfileEditPage = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setPhone(profile.phone_number || '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName, phone_number: phone })
      .eq('user_id', user.id);
    setLoading(false);
    if (error) {
      toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Cập nhật thành công!' });
    }
  };

  return (
    <UserLayout>
      <h1 className="text-xl font-bold mb-6">Chỉnh sửa thông tin cá nhân</h1>
      <form onSubmit={handleSave} className="max-w-lg space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <input type="email" value={user?.email || ''} disabled className="w-full h-11 px-4 rounded-lg border border-border bg-muted text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Họ và tên</label>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full h-11 px-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Số điện thoại</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912 345 678" className="w-full h-11 px-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <button type="submit" disabled={loading} className="h-11 px-8 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </form>
    </UserLayout>
  );
};

export default ProfileEditPage;
