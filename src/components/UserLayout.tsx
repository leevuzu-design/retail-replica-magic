import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import UserSidebar from '@/components/UserSidebar';
import { useAuth } from '@/hooks/useAuth';

const UserLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="hidden md:block">
            <UserSidebar />
          </div>
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserLayout;
