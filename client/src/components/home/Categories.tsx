import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category } from "@shared/schema";

const Categories = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="h-10 w-64 bg-gray-200 animate-pulse mx-auto mb-4 rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse max-w-xl mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 animate-pulse mb-2"></div>
                  <div className="h-4 w-24 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (error || !categories) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Không thể tải danh mục sản phẩm. Vui lòng thử lại sau.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Khám phá danh mục</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Tìm hiểu về các sản phẩm thủ công đặc trưng của từng làng nghề truyền thống Việt Nam</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/products?category=${category.slug}`}
              className="group block rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-display font-medium text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.productCount} sản phẩm</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/products" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
            Xem tất cả danh mục
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
