import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  const nextSlide = () => {
    if (!testimonials) return;
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    if (!testimonials) return;
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  // Auto slide
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials]);
  
  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="h-10 w-64 bg-white/20 animate-pulse mx-auto mb-4 rounded"></div>
            <div className="h-4 bg-white/20 animate-pulse max-w-xl mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-white/20 animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-white/20 animate-pulse mb-1 rounded w-40"></div>
                  <div className="h-4 bg-white/20 animate-pulse rounded w-20"></div>
                </div>
                <div className="flex ml-auto">
                  <div className="w-10 h-10 rounded bg-white/20 animate-pulse"></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-white/20 animate-pulse"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white/20 animate-pulse rounded"></div>
                <div className="h-4 bg-white/20 animate-pulse rounded"></div>
                <div className="h-4 bg-white/20 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || !testimonials || testimonials.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">Không thể tải đánh giá từ khách hàng. Vui lòng thử lại sau.</p>
        </div>
      </section>
    );
  }
  
  const currentTestimonial = testimonials[currentSlide];
  
  return (
    <section className="py-12 md:py-16 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Khách hàng nói gì về chúng tôi</h2>
          <p className="text-white/80 max-w-2xl mx-auto">Những trải nghiệm và cảm nhận từ khách hàng đã mua sắm và sử dụng sản phẩm thủ công từ Làng Nghề Việt</p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`transition-opacity duration-500 absolute inset-0 ${index === currentSlide ? 'opacity-100 z-10 relative' : 'opacity-0 z-0'}`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">{testimonial.name}</h3>
                    <p className="text-white/70">{testimonial.location}</p>
                  </div>
                  <div className="flex ml-auto">
                    <i className="fas fa-quote-right text-4xl text-primary/60"></i>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={i < testimonial.rating ? "fas fa-star" : "far fa-star"}
                      ></i>
                    ))}
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-lg">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          ))}
          
          {/* Pagination indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
              ></button>
            ))}
          </div>
          
          {/* Navigation arrows for larger screens */}
          {testimonials.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition hidden md:flex"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition hidden md:flex"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
