import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { Product } from '@shared/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { formatCurrency } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';

const ProductDetail = () => {
  const [match, params] = useRoute('/products/:slug');
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${params?.slug}`],
    enabled: !!params?.slug,
  });
  
  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    select: (data) => {
      if (!product) return [];
      // Filter products in the same category, excluding current product
      return data
        .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
        .slice(0, 4);
    },
    enabled: !!product,
  });
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Đã thêm vào giỏ hàng",
        description: `${quantity} ${product.name} đã được thêm vào giỏ hàng của bạn.`,
        variant: "default",
      });
    }
  };
  
  const renderStars = (rating: number | null) => {
    if (rating === null) rating = 0;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-gray-200 animate-pulse h-[400px] md:h-[500px] w-full rounded-lg"></div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            </div>
            <div className="flex gap-4 mt-6">
              <div className="h-12 bg-gray-200 animate-pulse rounded w-32"></div>
              <div className="h-12 bg-gray-200 animate-pulse rounded w-48"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
        <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link href="/products">
          <a className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition">
            Quay lại cửa hàng
          </a>
        </Link>
      </div>
    );
  }
  
  // Get all product images or use the main image if no additional images
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];
  
  // Selected image to display
  const selectedImage = productImages[activeImageIndex];
  
  return (
    <main className="py-8">
      <Helmet>
        <title>{product.name} | Làng Nghề Việt</title>
        <meta name="description" content={product.description || `Sản phẩm thủ công mỹ nghệ ${product.name} từ ${product.village}`} />
      </Helmet>
      
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center text-sm text-gray-500">
            <Link href="/">
              <a className="hover:text-primary">Trang chủ</a>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products">
              <a className="hover:text-primary">Sản phẩm</a>
            </Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-12">
          {/* Product images */}
          <div className="w-full lg:w-1/2">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm mb-4">
              <img 
                src={selectedImage} 
                alt={product.name}
                className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-contain mx-auto"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge variant="new">Mới</Badge>}
                {product.isBestseller && <Badge variant="success">Bán chạy</Badge>}
                {product.salePrice && (
                  <Badge variant="accent">
                    -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Thumbnail images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`border rounded-md overflow-hidden hover:border-primary ${index === activeImageIndex ? 'border-primary' : 'border-gray-200'}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-16 sm:h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">{product.village}</span>
              <span className="text-gray-300 hidden sm:inline-block">|</span>
              <div className="flex items-center">
                <div className="flex text-accent mr-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-500">{product.reviewCount} đánh giá</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(product.salePrice || product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              {product.inStock ? (
                <span className="inline-block mt-1 text-success font-medium">
                  <i className="fas fa-check-circle mr-1"></i> Còn hàng
                </span>
              ) : (
                <span className="inline-block mt-1 text-error font-medium">
                  <i className="fas fa-times-circle mr-1"></i> Hết hàng
                </span>
              )}
            </div>
            
            <Separator className="my-6" />
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Mô tả sản phẩm:</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
              </p>
            </div>
            
            {/* Add to cart */}
            {product.inStock && (
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-primary border-r"
                    aria-label="Giảm số lượng"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="w-14 h-12 flex items-center justify-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-primary border-l"
                    aria-label="Tăng số lượng"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition flex items-center justify-center"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Thêm vào giỏ hàng
                </button>
                <button 
                  className={`w-12 h-12 border rounded-md flex items-center justify-center transition ${isInWishlist(product.id) ? 'bg-primary text-white border-primary' : 'border-gray-300 hover:text-primary hover:border-primary'}`}
                  aria-label={isInWishlist(product.id) ? "Xóa khỏi yêu thích" : "Thêm vào danh sách yêu thích"}
                  onClick={() => {
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                      toast({
                        title: "Đã xóa khỏi danh sách yêu thích",
                        description: `${product.name} đã được xóa khỏi danh sách yêu thích.`,
                        variant: "default",
                      });
                    } else {
                      addToWishlist(product);
                      toast({
                        title: "Đã thêm vào danh sách yêu thích",
                        description: `${product.name} đã được thêm vào danh sách yêu thích.`,
                        variant: "default",
                      });
                    }
                  }}
                >
                  <i className={`${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart`}></i>
                </button>
              </div>
            )}
            
            {/* Additional info */}
            <div className="mt-8">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <i className="fas fa-shipping-fast mr-2 text-primary"></i>
                  Giao hàng miễn phí
                </div>
                <div className="flex items-center">
                  <i className="fas fa-undo mr-2 text-primary"></i>
                  Đổi trả trong 7 ngày
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional tabs */}
        <div className="mb-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b border-gray-200 mb-6 flex overflow-x-auto pb-px">
              <TabsTrigger value="details" className="text-sm sm:text-base lg:text-lg font-display py-2 sm:py-3 whitespace-nowrap">Chi tiết sản phẩm</TabsTrigger>
              <TabsTrigger value="shipping" className="text-sm sm:text-base lg:text-lg font-display py-2 sm:py-3 whitespace-nowrap">Vận chuyển & Đổi trả</TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm sm:text-base lg:text-lg font-display py-2 sm:py-3 whitespace-nowrap">Đánh giá ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="prose max-w-none prose-sm sm:prose-base">
                <h3 className="font-display text-lg sm:text-xl font-bold mb-3 sm:mb-4">Thông tin chi tiết</h3>
                <p>
                  {product.description || 'Chưa có thông tin chi tiết cho sản phẩm này.'}
                </p>
                <h4 className="font-display text-base sm:text-lg font-bold mt-4 sm:mt-6 mb-2 sm:mb-3">Nguồn gốc</h4>
                <p>
                  Sản phẩm được làm thủ công bởi các nghệ nhân tài năng tại {product.village}. Mỗi sản phẩm đều mang nét đặc trưng riêng và thể hiện kỹ nghệ truyền thống của làng nghề.
                </p>
                <h4 className="font-display text-base sm:text-lg font-bold mt-4 sm:mt-6 mb-2 sm:mb-3">Kích thước & Trọng lượng</h4>
                <p>
                  Thông tin về kích thước và trọng lượng sẽ được cập nhật sớm. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết.
                </p>
                <h4 className="font-display text-base sm:text-lg font-bold mt-4 sm:mt-6 mb-2 sm:mb-3">Bảo quản</h4>
                <p>
                  Để sản phẩm bền đẹp, tránh ánh nắng trực tiếp, nơi ẩm ướt và các tác động mạnh. Làm sạch bằng khăn mềm.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="prose max-w-none prose-sm sm:prose-base">
                <h3 className="font-display text-lg sm:text-xl font-bold mb-3 sm:mb-4">Vận chuyển</h3>
                <p>
                  Chúng tôi giao hàng trên toàn quốc thông qua các đơn vị vận chuyển uy tín như Giao hàng nhanh, Viettel Post, GHTK.
                </p>
                <ul className="space-y-1 sm:space-y-2">
                  <li>Miễn phí giao hàng cho đơn hàng từ 500.000₫</li>
                  <li>Phí vận chuyển tiêu chuẩn: 30.000₫</li>
                  <li>Thời gian giao hàng: 2-5 ngày làm việc (tùy khu vực)</li>
                </ul>
                
                <h3 className="font-display text-lg sm:text-xl font-bold mt-5 sm:mt-6 mb-3 sm:mb-4">Chính sách đổi trả</h3>
                <p>
                  Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi do nhà sản xuất hoặc vận chuyển.
                </p>
                <p>
                  Điều kiện đổi trả:
                </p>
                <ul className="space-y-1 sm:space-y-2">
                  <li>Sản phẩm còn nguyên trạng, không có dấu hiệu đã qua sử dụng</li>
                  <li>Còn đầy đủ tem, nhãn, bao bì gốc</li>
                  <li>Có hóa đơn mua hàng</li>
                </ul>
                <p>
                  Vui lòng liên hệ với chúng tôi qua số điện thoại 0912 345 678 hoặc email info@langnghe.vn để được hướng dẫn quy trình đổi trả.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-2">Đánh giá từ khách hàng</h3>
                  <div className="flex items-center">
                    <div className="flex text-accent mr-2">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-base sm:text-lg font-bold">{product.rating ? product.rating.toFixed(1) : '0.0'}</span>
                    <span className="text-sm text-gray-500 ml-1">({product.reviewCount} đánh giá)</span>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition">
                  Viết đánh giá
                </button>
              </div>
              
              {/* Reviews list - mocked for now */}
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <h4 className="font-medium">Nguyễn Văn A</h4>
                          <div className="flex text-accent my-1">
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">2 tháng trước</span>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Sản phẩm rất đẹp, đúng với mô tả và hình ảnh. Chất lượng tuyệt vời, giao hàng nhanh chóng. Tôi rất hài lòng và sẽ tiếp tục ủng hộ shop!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-b pb-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div>
                          <h4 className="font-medium">Trần Thị B</h4>
                          <div className="flex text-accent my-1">
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                            <i className="fas fa-star text-xs sm:text-sm"></i>
                            <i className="far fa-star text-xs sm:text-sm"></i>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">3 tháng trước</span>
                      </div>
                      <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Sản phẩm đẹp, tuy nhiên hơi nhỏ hơn so với tôi tưởng tượng. Chất lượng tốt, đóng gói cẩn thận, giao hàng nhanh.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                    Xem thêm đánh giá
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
