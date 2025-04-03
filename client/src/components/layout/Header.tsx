import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/useCart";

type HeaderProps = {
  isScrolled: boolean;
};

const Header = ({ isScrolled }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartItems, toggleCart } = useCart();
  
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <header className={`sticky top-0 z-50 bg-white shadow-md transition-all ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4">
        {/* Top navigation bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="hidden md:flex space-x-4 text-sm">
            <a href="tel:+84912345678" className="flex items-center hover:text-primary transition">
              <i className="fas fa-phone mr-2 text-primary"></i> 0912 345 678
            </a>
            <a href="mailto:info@langnghe.vn" className="flex items-center hover:text-primary transition">
              <i className="fas fa-envelope mr-2 text-primary"></i> info@langnghe.vn
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm hover:text-primary transition">Đăng nhập</a>
            <a href="#" className="text-sm hover:text-primary transition">Đăng ký</a>
            <div className="relative group">
              <button className="text-sm flex items-center hover:text-primary transition">
                <i className="fas fa-globe mr-1"></i> Tiếng Việt
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">English</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 text-primary font-medium">Tiếng Việt</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <span className="font-display text-2xl font-bold text-primary">Làng Nghề <span className="text-secondary">Việt</span></span>
          </Link>
          
          {/* Search bar */}
          <div className="hidden md:flex flex-1 mx-10">
            <div className="relative w-full max-w-xl">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm thủ công..." 
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          
          {/* Desktop navigation links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={`font-medium hover:text-primary transition ${location === '/' ? 'text-primary' : ''}`}>
              Trang chủ
            </Link>
            <div className="relative group">
              <Link href="/products" className={`font-medium hover:text-primary transition flex items-center ${location === '/products' ? 'text-primary' : ''}`}>
                Sản phẩm
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block">
                <Link href="/products?category=gom-su" className="block px-4 py-2 hover:bg-gray-100">Gốm sứ</Link>
                <Link href="/products?category=may-tre-dan" className="block px-4 py-2 hover:bg-gray-100">Mây tre đan</Link>
                <Link href="/products?category=theu-ren" className="block px-4 py-2 hover:bg-gray-100">Thêu ren</Link>
                <Link href="/products?category=do-go-my-nghe" className="block px-4 py-2 hover:bg-gray-100">Đồ gỗ mỹ nghệ</Link>
                <Link href="/products?category=lua-to-tam" className="block px-4 py-2 hover:bg-gray-100">Lụa tơ tằm</Link>
              </div>
            </div>
            <Link href="/about" className={`font-medium hover:text-primary transition ${location === '/about' ? 'text-primary' : ''}`}>
              Về chúng tôi
            </Link>
            <Link href="/contact" className={`font-medium hover:text-primary transition ${location === '/contact' ? 'text-primary' : ''}`}>
              Liên hệ
            </Link>
          </nav>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-primary transition relative">
              <i className="fas fa-heart text-xl"></i>
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </a>
            <button 
              onClick={toggleCart} 
              className="hover:text-primary transition relative"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>
            <button 
              className="lg:hidden hover:text-primary transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile search bar (hidden on desktop) */}
        <div className="lg:hidden pb-4">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm thủ công..." 
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="container mx-auto px-4 py-3 bg-white border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`font-medium py-2 hover:text-primary transition ${location === '/' ? 'text-primary' : ''}`}
                onClick={closeMenu}
              >
                Trang chủ
              </Link>
              <div className="relative">
                <Link 
                  href="/products" 
                  className={`font-medium py-2 w-full text-left flex items-center justify-between hover:text-primary transition ${location === '/products' ? 'text-primary' : ''}`}
                  onClick={closeMenu}
                >
                  Sản phẩm
                  <i className="fas fa-chevron-down text-xs"></i>
                </Link>
                <div className="pl-4 mt-1 border-l-2 border-gray-200">
                  <Link href="/products?category=gom-su" className="block py-2 hover:text-primary transition" onClick={closeMenu}>Gốm sứ</Link>
                  <Link href="/products?category=may-tre-dan" className="block py-2 hover:text-primary transition" onClick={closeMenu}>Mây tre đan</Link>
                  <Link href="/products?category=theu-ren" className="block py-2 hover:text-primary transition" onClick={closeMenu}>Thêu ren</Link>
                  <Link href="/products?category=do-go-my-nghe" className="block py-2 hover:text-primary transition" onClick={closeMenu}>Đồ gỗ mỹ nghệ</Link>
                  <Link href="/products?category=lua-to-tam" className="block py-2 hover:text-primary transition" onClick={closeMenu}>Lụa tơ tằm</Link>
                </div>
              </div>
              <Link 
                href="/about" 
                className={`font-medium py-2 hover:text-primary transition ${location === '/about' ? 'text-primary' : ''}`}
                onClick={closeMenu}
              >
                Về chúng tôi
              </Link>
              <Link 
                href="/contact" 
                className={`font-medium py-2 hover:text-primary transition ${location === '/contact' ? 'text-primary' : ''}`}
                onClick={closeMenu}
              >
                Liên hệ
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
