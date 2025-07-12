import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/tecvinson-logo-one.png';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { HiOutlineRocketLaunch, HiRocketLaunch, HiChevronDown } from 'react-icons/hi2';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { 
      path: '/about', 
      label: 'About Us',
      dropdown: [
        { path: '/about', label: 'Who we are' },
        { path: '/our-journey', label: 'Our Journey' },
        { path: '/our-trainers', label: 'Our Trainers' },
        { path: '/sdgs', label: 'SDGs' },
        { path: '/what_difference', label: 'Why Tecvinson' },
        { path: '/projects-by-students', label: 'Projects By Our Students' }

      ]
    },
    { path: '/courses', label: 'Courses' },
    { path: '/blog', label: 'Blog' },
    { path: '/support', label: 'Support Us' },
    { path: '/contact', label: 'Contact Us' },
  ];

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDesktopDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    // Close mobile dropdown when closing menu
    if (!isMenuOpen === false) {
      setIsMobileDropdownOpen(false);
    }
  };

  // Close mobile menu and dropdowns when changing route
  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };

  return (
    <nav className={`bg-white py-7 fixed w-full top-0 z-50 transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Tecvinson Academy Logo" className="h-10 sm:h-12" />
        </Link>

        {/* Right side container for nav links and CTA */}
        <div className="hidden lg:flex items-center space-x-8">
          {/* Desktop Navigation Menu */}
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div 
                  key={link.path}
                  className="relative"
                  ref={dropdownRef}
                >
                  <button
                    className={`flex items-center space-x-1 ${
                      isDesktopDropdownOpen
                        ? "text-teal-500 font-medium"
                        : "text-gray-700 hover:text-teal-500"
                    } transition-colors`}
                    onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                  >
                    <span>{link.label}</span>
                    <HiChevronDown className={`h-4 w-4 transition-transform ${
                      isDesktopDropdownOpen ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  
                  {/* Desktop Dropdown Menu */}
                  {isDesktopDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-52 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                      {link.dropdown.map((dropdownItem) => (
                        <NavLink
                          key={dropdownItem.path}
                          to={dropdownItem.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm ${
                              isActive
                                ? "text-teal-500 bg-gray-50 font-medium"
                                : "text-gray-700 hover:text-teal-500 hover:bg-gray-50"
                            } transition-colors`
                          }
                          onClick={() => setIsDesktopDropdownOpen(false)}
                        >
                          {dropdownItem.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            ))}
          </div>

          {/* CTA Button */}
          <Link 
            to="/courses" 
            className="bg-[#3B9790] text-white font-semibold px-4 py-[1.3rem] rounded-lg flex items-center hover:bg-teal-600 transition-colors"
          >
            Begin your learning journey
            <HiOutlineRocketLaunch className="ml-2 h-7 w-7" />
          </Link>
        </div>

        {/* Tablet Navigation - Condensed */}
        <div className="hidden md:flex lg:hidden items-center space-x-4">
          {/* Essential nav links for tablet */}
          <div className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive 
                  ? "text-teal-500 font-medium text-sm" 
                  : "text-gray-700 hover:text-teal-500 transition-colors text-sm"
              }
            >
              Home
            </NavLink>
            <div 
              className="relative"
              ref={dropdownRef}
            >
              <button
                className={`flex items-center space-x-1 text-sm ${
                  isDesktopDropdownOpen
                    ? "text-teal-500 font-medium"
                    : "text-gray-700 hover:text-teal-500"
                } transition-colors`}
                onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
              >
                <span>About</span>
                <HiChevronDown className={`h-3 w-3 transition-transform ${
                  isDesktopDropdownOpen ? 'transform rotate-180' : ''
                }`} />
              </button>
              
              {/* Tablet Dropdown Menu */}
              {isDesktopDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  {navLinks.find(link => link.dropdown)?.dropdown.map((dropdownItem) => (
                    <NavLink
                      key={dropdownItem.path}
                      to={dropdownItem.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm ${
                          isActive
                            ? "text-teal-500 bg-gray-50 font-medium"
                            : "text-gray-700 hover:text-teal-500 hover:bg-gray-50"
                        } transition-colors`
                      }
                      onClick={() => setIsDesktopDropdownOpen(false)}
                    >
                      {dropdownItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive 
                  ? "text-teal-500 font-medium text-sm" 
                  : "text-gray-700 hover:text-teal-500 transition-colors text-sm"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive 
                  ? "text-teal-500 font-medium text-sm" 
                  : "text-gray-700 hover:text-teal-500 transition-colors text-sm"
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Compact CTA Button for tablet */}
          <Link 
            to="/courses" 
            className="bg-[#3B9790] text-white font-semibold px-3 py-2 rounded-lg flex items-center hover:bg-teal-600 transition-colors text-sm"
          >
            Get Started
            <HiRocketLaunch className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden text-gray-700 focus:outline-none" 
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
          lg:hidden bg-white fixed w-full transition-all duration-300 ease-in-out overflow-hidden shadow-lg
          ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="container mx-auto px-4 py-3">
          {navLinks.map((link) => (
            <div key={link.path}>
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    className={`w-full flex items-center justify-between py-3 ${
                      isMobileDropdownOpen ? 'text-teal-500 font-medium' : 'text-gray-700'
                    } hover:text-teal-500`}
                  >
                    <span>{link.label}</span>
                    <HiChevronDown className={`h-5 w-5 transition-transform ${
                      isMobileDropdownOpen ? 'transform rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`pl-4 pb-2 overflow-hidden transition-all duration-300 ${
                    isMobileDropdownOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {link.dropdown.map((dropdownItem) => (
                      <NavLink
                        key={dropdownItem.path}
                        to={dropdownItem.path}
                        className={({ isActive }) =>
                          `block py-2 text-sm ${
                            isActive
                              ? "text-teal-500 font-medium"
                              : "text-gray-600 hover:text-teal-500"
                          } transition-colors`
                        }
                        onClick={handleMobileNavClick}
                      >
                        {dropdownItem.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-3 ${
                      isActive 
                        ? "text-teal-500 font-medium" 
                        : "text-gray-700 hover:text-teal-500"
                    } transition-colors`
                  }
                  onClick={handleMobileNavClick}
                >
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}
          
          {/* Mobile CTA Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link 
              to="/courses" 
              className="w-full bg-[#3B9790] text-white font-semibold px-4 py-3 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
              onClick={handleMobileNavClick}
            >
              Begin your learning journey
              <HiOutlineRocketLaunch className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;