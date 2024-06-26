import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';
import { Toaster } from './ui/toaster';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Toaster />
      <div className="flex flex-col flex-grow mr-8">
        <Header />
        <div>
          <Content>{children}</Content>
        </div>
      </div>
    </div>
  );
};

export default Layout;
