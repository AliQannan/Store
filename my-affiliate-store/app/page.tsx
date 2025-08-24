import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState("Brown");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const colorOptions = [
    { name: "Brown", value: "brown", class: "bg-amber-900" },
    { name: "Black", value: "black", class: "bg-gray-900" },
    { name: "Blue", value: "blue", class: "bg-blue-700" },
  ];

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Alibaba-style header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-8 w-auto text-red-600" viewBox="0 0 100 30" fill="currentColor">
              <path d="M50 15.2h8.9v-2.8H50v2.8zm0-6.7h8.9V5.7H50v2.8zm-10.6 6.7h8.9v-2.8h-8.9v2.8zm0-6.7h8.9V5.7h-8.9v2.8zm-10.6 6.7h8.9v-2.8h-8.9v2.8zm0-6.7h8.9V5.7h-8.9v2.8zm31.8 13.4H70v-2.8h-9.4v2.8zm-10.6 0h9.4v-2.8h-9.4v2.8zm-10.6 0h9.4v-2.8h-9.4v2.8zm-10.6 0h9.4v-2.8h-9.4v2.8z"/>
            </svg>
            <nav className="hidden md:flex ml-8 space-x-6">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600">Products</a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600">Suppliers</a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600">Categories</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-sm font-medium text-gray-700 hover:text-red-600">Sign In</button>
            <button className="hidden md:block text-sm font-medium text-gray-700 hover:text-red-600">Join Free</button>
            <button className="text-gray-600 hover:text-red-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-6xl mx-auto bg-white rounded-sm shadow-sm mt-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-6">
          {/* Left: Product Image */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center border border-gray-200 p-4">
              <Image
                src="https://s.alicdn.com/@sc04/kf/H637844392f9540a19f3c1c495918a596P.jpg?avif=close&webp=close"
                alt="Trendy Recyclable Leather Backpack"
                width={500}
                height={500}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex-shrink-0 border border-gray-200 p-1 cursor-pointer">
                  <Image
                    src="https://s.alicdn.com/@sc04/kf/H637844392f9540a19f3c1c495918a596P.jpg?avif=close&webp=close"
                    alt={`Thumbnail ${num}`}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              2025 Best-selling Trendy Recyclable Leather Backpack
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-red-600">$29.99</span>
                <span className="ml-2 text-lg text-gray-500 line-through">$39.99</span>
                <span className="ml-2 text-sm font-medium bg-red-100 text-red-800 px-2 py-1 rounded">25% OFF</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Minimum Order: 2 pieces</p>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color: {selectedColor}</h3>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`w-8 h-8 rounded-full border-2 ${color.class} ${
                      selectedColor === color.name ? "ring-2 ring-offset-2 ring-blue-500" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
                  onClick={decreaseQuantity}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center"
                />
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
                  onClick={increaseQuantity}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <span className="ml-2 text-sm text-gray-500">(1000 pieces available)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="#"
                className="flex-1 bg-red-600 text-white font-medium px-6 py-3 rounded-sm text-center hover:bg-red-700 transition flex items-center justify-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </a>
              <a
                href="https://offer.alibaba.com/cps/bn67ksob?bm=cps&src=saf&productId=1601524414012"
                className="flex-1 border border-red-600 text-red-600 font-medium px-6 py-3 rounded-sm text-center hover:bg-red-50 transition"
              >
                Buy Now
              </a>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex">
                  <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free shipping for orders over $100</span>
                </li>
                <li className="flex">
                  <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>7-day return policy</span>
                </li>
                <li className="flex">
                  <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure payment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product details tabs */}
        <div className="mt-8 border-t border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "description"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "specifications"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("specifications")}
            >
              Specifications
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "reviews"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews (128)
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "shipping"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-700 mb-4">
                  High-quality recyclable leather backpack, trendy design, perfect for daily use and eco-friendly lifestyle. Durable, spacious, and stylish for students or professionals.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Material: Recyclable Leather</li>
                  <li>Dimensions: 30x15x40 cm</li>
                  <li>Color: Brown / Black / Blue</li>
                  <li>Weight: 0.8 kg</li>
                  <li>Compartments: 1 main compartment, 2 side pockets, 1 front pocket</li>
                  <li>Closure: Zipper</li>
                  <li>Style: Casual, Fashion</li>
                </ul>
              </div>
            )}
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex">
                  <span className="text-gray-600 w-32 flex-shrink-0">Brand Name</span>
                  <span className="text-gray-900">EcoTrend</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32 flex-shrink-0">Material</span>
                  <span className="text-gray-900">Recyclable Leather</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32 flex-shrink-0">Style</span>
                  <span className="text-gray-900">Casual</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32 flex-shrink-0">Dimensions</span>
                  <span className="text-gray-900">30x15x40 cm</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32 flex-shrink-0">Weight</span>
                  <span className="text-gray-900">0.8 kg</span>
                </div>
                <div className="flex">
                  <span className="text-gray-600 w-32 flex-shrink-0">Closure Type</span>
                  <span className="text-gray-900">Zipper</span>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="text-3xl font-bold text-gray-900">4.8</div>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">128 reviews</div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center mb-1">
                        <span className="text-sm text-gray-600 w-8">{rating} star</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: `${(rating / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{(rating / 5) * 100}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3"></div>
                    <div>
                      <div className="font-medium">John D.</div>
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 mt-1">Excellent quality and fast shipping. The backpack is very durable and stylish.</p>
                      <span className="text-sm text-gray-500">October 15, 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "shipping" && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Shipping</h3>
                <p className="text-gray-700 mb-4">
                  We ship worldwide. Shipping costs vary by location and order weight. Orders are typically processed within 1-2 business days and delivered within 7-15 business days depending on the destination.
                </p>
                <h3 className="font-medium text-gray-900 mb-2">Returns</h3>
                <p className="text-gray-700">
                  We offer a 30-day return policy. Items must be unused and in their original packaging. Return shipping is the responsibility of the buyer unless the item is defective or incorrect.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="max-w-6xl mx-auto mt-8 mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border border-gray-200 rounded-sm p-3 hover:shadow-md transition">
              <Image
                src="https://s.alicdn.com/@sc04/kf/H637844392f9540a19f3c1c495918a596P.jpg?avif=close&webp=close"
                alt="Related product"
                width={200}
                height={200}
                className="object-contain w-full h-40"
              />
              <div className="mt-2">
                <h3 className="text-sm text-gray-700 line-clamp-2">Trendy Recyclable Leather Backpack</h3>
                <div className="flex items-center mt-1">
                  <span className="text-red-600 font-medium">$29.99</span>
                  <span className="ml-2 text-gray-500 text-sm line-through">$39.99</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600 ml-1">(128)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">About AliExpress</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Payment & Shipping</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Payment Methods</a></li>
              <li><a href="#" className="hover:text-white">Shipping Guide</a></li>
              <li><a href="#" className="hover:text-white">Track Your Order</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2023 AliExpress. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
