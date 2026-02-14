import { Dialog, DialogContent } from '@/components/ui/dialog';
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const { user } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Auto-close dialog when user becomes authenticated
  useEffect(() => {
    if (user && open) {
      onOpenChange(false);
    }
  }, [user, open, onOpenChange]);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setShowPassword(false);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: 'Lỗi đăng nhập', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Đăng nhập thành công!' });
      resetForm();
      onOpenChange(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: fullName },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: 'Lỗi đăng ký', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Đăng ký thành công!' });
      resetForm();
      onOpenChange(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast({ title: 'Lỗi', description: String(result.error), variant: 'destructive' });
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth('apple', {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast({ title: 'Lỗi', description: String(result.error), variant: 'destructive' });
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) resetForm(); }}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto mb-3">
              {mode === 'login' ? (
                <User className="w-7 h-7 text-primary" />
              ) : (
                <UserPlus className="w-7 h-7 text-primary" />
              )}
            </div>
            <h2 className="text-xl font-bold">
              {mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === 'login' ? 'Chào mừng bạn trở lại Vutru' : 'Tạo tài khoản Vutru để nhận ưu đãi'}
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-2.5 mb-5">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-10 flex items-center justify-center gap-3 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {mode === 'login' ? 'Đăng nhập với Google' : 'Đăng ký với Google'}
            </button>
            <button
              onClick={handleAppleLogin}
              disabled={loading}
              className="w-full h-10 flex items-center justify-center gap-3 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              {mode === 'login' ? 'Đăng nhập với Apple' : 'Đăng ký với Apple'}
            </button>
          </div>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-3 text-muted-foreground">
                {mode === 'login' ? 'hoặc đăng nhập bằng email' : 'hoặc đăng ký bằng email'}
              </span>
            </div>
          </div>

          <form onSubmit={mode === 'login' ? handleEmailLogin : handleSignUp} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="text-sm font-medium mb-1 block">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                  <input type="text" placeholder="Nguyễn Văn A" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <input type={showPassword ? 'text' : 'password'} placeholder={mode === 'signup' ? 'Tối thiểu 6 ký tự' : 'Nhập mật khẩu'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={mode === 'signup' ? 6 : undefined} className="w-full h-10 pl-10 pr-10 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              {loading ? (mode === 'login' ? 'Đang đăng nhập...' : 'Đang đăng ký...') : (mode === 'login' ? 'Đăng nhập' : 'Đăng ký')}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === 'login' ? (
              <>Chưa có tài khoản?{' '}<button onClick={() => { setMode('signup'); resetForm(); }} className="text-primary font-medium hover:underline">Đăng ký ngay</button></>
            ) : (
              <>Đã có tài khoản?{' '}<button onClick={() => { setMode('login'); resetForm(); }} className="text-primary font-medium hover:underline">Đăng nhập</button></>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
