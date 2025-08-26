'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Interface for API response
interface ApiProduct {
  id: string;
  name: string;
  description: string;
  price: string; // <-- API returns price as string
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
          price: Number(apiProduct.price), // Convert string to number
          image: apiProduct.images && apiProduct.images.length > 0 
            ? apiProduct.images[0] 
            : 'https://placehold.co/300x200',
          description: apiProduct.description || `${apiProduct.name} - ${apiProduct.category} (Stock: ${apiProduct.stock})`,
          description_ar: apiProduct.description || `${apiProduct.name} - ${apiProduct.category} (المخزون: ${apiProduct.stock})`,
          affiliateLink: apiProduct.description.startsWith("http") 
            ? apiProduct.description // لو هو لينك مباشر للمنتج
            : `https://www.alibaba.com/search?q=${encodeURIComponent(apiProduct.name)}`,
          clicks: 0 
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
          <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
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
      {/* باقي الكود تبع الصفحة زي ما هو */}
      
      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentLanguage === 'en' ? 'Ali Baba Featured Products' : 'منتجات علي بابا المميزة'}
            </h2>
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
    </div>
  );
}
