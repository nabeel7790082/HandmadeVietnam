import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { Product, Category } from '@shared/schema';
import ProductCard from '@/components/products/ProductCard';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/lib/utils';

const Products = () => {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [filters, setFilters] = useState({
    isNew: false,
    isBestseller: false,
  });
  
  // Get category from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
    
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);
  
  // Fetch all products
  const { 
    data: products, 
    isLoading: productsLoading, 
    error: productsError 
  } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Fetch all categories
  const { 
    data: categories, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Filter products based on selected filters
  const filteredProducts = products?.filter(product => {
    // Category filter
    if (selectedCategory) {
      const category = categories?.find(c => c.slug === selectedCategory);
      if (category && product.categoryId !== category.id) {
        return false;
      }
    }
    
    // Price range filter
    const price = product.salePrice || product.price;
    if (price < priceRange[0] || price > priceRange[1]) {
      return false;
    }
    
    // Other filters
    if (filters.isNew && !product.isNew) {
      return false;
    }
    
    if (filters.isBestseller && !product.isBestseller) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case 'priceDesc':
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return b.rating - a.rating;
      default: // featured
        return b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1;
    }
  });
  
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug === selectedCategory ? null : slug);
    
    // Update URL
    const params = new URLSearchParams(window.location.search);
    if (slug === selectedCategory) {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  
  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };
  
  const clearAllFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 2000000]);
    setSortBy('featured');
    setFilters({
      isNew: false,
      isBestseller: false,
    });
    
    // Update URL
    window.history.replaceState({}, '', window.location.pathname);
  };
  
  // Get active category name
  const activeCategoryName = selectedCategory 
    ? categories?.find(c => c.slug === selectedCategory)?.name 
    : 'Tất cả sản phẩm';
  
  return (
    <main className="py-8">
      <Helmet>
        <title>{activeCategoryName || 'Sản phẩm'} | Làng Nghề Việt</title>
        <meta name="description" content="Khám phá các sản phẩm thủ công mỹ nghệ từ các làng nghề truyền thống Việt Nam." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{activeCategoryName}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500">
            <a href="/" className="hover:text-primary">Trang chủ</a>
            <span className="mx-2">/</span>
            <span>Sản phẩm</span>
            {selectedCategory && (
              <>
                <span className="mx-2">/</span>
                <span>{activeCategoryName}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-lg">Lọc sản phẩm</h3>
                  <button 
                    onClick={clearAllFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
                
                {/* Categories filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Danh mục</h4>
                  {categoriesLoading ? (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-6 bg-gray-200 animate-pulse rounded"></div>
                      ))}
                    </div>
                  ) : categoriesError ? (
                    <p className="text-red-500 text-sm">Không thể tải danh mục</p>
                  ) : (
                    <div className="space-y-2">
                      {categories?.map(category => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox
                            id={`category-${category.slug}`}
                            checked={selectedCategory === category.slug}
                            onCheckedChange={() => handleCategoryChange(category.slug)}
                          />
                          <label 
                            htmlFor={`category-${category.slug}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name} ({category.productCount})
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                {/* Price range filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Khoảng giá</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 2000000]}
                      max={2000000}
                      step={100000}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceChange}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Other filters */}
                <div>
                  <h4 className="font-medium mb-3">Khác</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="filter-new"
                        checked={filters.isNew}
                        onCheckedChange={() => handleFilterChange('isNew')}
                      />
                      <label 
                        htmlFor="filter-new"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sản phẩm mới
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="filter-bestseller"
                        checked={filters.isBestseller}
                        onCheckedChange={() => handleFilterChange('isBestseller')}
                      />
                      <label 
                        htmlFor="filter-bestseller"
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Bán chạy
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="lg:w-3/4">
            {/* Sort controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-500 mb-2 md:mb-0">
                Hiển thị {sortedProducts?.length || 0} sản phẩm
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sắp xếp theo:</span>
                <select 
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Nổi bật</option>
                  <option value="newest">Mới nhất</option>
                  <option value="priceAsc">Giá: Thấp đến cao</option>
                  <option value="priceDesc">Giá: Cao đến thấp</option>
                  <option value="rating">Đánh giá</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {productsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
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
            ) : productsError ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-red-500">Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
              </div>
            ) : sortedProducts?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                <h3 className="font-display text-xl font-bold mb-2">Không tìm thấy sản phẩm nào</h3>
                <p className="text-gray-600 mb-4">Không có sản phẩm nào phù hợp với bộ lọc của bạn.</p>
                <button 
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {sortedProducts?.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
