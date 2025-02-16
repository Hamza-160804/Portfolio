import React, { useState, useEffect, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { MessageCircle } from 'lucide-react';

// Lazy load Loader for better performance
const Loader = React.lazy(() => import('./Loader'));

// Logo details
const logoSrc = `${process.env.PUBLIC_URL}/images/C.png`;

// Navigation links
const navLinks = [
  { name: 'About Me', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Skills', path: '/skills' },
  { name: 'Portfolio', path: '/portfolio' }
];

// Reusable Contact Button Component
const ContactButton = ({ onClick, className = '', icon: Icon = null, children }) => (
  <button
    className={`px-4 py-2 bg-[#320F85] text-white rounded-lg transition transform hover:scale-105 hover:bg-purple-700 flex items-center justify-center ${className}`}
    onClick={onClick}
  >
    {Icon && <Icon className="mr-2" size={18} />}
    {children}
  </button>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Prevent scrolling while loading
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

  // Navigation handler with loader effect
  const handleNavigation = (route) => {
    setMobileMenuOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      navigate(route);
      setIsLoading(false);
    }, 1200); // Smooth transition effect
  };

  return (
    <header className="top-0 w-full bg-[#000B2A] text-white font-syne">
      {/* Loading Overlay */}
      {isLoading && (
        <Suspense fallback={null}>
          <Loader />
        </Suspense>
      )}

      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" onClick={() => handleNavigation('/')} className="flex items-center">
          <img src={logoSrc} alt="Logo" className="w-[70px] h-[70px]" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-md">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => handleNavigation(link.path)}
                className="home"
              >
                <span className="initial">{link.name}</span>
                <span className="new" >{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact Button (Desktop) */}
        <div className="hidden md:flex">
          <ContactButton onClick={() => handleNavigation('/contact')} icon={MessageCircle}>
            Contact
          </ContactButton>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:text-purple-400"
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="md:hidden">
        <div className="fixed inset-0 z-40 bg-black/50" />
        
        <Dialog.Panel className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#000B2A] text-white p-6 z-50 transform transition-transform">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-purple-400">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavigation(link.path)}
                className="text-lg hover:text-purple-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Contact Button */}
            <ContactButton
              onClick={() => handleNavigation('/contact')}
              icon={MessageCircle}
              className="block sm:hidden w-full"
            >
              Contact
            </ContactButton>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default React.memo(Navbar);
