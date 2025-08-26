'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Interface for API response
interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

// Transformed product interface for frontend
interface Product {
  id: string;
  name: string;
  name_ar: string;
  price: number;
  image: string;
  description: string;
  description_ar: string;
  affiliateLink: string;
  clicks: number;
  rating: number;
  reviews: number;
  category: string;
}

export default function AliBabaAffiliatePage() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar'>('en');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');

  // Health & Wellness categories
  const categories = [
    { id: 'all', name: { en: 'All Products', ar: 'جميع المنتجات' } },
    { id: 'fitness', name: { en: 'Fitness Equipment', ar: 'معدات اللياقة' } },
    { id: 'supplements', name: { en: 'Supplements', ar: 'المكملات' } },
    { id: 'home', name: { en: 'Home Wellness', ar: 'العناية المنزلية' } },
    { id: 'personal', name: { en: 'Personal Care', ar: 'العناية الشخصية' } },
    { id: 'mental', name: { en: 'Mental Wellness', ar: 'العناية العقلية' } },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://storeapi-flame.vercel.app/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiProducts: ApiProduct[] = await response.json();
        
        // Transform API products to match our frontend interface
        const transformedProducts: Product[] = apiProducts.map(apiProduct => ({
          id: apiProduct.id,
          name: apiProduct.name.trim(),
          name_ar: apiProduct.name.trim(), 
          price: Number(apiProduct.price),
          image: apiProduct.images && apiProduct.images.length > 0 
            ? apiProduct.images[0] 
            : 'https://placehold.co/300x200',
          description: apiProduct.description || `${apiProduct.name} - ${apiProduct.category} (Stock: ${apiProduct.stock})`,
          description_ar: apiProduct.description || `${apiProduct.name} - ${apiProduct.category} (المخزون: ${apiProduct.stock})`,
          affiliateLink: apiProduct.description.startsWith("http") 
            ? apiProduct.description
            : `https://www.alibaba.com/search?q=${encodeURIComponent(apiProduct.name)}`,
          clicks: 0,
          rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
          reviews: Math.floor(Math.random() * 100) + 10, // Random reviews between 10-110
          category: ['fitness', 'supplements', 'home', 'personal', 'mental'][Math.floor(Math.random() * 5)] // Random category
        }));
        
        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch(sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (featured)
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortOption, products]);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'ar' : 'en');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="product-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative">
        <Image
          src={product.image}
          alt={currentLanguage === 'en' ? product.name : product.name_ar}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-1">
          {currentLanguage === 'en' ? product.name : product.name_ar}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {currentLanguage === 'en' ? product.description : product.description_ar}
        </p>
        
        <div className="flex items-center mb-3">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-green-700 font-bold text-xl">${product.price.toFixed(2)}</span>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
          >
            {currentLanguage === 'en' ? 'Buy Now' : 'اشتري الآن'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-green-600 text-white p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                {currentLanguage === 'en' ? 'Wellness Marketplace' : 'سوق العافية'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleLanguage}
                className="text-gray-600 hover:text-green-600 flex items-center"
              >
                {currentLanguage === 'en' ? 'العربية' : 'English'}
              </button>
              
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                {currentLanguage === 'en' ? 'Sign In' : 'تسجيل الدخول'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {currentLanguage === 'en' ? 'Premium Health & Wellness Products' : 'منتجات الصحة والعافية المميزة'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {currentLanguage === 'en' 
                ? 'Discover the best products for your wellbeing journey with trusted quality and affordable prices'
                : 'اكتشف أفضل المنتجات لرحلتك towards العافية بجودة موثوقة وأسعار معقولة'}
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search for health products...' : 'ابحث عن منتجات صحية...'}
                className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-2 top-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.id 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category.name[currentLanguage]}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              {currentLanguage === 'en' 
                ? `Showing ${filteredProducts.length} products` 
                : `عرض ${filteredProducts.length} منتجات`}
            </p>
            
            <div className="flex items-center">
              <label className="mr-2 text-gray-600">
                {currentLanguage === 'en' ? 'Sort by:' : 'ترتيب حسب:'}
              </label>
              <select 
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">{currentLanguage === 'en' ? 'Featured' : 'مميز'}</option>
                <option value="price-low">{currentLanguage === 'en' ? 'Price: Low to High' : 'السعر: من الأقل للأعلى'}</option>
                <option value="price-high">{currentLanguage === 'en' ? 'Price: High to Low' : 'السعر: من الأعلى للأقل'}</option>
                <option value="rating">{currentLanguage === 'en' ? 'Top Rated' : 'الأعلى تقييماً'}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {currentLanguage === 'en' ? 'Try Again' : 'حاول مرة أخرى'}
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-500 text-lg">
                {currentLanguage === 'en' ? 'No products found. Try a different search.' : 'لم يتم العثور على منتجات. حاول البحث باستخدام كلمات أخرى.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            {currentLanguage === 'en' ? 'What Our Customers Say' : 'ماذا يقول عملاؤنا'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {renderStars(5)}
                </div>
                <p className="text-gray-700 mb-4">
                  {currentLanguage === 'en' 
                    ? "I've been using their fitness equipment for months now and the quality is exceptional. Highly recommend for anyone looking to upgrade their home gym!"
                    : "أستخدم معدات اللياقة البدنية الخاصة بهم منذ شهور الآن والجودة استثنائية. أوصي بشدة لأي شخص يتطلع إلى ترقية صالة الألعاب الرياضية في المنزل!"}
                </p>
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-800 rounded-full h-10 w-10 flex items-center justify-center font-bold mr-3">
                    {currentLanguage === 'en' ? 'JD' : 'م ح'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {currentLanguage === 'en' ? 'John Doe' : 'محمد حسين'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {currentLanguage === 'en' ? 'Verified Customer' : 'عميل موثوق'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {currentLanguage === 'en' ? 'Wellness Marketplace' : 'سوق العافية'}
              </h3>
              <p className="text-gray-400">
                {currentLanguage === 'en' 
                  ? 'Your trusted source for quality health and wellness products at affordable prices.'
                  : 'مصدرك الموثوق لمنتجات الصحة والعافية عالية الجودة بأسعار معقولة.'}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">
                {currentLanguage === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{currentLanguage === 'en' ? 'About Us' : 'من نحن'}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{currentLanguage === 'en' ? 'Contact' : 'اتصل بنا'}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{currentLanguage === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{currentLanguage === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">
                {currentLanguage === 'en' ? 'Categories' : 'الفئات'}
              </h4>
              <ul className="space-y-2">
                {categories.slice(1).map(category => (
                  <li key={category.id}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {category.name[currentLanguage]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">
                {currentLanguage === 'en' ? 'Newsletter' : 'النشرة الإخبارية'}
              </h4>
              <p className="text-gray-400 mb-4">
                {currentLanguage === 'en' 
                  ? 'Subscribe to get special offers and wellness tips'
                  : 'اشترك للحصول على عروض خاصة ونصائح للعافية'}
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={currentLanguage === 'en' ? 'Your email' : 'بريدك الإلكتروني'} 
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition-colors">
                  {currentLanguage === 'en' ? 'Subscribe' : 'اشتراك'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 {currentLanguage === 'en' ? 'Wellness Marketplace. All rights reserved.' : 'سوق العافية. جميع الحقوق محفوظة.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
