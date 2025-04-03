import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const [isHovering, setIsHovering] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng của bạn.`,
      variant: "default",
    });
  };
  
  const renderStars = (rating: number | null) => {
    if (rating === null) rating = 0;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-xs"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-xs"></i>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-xs"></i>);
    }
    
    return stars;
  };
  
  return (
    <div 
      className="group h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col">
        <Link href={`/products/${product.slug}`}>
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 sm:h-52 md:h-56 lg:h-60 object-cover"
            />
            <div className="absolute top-0 left-0 m-2 flex flex-col gap-1">
              {product.isNew && <Badge variant="new">Mới</Badge>}
              {product.isBestseller && <Badge variant="success">Bán chạy</Badge>}
              {product.salePrice && (
                <Badge variant="accent">
                  -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                </Badge>
              )}
            </div>
            
            <div className={`absolute top-0 right-0 m-2 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition mb-2 shadow-sm ${isInWishlist(product.id) ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-primary hover:text-white'}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
                aria-label={isInWishlist(product.id) ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
              >
                <i className={`${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart text-sm`}></i>
              </button>
              <Link href={`/products/${product.slug}`}>
                <button 
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition shadow-sm"
                  aria-label="Xem chi tiết"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-eye text-sm"></i>
                </button>
              </Link>
            </div>
          </div>
        </Link>
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="text-xs text-gray-500 mb-1 line-clamp-1">{product.village}</div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-primary transition h-[2.5rem] sm:h-[3rem]">{product.name}</h3>
          </Link>
          <div className="flex items-center mb-2 mt-auto">
            <div className="flex text-accent">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col xs:flex-row xs:items-center gap-0.5 xs:gap-1">
              <span className="font-bold text-primary text-sm sm:text-base">{formatCurrency(product.salePrice || product.price)}</span>
              {product.salePrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">{formatCurrency(product.price)}</span>
              )}
            </div>
            <button 
              className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
              onClick={handleAddToCart}
              aria-label="Thêm vào giỏ hàng"
            >
              <i className="fas fa-plus text-xs sm:text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
