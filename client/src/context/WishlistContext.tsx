import { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { generateUniqueId } from "@/lib/utils";

export type WishlistItem = {
  id: number;
  product: Product;
  sessionId: string;
};

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  totalItems: number;
  isWishlistOpen: boolean;
  toggleWishlist: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
};

export const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  totalItems: 0,
  isWishlistOpen: false,
  toggleWishlist: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
});

type WishlistProviderProps = {
  children: ReactNode;
};

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Generate or retrieve session ID for the current user
    const existingSessionId = localStorage.getItem("wishlist_session_id");
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = generateUniqueId();
      localStorage.setItem("wishlist_session_id", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    // Load wishlist from localStorage when session ID is available
    if (sessionId) {
      const savedWishlist = localStorage.getItem(`wishlist_${sessionId}`);
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist from localStorage:", error);
        }
      }
    }
  }, [sessionId]);

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    if (sessionId) {
      localStorage.setItem(`wishlist_${sessionId}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, sessionId]);

  const toggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const addToWishlist = (product: Product) => {
    // Check if product is already in wishlist
    const existingItem = wishlistItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      toast({
        title: "Sản phẩm đã có trong danh sách yêu thích",
        description: `${product.name} đã được thêm vào danh sách yêu thích trước đó.`,
        variant: "default",
      });
      return;
    }
    
    // Add to wishlist
    const newItem: WishlistItem = {
      id: Date.now(),
      product,
      sessionId,
    };
    
    setWishlistItems(prev => [...prev, newItem]);
    
    toast({
      title: "Đã thêm vào danh sách yêu thích",
      description: `${product.name} đã được thêm vào danh sách yêu thích.`,
      variant: "default",
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.product.id !== productId));
    
    toast({
      title: "Đã xóa khỏi danh sách yêu thích",
      description: "Sản phẩm đã được xóa khỏi danh sách yêu thích.",
      variant: "default",
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.product.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Đã xóa danh sách yêu thích",
      description: "Tất cả sản phẩm đã được xóa khỏi danh sách yêu thích.",
      variant: "default",
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        totalItems: wishlistItems.length,
        isWishlistOpen,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};