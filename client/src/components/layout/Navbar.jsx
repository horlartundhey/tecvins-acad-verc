import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Assuming you'll add this image to assets folder
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { HiOutlineRocketLaunch, HiRocketLaunch } from 'react-icons/hi2';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/courses', label: 'Courses' },
    { path: '/blog', label: 'Blog' },
    { path: '/support', label: 'Support Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-white py-6 fixed w-full top-0 z-50 mb-10 transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}` }>
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Tecvinson Academy Logo" className="h-12" />
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive 
                  ? "text-teal-500 font-medium" 
                  : "text-gray-700 hover:text-teal-500 transition-colors"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA Button */}
        <Link 
          to="/courses" 
          className="hidden md:flex bg-[#3B9790] text-white font-semibold px-4 py-2 rounded-lg items-center hover:bg-teal-600 transition-colors"
        >
          Begin your learning journey
          <HiOutlineRocketLaunch className="ml-2 h-7 w-7" />
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <HiOutlineMenuAlt1 className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`
          md:hidden bg-white fixed w-full transition-all duration-300 ease-in-out overflow-hidden shadow-lg
          ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="container mx-auto px-4 py-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive 
                  ? "text-[#3B9790] font-medium block py-3 border-b border-gray-100" 
                  : "text-gray-700 block py-3 border-b border-gray-100"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          
          {/* Mobile CTA Button */}
          <div className="py-4">
            <Link 
              to="/courses" 
              className="bg-[#3B9790] text-white px-4 py-3 font-semibold rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Add padding at the bottom to prevent content jumping when menu is fixed */}
      <div className={`${isMenuOpen ? 'h-16 md:h-0' : 'h-0'} transition-all duration-300`}></div>
    </nav>
  );
};

export default Navbar;