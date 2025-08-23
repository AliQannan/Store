import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function ShoeProduct() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState(41);
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { name: 'black', value: 'bg-black' },
    { name: 'brown', value: 'bg-amber-800' },
    { name: 'blue', value: 'bg-blue-900' },
    { name: 'gray', value: 'bg-gray-600' }
  ];

  const sizes = [39, 40, 41, 42, 43];

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>حذاء رجالي عصري - تسويق بالعمولة</title>
        <meta name="description" content="حذاء رياضي فاخر مصنوع من أجود أنواع الجلد الطبيعي" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* شريط التنقل */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-800">SHOE.AFFILIATE</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-600">الرئيسية</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">المنتجات</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">اتصل بنا</a>
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">تسجيل الدخول</a>
          </div>
        </div>
      </nav>

      {/* محتوى الصفحة */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* قسم الصور */}
            <div>
              {/* الصورة الرئيسية */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="حذاء رياضي راقي"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-lg transform hover:scale-105 transition duration-300"
                />
                
                {/* شارة التسويق بالعمولة */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-red-500 text-white text-sm font-bold px-3 py-1 rounded-full animate-pulse">
                  عرض خاص!
                </div>
              </div>
              
              {/* مجموعة صور مصغرة */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                  "https://images.unsplash.com/photo-1605348532760-6753d2c23329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                  "https://images.unsplash.com/photo-1605030753481-bb38b08c384a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                ].map((src, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <Image
                      src={src}
                      alt={`زاوية أخرى للحذاء ${index + 1}`}
                      width={100}
                      height={80}
                      className="w-full h-20 object-cover cursor-pointer hover:opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* معلومات المنتج */}
            <div className="py-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                حذاء رياضي فاخر - تصميم حديث ومريح
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 mr-2">(124 تقييم)</span>
              </div>
              
              <div className="mb-6">
                <span className="text-2xl text-red-600 font-bold">249 درهم</span>
                <span className="text-lg text-gray-500 line-through mr-3">329 درهم</span>
                <span className="text-green-600 font-semibold">%25 خصم</span>
              </div>
              
              <p className="text-gray-700 mb-6">
                حذاء رياضي فاخر مصنوع من أجود أنواع الجلد الطبيعي، يتميز بتصميم عصري وأنيق يناسب جميع الأوقات. 
                يحتوي على نعل داخلي مريح يدعم القدم ويوفر أقصى درجات الراحة خلال اليوم.
              </p>
              
              {/* ألوان متاحة */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">الألوان المتاحة:</h3>
                <div className="flex space-x-3">
                  {colors.map(color => (
                    <div
                      key={color.name}
                      className={`w-10 h-10 rounded-full ${color.value} border-2 ${selectedColor === color.name ? 'border-black scale-110' : 'border-gray-300'} cursor-pointer transition-all duration-300`}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  ))}
                </div>
              </div>
              
              {/* المقاسات */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">المقاسات:</h3>
                <div className="grid grid-cols-5 gap-2">
                  {sizes.map(size => (
                    <div
                      key={size}
                      className={`border text-center py-2 rounded cursor-pointer transition-colors ${selectedSize === size ? 'border-blue-500 bg-blue-50 font-bold' : 'border-gray-300 hover:border-blue-500'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* الكمية */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">الكمية:</h3>
                <div className="flex items-center">
                  <button 
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l"
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-4 py-1">{quantity}</span>
                  <button 
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* الخصائص */}
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>مادة الصنع: جلد طبيعي 100%</li>
                <li>النعل: مطاط عالي الجودة مضاد للانزلاق</li>
                <li>مقاوم للماء: نعم</li>
                <li>ضمان: سنتان ضد عيوب الصناعة</li>
              </ul>
              
              {/* أزرار الشراء */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href="#"
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  أضف إلى السلة
                </a>
                <a
                  href="https://example-affiliate-link.com"
                  className="border border-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg text-center hover:bg-gray-100 transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  شراء مباشر
                </a>
              </div>
              
              {/* معلومات الشحن والتوصيل */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center text-green-600 mb-2">
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>شحن مجاني للطلبات فوق 300 درهم</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>إرجاع مجاني خلال 30 يوم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* قسم التقييمات */}
        <div className="bg-white rounded-xl shadow-lg mt-8 p-6">
          <h2 className="text-2xl font-bold mb-6">تقييمات العملاء</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "محمد أحمد", rating: 5, comment: "الحذاء مريح جداً وأنيق. الجودة ممتازة وتناسب جميع المناسبات. الشحن كان سريعاً والتغليف جيد." },
              { name: "سارة عبدالله", rating: 5, comment: "اشتريت الحذاء كهدية لزوجي وهو معجب جداً به. المقاس مضبوط واللون كما في الصور." }
            ].map((review, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 mr-2">{review.name}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* منتجات مقترحة */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">منتجات قد تعجبك</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "حذاء رياضي خفيف", price: "199", oldPrice: "259", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" },
              { name: "حذاء رسمي كلاسيكي", price: "279", oldPrice: "349", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80" },
              { name: "حذاء كاجوال مريح", price: "229", oldPrice: "299", image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1179&q=80" },
              { name: "حذاء جلد طبيعي فاخر", price: "329", oldPrice: "399", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-red-600 font-bold">{product.price} درهم</span>
                    <span className="text-gray-500 text-sm line-through mr-2">{product.oldPrice} درهم</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* فوتر */}
      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Shoe Affiliate</h3>
              <p className="text-gray-400">متجرك المفضل لأحذية عالية الجودة بأسعار منافسة مع خيارات دفع متعددة وتوصيل سريع.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">منتجات جديدة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">عروض خاصة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">المقاسات</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">الدعم الفني</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  دبي، الإمارات العربية المتحدة
                </li>
                <li className="text-gray-400">
                  <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +971 50 123 4567
                </li>
                <li className="text-gray-400">
                  <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@shoe-affiliate.ae
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">اشترك في النشرة البريدية</h3>
              <p className="text-gray-400 mb-4">اشترك لتحصل على آخر العروض والتخفيضات</p>
              <div className="flex">
                <input type="email" placeholder="بريدك الإلكتروني" className="bg-gray-800 text-white px-4 py-2 rounded-l w-full" />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">اشترك</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
            <p>© 2023 Shoe Affiliate. جميع الحقوق محفوظة</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
