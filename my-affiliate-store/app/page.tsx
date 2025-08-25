'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Interface for API response
interface ApiProduct {
  id: number;
  name: string;
  price: number;
  images: string[]; // Array of image URLs
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

// Transformed product interface for frontend
interface Product {
  id: number;
  name: string;
  name_ar: string;
  price: number;
  image: string;
  description: string;
  description_ar: string;
  affiliateLink: string;
  clicks: number;
}

export default function AliBabaAffiliatePage() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar'>('en');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://13.53.206.88:5000/api/products');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiProducts: ApiProduct[] = await response.json();
        
        // Transform API products to match our frontend interface
        const transformedProducts: Product[] = apiProducts.map(apiProduct => ({
          id: apiProduct.id,
          name: apiProduct.name,
          name_ar: apiProduct.name, // Using same name for both languages
          price: apiProduct.price,
          image: apiProduct.images && apiProduct.images.length > 0 
            ? apiProduct.images[0] 
            : 'https://placehold.co/300x200',
          description: `${apiProduct.name} - ${apiProduct.category} (Stock: ${apiProduct.stock})`,
          description_ar: `${apiProduct.name} - ${apiProduct.category} (المخزون: ${apiProduct.stock})`,
          affiliateLink: `https://www.alibaba.com/search?q=${encodeURIComponent(apiProduct.name)}`,
          clicks: 0 // Initialize with 0 clicks
        }));
        
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'ar' : 'en');
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <Image
        src={product.image}
        alt={currentLanguage === 'en' ? product.name : product.name_ar}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {currentLanguage === 'en' ? product.name : product.name_ar}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {currentLanguage === 'en' ? product.description : product.description_ar}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">${product.price}</span>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            {currentLanguage === 'en' ? 'View on Ali Baba' : 'عرض على علي بابا'}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleLanguage}
          className="bg-primary text-white px-4 py-2 rounded-full shadow-md transition-all hover:bg-indigo-700"
        >
          {currentLanguage === 'en' ? 'العربية' : 'English'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/89ce0e46-d0b9-49e9-b41b-7e86924737b4.png"
                alt="HealthBeauty Pro logo with green leaf and shopping cart icon"
                width={40}
                height={40}
                className="h-8 w-8 mr-2"
              />
              <span className="text-xl font-bold text-primary">
                {currentLanguage === 'en' ? 'HealthBeauty Pro' : 'صحة وجمال برو'}
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-primary transition">
                {currentLanguage === 'en' ? 'Home' : 'الرئيسية'}
              </a>
              <a href="#products" className="text-gray-700 hover:text-primary transition">
                {currentLanguage === 'en' ? 'Products' : 'المنتجات'}
              </a>
              <a href="#dashboard" className="text-gray-700 hover:text-primary transition">
                {currentLanguage === 'en' ? 'Dashboard' : 'لوحة التحكم'}
              </a>
              <a href="#about" className="text-gray-700 hover:text-primary transition">
                {currentLanguage === 'en' ? 'About' : 'عنّا'}
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {currentLanguage === 'en' ? 'Sign In' : 'تسجيل الدخول'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {currentLanguage === 'en' 
                  ? 'Discover Premium Health & Beauty Products on Ali Baba' 
                  : 'اكتشف منتجات الصحة والجمال المميزة على علي بابا'
                }
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                {currentLanguage === 'en'
                  ? 'Earn commissions by promoting top-quality health and beauty products from Ali Baba global marketplace'
                  : 'اربح عمولات عن طريق الترويج لمنتجات الصحة والجمال عالية الجودة من السوق العالمية علي بابا'
                }
              </p>
              
              <div className="flex space-x-4">
                <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
                  {currentLanguage === 'en' ? 'Start Earning' : 'ابدأ الربح'}
                </button>
                <button className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition">
                  {currentLanguage === 'en' ? 'Learn More' : 'اعرف المزيد'}
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <Image
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d35507a1-b3e3-4afe-9f26-59ce0d38f0c0.png"
                alt="Modern health and beauty products from Ali Baba featuring skincare, supplements, and wellness items"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentLanguage === 'en' ? 'Ali Baba Featured Products' : 'منتجات علي بابا المميزة'}
            </h2>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentLanguage === 'en'
                ? 'Discover our curated selection of health and beauty products from verified Ali Baba suppliers'
                : 'اكتشف مجموعتنا المختارة من منتجات الصحة والجمال من الموردين الموثوقين على علي بابا'
              }
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {currentLanguage === 'en' ? 'No products available' : 'لا توجد منتجات متاحة'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* API Integration Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentLanguage === 'en' ? 'Ali Baba API Integration' : 'تكامل واجهة برمجة تطبيقات علي بابا'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentLanguage === 'en'
                ? 'Seamless integration with Ali Baba API for real-time product data and affiliate tracking'
                : 'تكامل سلس مع واجهة برمجة تطبيقات علي بابا لبيانات المنتج في الوقت الفعلي وتتبع العمولات'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {currentLanguage === 'en' ? 'Real-time Data' : 'بيانات فورية'}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === 'en'
                  ? 'Get live product information and pricing from Ali Baba'
                  : 'احصل على معلومات المنتج والأسعار المباشرة من علي بابا'
                }
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {currentLanguage === 'en' ? 'Commission Tracking' : 'تتبع العمولات'}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === 'en'
                  ? 'Track your affiliate commissions in real-time'
                  : 'تتبع عمولات التسويق بالعمولة في الوقت الفعلي'
                }
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {currentLanguage === 'en' ? 'Auto Sync' : 'مزامنة تلقائية'}
              </h3>
              <p className="text-gray-600">
                {currentLanguage === 'en'
                  ? 'Automatically sync product inventory and updates'
                  : 'مزامنة مخزون المنتجات والتحديثات تلقائيًا'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {currentLanguage === 'en' ? 'Sign In' : 'تسجيل الدخول'}
              </h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === 'en' ? 'Email' : 'البريد الإلكتروني'}
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder={currentLanguage === 'en' ? 'your@email.com' : 'بريدك@الإلكتروني.com'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLanguage === 'en' ? 'Password' : 'كلمة المرور'}
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {currentLanguage === 'en' ? 'Sign In' : 'تسجيل الدخول'}
              </button>
            </form>
            
            <p className="text-center mt-4 text-sm text-gray-600">
              {currentLanguage === 'en' ? "Don't have an account? " : "ليس لديك حساب؟ "}
              <a href="#" className="text-primary hover:underline">
                {currentLanguage === 'en' ? 'Sign up' : 'اشترك الآن'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
