import UserLayout from '@/components/UserLayout';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MapPin } from 'lucide-react';

const AddressesPage = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setAddress(profile.address || '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ address })
      .eq('user_id', user.id);
    setLoading(false);
    if (error) {
      toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Cập nhật địa chỉ thành công!' });
    }
  };

  return (
    <UserLayout>
      <h1 className="text-xl font-bold mb-6">Địa chỉ giao hàng</h1>
      <form onSubmit={handleSave} className="max-w-lg space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Địa chỉ</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ giao hàng của bạn"
              rows={3}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="h-11 px-8 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? 'Đang lưu...' : 'Lưu địa chỉ'}
        </button>
      </form>
    </UserLayout>
  );
};

export default AddressesPage;
