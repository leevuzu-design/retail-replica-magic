import UserLayout from '@/components/UserLayout';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Camera, ChevronRight, User, X } from 'lucide-react';

const ProfileEditPage = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setPhone(profile.phone_number || '');
      setBirthday((profile as any).birthday || '');
      setGender((profile as any).gender || '');
    }
  }, [profile]);

  const saveField = async (field: string, value: string) => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ [field]: value || null })
      .eq('user_id', user.id);
    setLoading(false);
    if (error) {
      toast({ title: 'Lỗi', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Cập nhật thành công!' });
      setEditing(null);
    }
  };

  const provider = user?.app_metadata?.provider;
  const providerEmail = user?.email;

  return (
    <UserLayout>
      <h1 className="text-lg font-semibold text-center mb-8">Chỉnh sửa thông tin cá nhân</h1>

      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-primary-foreground" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center border border-border hover:bg-secondary transition-colors">
            <Camera className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden mb-6">
        {/* Email */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border md:border-r">
          <span className="text-sm text-muted-foreground">Email đăng nhập</span>
          <div className="flex items-center gap-1 text-sm">
            <span>{user?.email || ''}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Họ và tên */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-sm text-muted-foreground">Họ và tên</span>
          {editing === 'name' ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="h-8 px-3 text-sm border border-border rounded-md bg-card focus:outline-none focus:border-primary w-40"
                autoFocus
              />
              <button onClick={() => saveField('display_name', displayName)} disabled={loading} className="text-xs text-primary font-medium">Lưu</button>
              <button onClick={() => setEditing(null)} className="text-muted-foreground"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <button onClick={() => setEditing('name')} className="flex items-center gap-1 text-sm">
              <span>{displayName || 'Chưa thiết lập'}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border md:border-r">
          <span className="text-sm text-muted-foreground">Số điện thoại</span>
          {editing === 'phone' ? (
            <div className="flex items-center gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-8 px-3 text-sm border border-border rounded-md bg-card focus:outline-none focus:border-primary w-40"
                autoFocus
              />
              <button onClick={() => saveField('phone_number', phone)} disabled={loading} className="text-xs text-primary font-medium">Lưu</button>
              <button onClick={() => setEditing(null)} className="text-muted-foreground"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <button onClick={() => setEditing('phone')} className="flex items-center gap-1 text-sm">
              <span className={phone ? '' : 'text-primary'}>{phone || 'Chưa thiết lập'}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Ngày sinh */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-sm text-muted-foreground">Ngày sinh</span>
          {editing === 'birthday' ? (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="h-8 px-3 text-sm border border-border rounded-md bg-card focus:outline-none focus:border-primary"
                autoFocus
              />
              <button onClick={() => saveField('birthday', birthday)} disabled={loading} className="text-xs text-primary font-medium">Lưu</button>
              <button onClick={() => setEditing(null)} className="text-muted-foreground"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <button onClick={() => setEditing('birthday')} className="flex items-center gap-1 text-sm">
              <span className={birthday ? '' : 'text-primary'}>{birthday ? new Date(birthday).toLocaleDateString('vi-VN') : 'Chưa thiết lập'}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Giới tính */}
        <div className="flex items-center justify-between px-5 py-4 md:border-r">
          <span className="text-sm text-muted-foreground">Giới tính</span>
          {editing === 'gender' ? (
            <div className="flex items-center gap-2">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="h-8 px-3 text-sm border border-border rounded-md bg-card focus:outline-none focus:border-primary"
                autoFocus
              >
                <option value="">Chọn</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
              <button onClick={() => saveField('gender', gender)} disabled={loading} className="text-xs text-primary font-medium">Lưu</button>
              <button onClick={() => setEditing(null)} className="text-muted-foreground"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <button onClick={() => setEditing('gender')} className="flex items-center gap-1 text-sm">
              <span className={gender ? '' : 'text-primary'}>
                {gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : gender === 'other' ? 'Khác' : 'Chưa thiết lập'}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Social Connections */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="text-sm font-semibold">Kết nối</h2>
        </div>

        {/* Google */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm">Google</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {provider === 'google' ? (
              <>
                <span className="text-muted-foreground">{providerEmail}</span>
                <X className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </>
            ) : (
              <span className="text-primary cursor-pointer flex items-center gap-1">Kết nối <ChevronRight className="w-4 h-4" /></span>
            )}
          </div>
        </div>

        {/* Apple */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span className="text-sm">Apple</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {provider === 'apple' ? (
              <>
                <span className="text-muted-foreground">{providerEmail}</span>
                <X className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </>
            ) : (
              <span className="text-primary cursor-pointer flex items-center gap-1">Kết nối <ChevronRight className="w-4 h-4" /></span>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProfileEditPage;
