'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  category: string;
  stock: number;
  AffiliateLink: string | null;
  createdAt: string;
  updatedAt: string;
}

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

export default function PremiumHealthMarketplace() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar'>('en');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('featured');

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
        const response = await fetch('https://storeapi-mu.vercel.app/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiProducts: ApiProduct[] = await response.json();
        
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
          affiliateLink: apiProduct.AffiliateLink 
            ? apiProduct.AffiliateLink
            : `https://www.alibaba.com/search?q=${encodeURIComponent(apiProduct.name)}`,
          clicks: 0,
          rating: Math.floor(Math.random() * 3) + 3,
          reviews: Math.floor(Math.random() * 100) + 10,
          category: ['fitness', 'supplements', 'home', 'personal', 'mental'][Math.floor(Math.random() * 5)]
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

  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="relative overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={currentLanguage === 'en' ? product.name : product.name_ar}
          width={400}
          height={300}
          className="w-full h-64 object-contain transition-transform duration-500 hover:scale-105 p-4"
        />
      </div>
      <div className="p-5">
        <h3 className="font-normal text-lg mb-2 text-gray-900 line-clamp-2 h-14">
          {currentLanguage === 'en' ? product.name : product.name_ar}
        </h3>
        
        <div className="flex items-center mb-3">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-black font-medium text-xl">${product.price.toFixed(2)}</span>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            {currentLanguage === 'en' ? 'Buy Now' : 'اشتري الآن'}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-light text-gray-900">HealthMarket</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search products...' : 'ابحث عن المنتجات...'}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              onClick={toggleLanguage}
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              {currentLanguage === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap px-3 py-1 text-sm ${selectedCategory === category.id 
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'}`}
              >
                {category.name[currentLanguage]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title and Sort */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-light text-gray-900">
            {selectedCategory === 'all' 
              ? (currentLanguage === 'en' ? 'All Products' : 'جميع المنتجات')
              : categories.find(c => c.id === selectedCategory)?.name[currentLanguage]}
          </h2>
          
          <div className="flex items-center">
            <label className="mr-2 text-sm text-gray-600">
              {currentLanguage === 'en' ? 'Sort by:' : 'ترتيب حسب:'}
            </label>
            <select 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
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

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 text-lg mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentLanguage === 'en' ? 'Try Again' : 'حاول مرة أخرى'}
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600 text-lg">
              {currentLanguage === 'en' ? 'No products found. Try a different search.' : 'لم يتم العثور على منتجات. حاول البحث باستخدام كلمات أخرى.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Trust Badges Section */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-xl font-light text-gray-900 mb-4">
              {currentLanguage === 'en' ? 'Why Shop With Us' : 'لماذا تتسوق معنا'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">
                {currentLanguage === 'en' ? 'Quality Products' : 'منتجات عالية الجودة'}
              </h4>
              <p className="text-gray-600 text-sm">
                {currentLanguage === 'en' 
                  ? 'All our products are carefully selected for their quality and effectiveness.'
                  : 'جميع منتجاتنا مختارة بعناية لجودتها وفعاليتها.'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">
                {currentLanguage === 'en' ? 'Secure Payment' : 'دفع آمن'}
              </h4>
              <p className="text-gray-600 text-sm">
                {currentLanguage === 'en' 
                  ? 'Your payment information is protected with advanced security measures.'
                  : 'معلومات الدفع الخاصة بك محمية بإجراءات أمنية متقدمة.'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">
                {currentLanguage === 'en' ? 'Fast Delivery' : 'توصيل سريع'}
              </h4>
              <p className="text-gray-600 text-sm">
                {currentLanguage === 'en' 
                  ? 'We deliver quickly so you can start benefiting from your products ASAP.'
                  : 'نقوم بالتوصيل بسرعة حتى تتمكن من الاستفادة من منتجاتك في أسرع وقت ممكن.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-4">HealthMarket</h4>
              <p className="text-gray-400 text-sm">
                {currentLanguage === 'en' 
                  ? 'Your trusted source for high-quality health and wellness products.'
                  : 'مصدرك الموثوق لمنتجات الصحة والعافية عالية الجودة.'}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">
                {currentLanguage === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">{currentLanguage === 'en' ? 'About Us' : 'من نحن'}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">{currentLanguage === 'en' ? 'Contact' : 'اتصل بنا'}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">{currentLanguage === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">{currentLanguage === 'en' ? 'Terms of Service' : 'شروط الخدمة'}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">
                {currentLanguage === 'en' ? 'Stay Connected' : 'ابق على اتصال'}
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} HealthMarket. {currentLanguage === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
