import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Artisan } from "@shared/schema";

const Artisans = () => {
  const { data: artisans, isLoading, error } = useQuery<Artisan[]>({
    queryKey: ['/api/artisans'],
  });
  
  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="h-10 w-64 bg-gray-200 animate-pulse mx-auto mb-4 rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse max-w-xl mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-light rounded-lg overflow-hidden shadow-sm p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-6 bg-gray-200 animate-pulse mb-2 mx-auto w-40"></div>
                <div className="h-4 bg-gray-200 animate-pulse mb-3 mx-auto w-32"></div>
                <div className="h-4 bg-gray-200 animate-pulse mb-4 mx-auto"></div>
                <div className="h-4 w-36 bg-gray-200 animate-pulse mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (error || !artisans) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Không thể tải thông tin nghệ nhân. Vui lòng thử lại sau.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Nghệ nhân tiêu biểu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Những người thợ thủ công tài năng đã và đang gìn giữ, phát triển các giá trị văn hóa truyền thống</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="bg-light rounded-lg overflow-hidden shadow-sm hover:shadow-md transition p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src={artisan.image} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{artisan.name}</h3>
              <p className="text-primary font-medium mb-3">{artisan.village}</p>
              <p className="text-gray-600 mb-4">{artisan.description}</p>
              <Link href={`/about#artisan-${artisan.id}`} className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                Xem tác phẩm
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Artisans;
