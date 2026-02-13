import UserLayout from '@/components/UserLayout';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const ChangePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: 'Lỗi', description: 'Mật khẩu xác nhận không khớp', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Lỗi', description: 'Mật khẩu phải có ít nhất 6 ký tự', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Đổi mật khẩu thành công!' });
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <UserLayout>
      <h1 className="text-xl font-bold mb-6">Đổi mật khẩu</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Mật khẩu mới</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tối thiểu 6 ký tự"
              required
              minLength={6}
              className="w-full h-11 px-4 pr-10 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Xác nhận mật khẩu mới</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu"
            required
            className="w-full h-11 px-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button type="submit" disabled={loading} className="h-11 px-8 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
        </button>
      </form>
    </UserLayout>
  );
};

export default ChangePasswordPage;
