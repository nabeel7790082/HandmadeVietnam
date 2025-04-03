import { Helmet } from 'react-helmet';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Artisans from '@/components/home/Artisans';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Làng Nghề Việt - Sản Phẩm Thủ Công Mỹ Nghệ</title>
        <meta name="description" content="Khám phá và mua sắm các sản phẩm thủ công mỹ nghệ từ các làng nghề truyền thống của Việt Nam." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Artisans />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
