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
  AffiliateLink: string | null;
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

export default function PremiumHealthMarketplace() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar'>('en');
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
        const response = await fetch('https://storeapi-mu.vercel.app/api/products');
        
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
          affiliateLink: apiProduct.AffiliateLink 
            ? apiProduct.AffiliateLink
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
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
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
    <div className="bg-white rounded-none border border-gray-100 overflow-hidden group transition-all duration-300 hover:shadow-lg hover:bg-blue-50 hover:border-blue-300">
      <div className="relative overflow-hidden">
        <Image
          src={product.image}
          alt={currentLanguage === 'en' ? product.name : product.name_ar}
          width={400}
          height={300}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 uppercase tracking-wide rounded">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-light text-xl mb-3 text-gray-900 tracking-tight line-clamp-1">
          {currentLanguage === 'en' ? product.name : product.name_ar}
        </h3>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {currentLanguage === 'en' ? product.description : product.description_ar}
        </p>
        
        <div className="flex items-center mb-4">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-blue-700 font-semibold text-xl">${product.price.toFixed(2)}</span>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-5 py-3 text-sm uppercase tracking-wide hover:bg-green-700 transition-colors font-medium inline-flex items-center rounded"
          >
            {currentLanguage === 'en' ? 'Shop Now' : 'تسوق الآن'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-white ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Minimal Language Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={toggleLanguage}
          className="text-gray-600 hover:text-black text-sm uppercase tracking-wide border border-gray-300 px-3 py-2 bg-white/90 backdrop-blur-sm rounded"
        >
          {currentLanguage === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Hero Section - Apple Style */}
      <section className="pt-32 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light text-black mb-6 tracking-tight">
              {currentLanguage === 'en' ? 'Premium Health & Wellness' : 'الصحة والعافية المميزة'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              {currentLanguage === 'en' 
                ? 'Expertly curated products for optimal wellbeing. Scientifically reviewed and analyzed for your health needs.'
                : 'منتجات مختارة بعناية لرفاهيتك المثلى. تمت مراجعتها وتحليلها علميًا لتلبية احتياجاتك الصحية.'}
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search health products...' : 'ابحث عن المنتجات الصحية...'}
                className="w-full px-6 py-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black bg-white text-gray-900 placeholder-gray-500 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-0 top-0 bg-black text-white p-4 rounded-r">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="py-20 bg-white border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-black mb-8 tracking-tight">
                {currentLanguage === 'en' ? 'Health Intelligence Through Data' : 'الذكاء الصحي من خلال البيانات'}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {currentLanguage === 'en' 
                  ? "We combine cutting-edge data analysis with medical expertise to identify the world's most effective health products. Our algorithms analyze thousands of data points from clinical studies, user reviews, and medical research to bring you only the solutions that actually work."
                  : "نحن نجمع بين تحليل البيانات المتطورة والخبرة الطبية لتحديد أكثر المنتجات الصحية فعالية في العالم. تحلل خوارزمياتنا آلاف نقاط البيانات من الدراسات السريرية وتقييمات المستخدمين والأبحاث الطبية لتقديم الحلول التي تعمل بالفعل."}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {currentLanguage === 'en' 
                  ? "Our team of data scientists and healthcare professionals specialize in identifying patterns in disease prevalence and matching them with evidence-based solutions. From heart health to mental wellness, we've done the research so you don't have to."
                  : "يتخصص فريقنا من علماء البيانات والمهنيين الصحيين في تحديد أنماط انتشار الأمراض ومطابقتها مع الحلول القائمة على الأدلة. من صحة القلب إلى العافية العقلية، لقد قمنا بالبحث حتى لا تضطر إلى ذلك."}
              </p>
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-light text-black mb-2">10M+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">{currentLanguage === 'en' ? 'Data Points' : 'نقطة بيانات'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-black mb-2">250+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">{currentLanguage === 'en' ? 'Conditions' : 'حالة صحية'}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-light text-black mb-2">98%</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">{currentLanguage === 'en' ? 'Accuracy' : 'دقة'}</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 h-96 flex items-center justify-center">
              <div className="text-center p-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-black mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-xl font-light mb-4">{currentLanguage === 'en' ? 'Data-Driven Recommendations' : 'توصيات قائمة على البيانات'}</h3>
                <p className="text-gray-600">
                  {currentLanguage === 'en' 
                    ? 'Our algorithms analyze health trends to recommend the most effective products'
                    : 'تحلل خوارزمياتنا الاتجاهات الصحية لتوصية بأكثر المنتجات فعالية'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Analysis Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-light text-black mb-4 text-center tracking-tight">
            {currentLanguage === 'en' ? 'Scientific Approach to Wellness' : 'نهج علمي للعافية'}
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            {currentLanguage === 'en' 
              ? 'We employ advanced data analysis techniques to identify the most effective health products on the market'
              : 'نحن نستخدم تقنيات تحليل البيانات المتقدمة لتحديد أكثر المنتجات الصحية فعالية في السوق'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2
