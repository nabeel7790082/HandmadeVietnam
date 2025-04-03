import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold text-white">Làng Nghề <span className="text-primary">Việt</span></span>
            </Link>
            <p className="text-white/70 mb-4">
              Kết nối giữa nghệ nhân làng nghề truyền thống và người yêu thích sản phẩm thủ công mỹ nghệ Việt Nam.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=gom-su" className="text-white/70 hover:text-primary transition">Gốm sứ Bát Tràng</Link></li>
              <li><Link href="/products?category=may-tre-dan" className="text-white/70 hover:text-primary transition">Mây tre đan Phú Vinh</Link></li>
              <li><Link href="/products?category=lua-to-tam" className="text-white/70 hover:text-primary transition">Lụa tơ tằm Vạn Phúc</Link></li>
              <li><Link href="/products?category=do-go-my-nghe" className="text-white/70 hover:text-primary transition">Đồ gỗ mỹ nghệ Đồng Kỵ</Link></li>
              <li><Link href="/products?category=theu-ren" className="text-white/70 hover:text-primary transition">Thêu ren Văn Lâm</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Thông tin</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/70 hover:text-primary transition">Về chúng tôi</Link></li>
              <li><Link href="/about#artisans" className="text-white/70 hover:text-primary transition">Câu chuyện nghệ nhân</Link></li>
              <li><Link href="/about#purchase-guide" className="text-white/70 hover:text-primary transition">Hướng dẫn mua hàng</Link></li>
              <li><Link href="/about#returns" className="text-white/70 hover:text-primary transition">Chính sách đổi trả</Link></li>
              <li><Link href="/about#terms" className="text-white/70 hover:text-primary transition">Điều khoản dịch vụ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary"></i>
                <span className="text-white/70">123 Đường Láng, Quận Đống Đa, Hà Nội</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-primary"></i>
                <a href="tel:+84912345678" className="text-white/70 hover:text-primary transition">0912 345 678</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-primary"></i>
                <a href="mailto:info@langnghe.vn" className="text-white/70 hover:text-primary transition">info@langnghe.vn</a>
              </li>
              <li className="flex items-center">
                <i className="far fa-clock mr-3 text-primary"></i>
                <span className="text-white/70">Thứ 2 - Chủ nhật: 8:00 - 20:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © 2023 Làng Nghề Việt. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white/70 hover:text-primary transition text-sm">Chính sách bảo mật</a>
              <span className="text-white/30">|</span>
              <a href="#" className="text-white/70 hover:text-primary transition text-sm">Điều khoản sử dụng</a>
              <span className="text-white/30">|</span>
              <a href="#" className="text-white/70 hover:text-primary transition text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
