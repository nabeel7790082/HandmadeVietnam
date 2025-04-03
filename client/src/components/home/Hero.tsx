import { useState, useEffect } from 'react';
import { Link } from 'wouter';

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581683705068-ca8f49a8c5de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Tinh hoa làng nghề Việt Nam",
    description: "Những sản phẩm thủ công tinh xảo được tạo nên từ bàn tay khéo léo của các nghệ nhân Việt.",
    badge: null,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1601058268499-e52e4cb7aca3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Gốm sứ Bát Tràng",
    description: "Nghệ thuật gốm truyền thống hơn 700 năm với những đường nét tinh tế và màu men độc đáo.",
    badge: "Bộ sưu tập mới",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1596466107295-3f1ad2bee140?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    title: "Mây tre đan truyền thống",
    description: "Những sản phẩm thân thiện với môi trường, mang nét đẹp mộc mạc và bền vững theo thời gian.",
    badge: "Thân thiện môi trường",
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative">
      <div className="h-[500px] md:h-[600px] relative overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="relative bg-gray-900 h-full">
              <img 
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="max-w-lg">
                  {slide.badge && (
                    <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full mb-4">
                      {slide.badge}
                    </span>
                  )}
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-white/90 text-lg md:text-xl mb-8">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/products" className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition">
                      Khám phá ngay
                    </Link>
                    <Link href="/about" className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-md border border-white/30 transition">
                      Tìm hiểu thêm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation controls */}
        <div className="container mx-auto px-4 absolute inset-0 flex items-center justify-between z-20 pointer-events-none">
          <button 
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition pointer-events-auto"
            onClick={prevSlide}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition pointer-events-auto"
            onClick={nextSlide}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        {/* Pagination indicators */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
