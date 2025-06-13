import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  return (
    <footer>
      {/* Newsletter subscription */}
      <div className="bg-[#FFF8EA] py-8">
        <div className="container mx-auto px-4 md:px-12 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="md:max-w-lg">
              <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
              <p className="text-gray-700">
                Subscribe to our newsletter and be the first to know about our next cohorts, new courses, and more—subscribe
                now!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:w-1/3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-md flex-grow"
              />
              <button className="bg-[#D68B00] hover:bg-[#B87700] text-white font-medium py-2 px-6 rounded-md transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 md:px-12 w-full">
          <div className="flex flex-col justify-between">
            {/* Logo */}
            <div className="mb-6">
              <Link to="/">
                <img src={logo || "/placeholder.svg"} alt="Tecvinson Academy Logo" className="h-12" />
              </Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              {/* Navigation Links */}
              <div className="mb-6 md:mb-0">
                {/* Quick Links heading (only on mobile) */}
                <h4 className="text-sm font-semibold mb-3 md:hidden">Quick Links</h4>
                
                <div className="flex flex-col md:flex-row md:items-center gap-y-3 md:gap-x-6">
                  <Link to="/" className="text-gray-800 hover:text-gray-600 transition-colors">
                    Home
                  </Link>
                  <Link to="/about" className="text-gray-800 hover:text-gray-600 transition-colors">
                    About Us
                  </Link>
                  <Link to="/courses" className="text-gray-800 hover:text-gray-600 transition-colors">
                    Courses
                  </Link>
                  <Link to="/what_difference" className="text-gray-800 hover:text-gray-600 transition-colors">
                    Why Tecvinson?
                  </Link>
                  <Link to="/blog" className="text-gray-800 hover:text-gray-600 transition-colors">
                    Blog
                  </Link>
                  <Link to="/support" className="text-gray-800 hover:text-gray-600 transition-colors">
                    Support Us
                  </Link>
                  <Link to="/contact" className="text-gray-800 hover:text-gray-600 transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>

            {/* Social Links */}
              <div className="ml-0 md:ml-auto">
                <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="LinkedIn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="Facebook">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="Instagram">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-800" aria-label="Twitter/X">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-200" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p className="mb-2 md:mb-0">© 2024 Tecvinson Academy. All rights reserved.</p>
            <Link to="/privacy-policy" className="hover:text-gray-800">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;