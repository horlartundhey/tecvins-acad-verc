import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isBareRoute = location.pathname === '/login';

  return (
    <div className="app-container min-h-screen flex flex-col">
      {!isAdminRoute && !isBareRoute && <Navbar />}
      <main className={`flex-grow${!isAdminRoute && !isBareRoute ? ' pt-28' : ''}`}>
        {children}
      </main>
      {!isAdminRoute && !isBareRoute && <Footer />}
    </div>
  );
};

export default Layout;