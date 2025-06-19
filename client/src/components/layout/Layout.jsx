import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow pt-28"> {/* Added padding-top to account for fixed navbar */}
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default Layout;