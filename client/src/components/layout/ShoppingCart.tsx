import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from '@/lib/utils';

const ShoppingCart = () => {
  const { 
    isCartOpen, 
    toggleCart, 
    cartItems, 
    cartTotal, 
    shippingCost,
    removeFromCart,
    incrementQuantity,
    decrementQuantity
  } = useCart();
  
  const [isRendered, setIsRendered] = useState(false);
  
  useEffect(() => {
    setIsRendered(true);
  }, []);
  
  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isCartOpen]);
  
  if (!isRendered) return null;
  
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-display text-xl font-bold">Giỏ hàng của bạn</h2>
            <button className="text-gray-400 hover:text-primary" onClick={toggleCart}>
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 mb-6">Giỏ hàng của bạn đang trống</p>
                <button 
                  onClick={toggleCart}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex border-b pb-4">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <button 
                        className="text-gray-400 hover:text-error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">{item.product.village}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <button 
                          className="px-2 py-1 text-gray-500 hover:text-primary"
                          onClick={() => decrementQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 border-x">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-500 hover:text-primary"
                          onClick={() => incrementQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-medium text-primary">
                        {formatCurrency(item.product.salePrice || item.product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-2">
                <span>Tạm tính:</span>
                <span className="font-medium">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Phí vận chuyển:</span>
                <span className="font-medium">{formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Tổng cộng:</span>
                <span className="text-primary">{formatCurrency(cartTotal + shippingCost)}</span>
              </div>
              <Link 
                href="/cart" 
                className="block w-full bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-md font-medium transition"
                onClick={toggleCart}
              >
                Thanh toán ngay
              </Link>
              <button 
                onClick={toggleCart}
                className="block w-full mt-2 border border-primary text-primary hover:bg-primary/5 text-center py-3 rounded-md font-medium transition"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
