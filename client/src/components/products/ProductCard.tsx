import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
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
  
  const renderStars = (rating: number) => {
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
      className="group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <Link href={`/products/${product.slug}`}>
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-60 object-cover"
            />
            {product.isNew && (
              <div className="absolute top-0 left-0 m-2">
                <Badge variant="new">Mới</Badge>
              </div>
            )}
            {product.isBestseller && (
              <div className="absolute top-0 left-0 m-2">
                <Badge variant="success">Bán chạy</Badge>
              </div>
            )}
            <div className={`absolute top-0 right-0 m-2 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              <button 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition mb-2 shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <i className="fas fa-heart"></i>
              </button>
              <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition shadow-sm">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </Link>
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.village}</div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-medium mb-1 group-hover:text-primary transition">{product.name}</h3>
          </Link>
          <div className="flex items-center mb-2">
            <div className="flex text-accent">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-primary">{formatCurrency(product.salePrice || product.price)}</span>
              {product.salePrice && (
                <span className="text-sm text-gray-400 line-through ml-1">{formatCurrency(product.price)}</span>
              )}
            </div>
            <button 
              className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
              onClick={handleAddToCart}
            >
              <i className="fas fa-plus text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
