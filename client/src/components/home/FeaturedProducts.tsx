import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import ProductCard from "@/components/products/ProductCard";

const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });
  
  const filteredProducts = activeFilter 
    ? products?.filter(product => {
        // Find category by ID (this is simplified, in reality you'd want to get category name by ID)
        return product.categoryId === parseInt(activeFilter);
      })
    : products;
  
  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-10">
            <div>
              <div className="h-10 w-64 bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="flex space-x-2 mt-4 lg:mt-0">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 w-20 bg-gray-200 animate-pulse rounded-md"></div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="h-60 bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-2">
                  <div className="h-3 w-20 bg-gray-200 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 animate-pulse"></div>
                  <div className="h-3 w-24 bg-gray-200 animate-pulse"></div>
                  <div className="flex justify-between">
                    <div className="h-5 w-20 bg-gray-200 animate-pulse"></div>
                    <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (error || !products) {
    return (
      <section className="py-12 md:py-16 bg-light">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Không thể tải sản phẩm nổi bật. Vui lòng thử lại sau.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12 md:py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Sản phẩm nổi bật</h2>
            <p className="text-gray-600">Những tác phẩm thủ công được yêu thích và đánh giá cao</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
            <button 
              className={`px-4 py-2 border rounded-md transition ${activeFilter === null ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 hover:bg-primary hover:text-white'}`}
              onClick={() => setActiveFilter(null)}
            >
              Tất cả
            </button>
            <button 
              className={`px-4 py-2 border rounded-md transition ${activeFilter === '1' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 hover:bg-primary hover:text-white'}`}
              onClick={() => setActiveFilter('1')}
            >
              Gốm sứ
            </button>
            <button 
              className={`px-4 py-2 border rounded-md transition ${activeFilter === '2' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 hover:bg-primary hover:text-white'}`}
              onClick={() => setActiveFilter('2')}
            >
              Mây tre
            </button>
            <button 
              className={`px-4 py-2 border rounded-md transition hidden md:block ${activeFilter === '3' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 hover:bg-primary hover:text-white'}`}
              onClick={() => setActiveFilter('3')}
            >
              Lụa
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/products" 
            className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
