import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Banner from '../Banner';

const NAVBAR_HEIGHT = 112; // matches the old pt-28 (7rem) spacing
const BANNER_ENABLED = false; // disabled for now - flip back to true to bring the banner back

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isBareRoute = location.pathname === '/login';
  const showChrome = !isAdminRoute && !isBareRoute;

  const [bannerHeight, setBannerHeight] = useState(0);
  const handleBannerHeightChange = useCallback((height) => setBannerHeight(height), []);

  return (
    <div className="app-container min-h-screen flex flex-col">
      {showChrome && BANNER_ENABLED && <Banner onHeightChange={handleBannerHeightChange} />}
      {showChrome && <Navbar topOffset={bannerHeight} />}
      <main
        className="flex-grow"
        style={showChrome ? { paddingTop: NAVBAR_HEIGHT + bannerHeight } : undefined}
      >
        {children}
      </main>
      {showChrome && <Footer />}
    </div>
  );
};

export default Layout;