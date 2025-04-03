import { useState } from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { cartItems, cartTotal, shippingCost, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Đặt hàng thành công!",
        description: "Đơn hàng của bạn đã được xác nhận. Cảm ơn bạn đã mua hàng!",
        variant: "default",
      });
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };
  
  return (
    <main className="py-8">
      <Helmet>
        <title>Giỏ hàng | Làng Nghề Việt</title>
        <meta name="description" content="Giỏ hàng của bạn tại Làng Nghề Việt - Sản phẩm thủ công mỹ nghệ Việt Nam" />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-6">Giỏ hàng của bạn</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
            <h2 className="font-display text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-6">Hãy thêm một số sản phẩm vào giỏ hàng của bạn và quay lại đây để tiến hành thanh toán.</p>
            <Link href="/products">
              <a className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition">
                Tiếp tục mua sắm
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-8/12">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-display text-xl font-bold">Chi tiết giỏ hàng</h2>
                    <button 
                      onClick={clearCart}
                      className="text-sm text-gray-500 hover:text-primary transition flex items-center"
                    >
                      <i className="fas fa-trash-alt mr-1"></i> Xóa tất cả
                    </button>
                  </div>
                  
                  <div className="hidden md:flex justify-between text-sm text-gray-500 pb-2 border-b">
                    <div className="w-1/2">Sản phẩm</div>
                    <div className="w-1/6 text-center">Giá</div>
                    <div className="w-1/6 text-center">Số lượng</div>
                    <div className="w-1/6 text-center">Tổng cộng</div>
                  </div>
                  
                  <div className="space-y-4 mt-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col md:flex-row md:items-center py-4 border-b">
                        {/* Product */}
                        <div className="flex w-full md:w-1/2 mb-4 md:mb-0">
                          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <Link href={`/products/${item.product.slug}`}>
                              <a className="font-medium hover:text-primary transition">
                                {item.product.name}
                              </a>
                            </Link>
                            <p className="text-sm text-gray-500 mb-1">{item.product.village}</p>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-gray-500 hover:text-primary transition md:hidden flex items-center"
                            >
                              <i className="fas fa-trash-alt mr-1"></i> Xóa
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-primary transition hidden md:block"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                        
                        {/* Price */}
                        <div className="w-full md:w-1/6 flex justify-between md:block md:text-center mb-2 md:mb-0">
                          <span className="md:hidden">Giá:</span>
                          <span className="font-medium">
                            {formatCurrency(item.product.salePrice || item.product.price)}
                          </span>
                        </div>
                        
                        {/* Quantity */}
                        <div className="w-full md:w-1/6 flex justify-between md:justify-center items-center mb-2 md:mb-0">
                          <span className="md:hidden">Số lượng:</span>
                          <div className="flex items-center border rounded">
                            <button 
                              onClick={() => decrementQuantity(item.id)}
                              className="px-2 py-1 text-gray-500 hover:text-primary"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 border-x">{item.quantity}</span>
                            <button 
                              onClick={() => incrementQuantity(item.id)}
                              className="px-2 py-1 text-gray-500 hover:text-primary"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="w-full md:w-1/6 flex justify-between md:block md:text-center">
                          <span className="md:hidden">Tổng cộng:</span>
                          <span className="font-bold text-primary">
                            {formatCurrency((item.product.salePrice || item.product.price) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Link href="/products">
                  <a className="flex items-center text-primary hover:underline">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Tiếp tục mua sắm
                  </a>
                </Link>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-4/12">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="font-display text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span>{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span>{formatCurrency(shippingCost)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatCurrency(cartTotal + shippingCost)}</span>
                </div>
                
                <Button 
                  className="w-full mb-3 h-12 text-base"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Đang xử lý...
                    </>
                  ) : (
                    'Tiến hành thanh toán'
                  )}
                </Button>
                
                <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                  <i className="fas fa-lock mr-2"></i>
                  Thanh toán an toàn &amp; bảo mật
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Chúng tôi chấp nhận</h3>
                  <div className="flex gap-2">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fab fa-cc-visa text-blue-700 text-xl"></i>
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fab fa-cc-mastercard text-red-600 text-xl"></i>
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fas fa-money-bill-wave text-green-600 text-lg"></i>
                    </div>
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <i className="fas fa-university text-gray-700 text-lg"></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mt-4">
                <h3 className="font-medium mb-2">Có mã giảm giá?</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Nhập mã giảm giá" 
                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition">
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
