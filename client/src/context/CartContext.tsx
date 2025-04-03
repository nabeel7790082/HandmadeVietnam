import { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { generateUniqueId } from '@/lib/utils';

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  sessionId: string;
};

type CartContextType = {
  cartItems: CartItem[];
  cartTotal: number;
  shippingCost: number;
  totalItems: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  incrementQuantity: (itemId: number) => void;
  decrementQuantity: (itemId: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartTotal: 0,
  shippingCost: 30000,
  totalItems: 0,
  isCartOpen: false,
  toggleCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  clearCart: () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const shippingCost = 30000;

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('cartSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = generateUniqueId();
      localStorage.setItem('cartSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Fetch cart items when session ID is available
  useEffect(() => {
    if (sessionId) {
      fetchCartItems();
    }
  }, [sessionId]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`/api/cart/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = async (product: Product, quantity: number) => {
    try {
      const response = await apiRequest('POST', '/api/cart', { 
        productId: product.id, 
        sessionId,
        quantity
      });
      
      if (response.ok) {
        fetchCartItems();
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const response = await apiRequest('DELETE', `/api/cart/${itemId}`, undefined);
      
      if (response.ok) {
        setCartItems(current => current.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateCartItemQuantity = async (itemId: number, quantity: number) => {
    try {
      const response = await apiRequest('PUT', `/api/cart/${itemId}`, { quantity });
      
      if (response.ok) {
        if (quantity > 0) {
          setCartItems(current => 
            current.map(item => 
              item.id === itemId ? { ...item, quantity } : item
            )
          );
        } else {
          setCartItems(current => current.filter(item => item.id !== itemId));
        }
      }
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const incrementQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      updateCartItemQuantity(itemId, item.quantity + 1);
    }
  };

  const decrementQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(itemId, item.quantity - 1);
    } else if (item) {
      removeFromCart(itemId);
    }
  };

  const clearCart = async () => {
    try {
      const response = await apiRequest('DELETE', `/api/cart/session/${sessionId}`, undefined);
      
      if (response.ok) {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        shippingCost,
        totalItems,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
