import { useContext } from 'react';
import { WishlistContext } from '@/context/WishlistContext';

export const useWishlist = () => {
  return useContext(WishlistContext);
};