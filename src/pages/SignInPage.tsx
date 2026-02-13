import PageLayout from '@/components/PageLayout';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Đăng Nhập</h1>
            <p className="text-sm text-muted-foreground">Chào mừng bạn trở lại Vutru</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  className="w-full h-11 pl-10 pr-10 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-primary hover:underline">Quên mật khẩu?</a>
            </div>
            <button
              type="submit"
              className="w-full h-11 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link to="/sign-up" className="text-primary font-medium hover:underline">Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignInPage;
