import { useEffect } from 'react';
import { Link } from 'wouter';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

export const Wishlist = () => {
  const { wishlistItems, totalItems, isWishlistOpen, toggleWishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Close wishlist when pressing Escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWishlistOpen) {
        toggleWishlist();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isWishlistOpen, toggleWishlist]);

  // Prevent background scrolling when wishlist is open
  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWishlistOpen]);

  const handleAddToCart = (itemId: number) => {
    const item = wishlistItems.find(item => item.product.id === itemId);
    if (item) {
      addToCart(item.product, 1);
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeFromWishlist(productId);
  };

  return (
    <>
      {/* Overlay */}
      {isWishlistOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleWishlist}
        />
      )}
      
      {/* Wishlist Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white flex flex-col shadow-xl transform transition-transform ease-in-out duration-300 ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="p-4 bg-primary text-white flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="mr-2 h-6 w-6" />
            <h2 className="text-xl font-medium">Danh sách yêu thích</h2>
          </div>
          <button 
            onClick={toggleWishlist}
            className="rounded-full hover:bg-white/20 p-1 transition"
            aria-label="Đóng danh sách yêu thích"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <Heart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Danh sách yêu thích trống</h3>
              <p className="text-gray-500 mb-6">Bạn chưa thêm sản phẩm nào vào danh sách yêu thích.</p>
              <Link href="/products">
                <button 
                  onClick={toggleWishlist}
                  className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition flex items-center"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Khám phá sản phẩm
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium">{totalItems} sản phẩm</p>
                <button 
                  onClick={clearWishlist}
                  className="text-sm text-gray-500 hover:text-primary transition"
                >
                  Xóa tất cả
                </button>
              </div>
              
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-3">
                    <div className="flex gap-3">
                      <Link href={`/products/${item.product.slug}`}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-20 h-20 object-cover rounded-md"
                          onClick={toggleWishlist}
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <Link href={`/products/${item.product.slug}`}>
                            <h4 
                              className="font-medium text-sm hover:text-primary transition line-clamp-2"
                              onClick={toggleWishlist}
                            >
                              {item.product.name}
                            </h4>
                          </Link>
                          <button 
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition ml-1"
                            aria-label="Xóa khỏi danh sách yêu thích"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-1 text-sm font-bold text-primary">
                          {formatCurrency(item.product.salePrice || item.product.price)}
                        </div>
                        <button 
                          onClick={() => {
                            handleAddToCart(item.product.id);
                            handleRemoveItem(item.product.id);
                          }}
                          className="mt-2 px-3 py-1 bg-primary/10 text-primary text-xs rounded hover:bg-primary hover:text-white transition"
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Footer with close button */}
        {wishlistItems.length > 0 && (
          <>
            <Separator />
            <div className="p-4">
              <button 
                onClick={toggleWishlist}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-md font-medium transition"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};