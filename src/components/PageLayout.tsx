import SiteHeader from '@/components/SiteHeader';
import NavBar from '@/components/NavBar';
import SiteFooter from '@/components/SiteFooter';

const PageLayout = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <SiteHeader />
    <NavBar />
    <main className="flex-1">{children}</main>
    <SiteFooter />
  </div>
);

export default PageLayout;
