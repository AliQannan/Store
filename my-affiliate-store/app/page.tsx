"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function HealthAffiliatePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('Sports Shoes');

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, []);

  const filters = ['Sports Shoes', 'Medicines', 'Sports Glasses', 'Other Products'];

  const products = [
    {
      id: 1,
      name: 'Pro Runner X1',
      description: 'Advanced cushioning technology for maximum comfort',
      price: '$129.99',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/70c2da0b-36c7-4cb9-ab37-88b8be64917b.png',
      alt: 'Premium running shoes with advanced cushioning technology and breathable mesh design',
      category: 'Sports Shoes'
    },
    {
      id: 2,
      name: 'VitaMax Complete',
      description: 'Comprehensive multivitamin for daily wellness',
      price: '$49.99',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/80b505c1-677f-44c0-a63a-885f4600797c.png',
      alt: 'Multivitamin supplement bottles with modern packaging and health benefits highlighted',
      category: 'Medicines'
    },
    {
      id: 3,
      name: 'SolarShield Pro',
      description: 'Polarized sports glasses with UV protection',
      price: '$89.99',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2c1a3e53-4118-47dd-904e-40d63adc55cd.png',
      alt: 'Sports performance sunglasses with polarized lenses and durable frame design',
      category: 'Sports Glasses'
    },
    {
      id: 4,
      name: 'FitTrack Elite',
      description: 'Smart health monitor with 24/7 tracking',
      price: '$199.99',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9e30db6b-9e4e-45f1-a3bc-a7fa6388b479.png',
      alt: 'Advanced fitness tracker with heart rate monitoring and activity tracking features',
      category: 'Other Products'
    }
  ];

  const reviews = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Cardiologist, Mayo Clinic',
      review: '"The medical equipment from HealthPro has transformed our patient care. Exceptional quality and reliability."',
      icon: 'user-md'
    },
    {
      name: 'Michael Johnson',
      role: 'Olympic Athlete',
      review: '"The sports gear is top-notch. Been using their products for competitions and training - never disappoints."',
      icon: 'dumbbell'
    },
    {
      name: 'Prof. James Wilson',
      role: 'Optometrist',
      review: '"Their sports glasses provide superior protection and clarity. Recommended them to all my athletic patients."',
      icon: 'eye'
    }
  ];

  const sliderImages = [
    'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7930c31d-39a9-45f8-bca5-f6c1b02b2d48.png',
    'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/322a95eb-f813-496f-860f-1ccd6b65942e.png',
    'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d0774097-7e3b-45f3-98c7-8ed1e47f2062.png',
    'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0e0e6826-c7c8-4279-9bee-acaf26717faf.png'
  ];

  const sliderAlts = [
    'Professional medical equipment and health products displayed in a modern clinic setting with blue lighting',
    'Various sports shoes and athletic gear arranged creatively on a workout studio floor',
    'Sports glasses and protective eyewear displayed on a clean white background with professional lighting',
    'Pharmaceutical products and supplements organized in a modern pharmacy setting'
  ];

  return (
    <div className="bg-gray-50">
      <Head>
        <title>HealthPro Affiliates - Premium Health & Wellness Products</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation Section */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">
                <i className="fas fa-heartbeat mr-2"></i>HealthPro
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#products" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Products</a>
                <a href="#reviews" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Reviews</a>
                <a href="#about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">About Us</a>
                <a href="#support" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Support</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                <i className="fas fa-user-plus mr-2"></i>Join Now
              </button>
              <button className="md:hidden">
                <i className="fas fa-bars text-gray-700 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animated Product Slider */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Health Journey</h1>
            <p className="text-xl opacity-90 mb-8">Premium health products trusted by professionals worldwide</p>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Explore Products <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>

          {/* Animated Product Slider */}
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {sliderImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={image}
                    alt={sliderAlts[index]}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Buttons Section */}
      <section className="py-16 bg-white" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Browse Our Health Categories</h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-105'
                    : filter === 'Sports Shoes'
                    ? 'bg-indigo-100 text-indigo-600'
                    : filter === 'Medicines'
                    ? 'bg-blue-100 text-blue-600'
                    : filter === 'Sports Glasses'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-purple-100 text-purple-600'
                }`}
              >
                <i className={`fas fa-${
                  filter === 'Sports Shoes' ? 'running' :
                  filter === 'Medicines' ? 'pills' :
                  filter === 'Sports Glasses' ? 'glasses' : 'plus-circle'
                } mr-2`}></i>
                {filter}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="mb-4">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">{product.price}</span>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Trusted by Professionals Worldwide</h2>
          <p className="text-center text-gray-600 mb-12">See what medical experts and athletes say about our products</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${
                    index === 0 ? 'bg-indigo-100' :
                    index === 1 ? 'bg-blue-100' : 'bg-green-100'
                  } rounded-full flex items-center justify-center`}>
                    <i className={`fas fa-${review.icon} ${
                      index === 0 ? 'text-indigo-600' :
                      index === 1 ? 'text-blue-600' : 'text-green-600'
                    } text-xl`}></i>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review.review}</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <a href="#" className="text-indigo-600 text-sm hover:underline mt-2 inline-block">Read full review →</a>
              </div>
            ))}
          </div>

          {/* Global References */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Featured In</h3>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e2983584-57c2-45e7-bf1f-57352bd1ab89.png',
                'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3f6cf446-4f54-4b69-b7ed-2ef17e54544b.png',
                'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fc704609-2900-49a2-94a1-c7f9b782522c.png',
                'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/820cf670-0f53-41d4-9fe7-3c292cdd55fb.png'
              ].map((logo, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <img
                    src={logo}
                    alt={`Featured organization ${index + 1}`}
                    className="h-12 mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About HealthPro</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2010, HealthPro has been at the forefront of providing premium health and wellness products
                to millions of customers worldwide. Our mission is to make quality healthcare accessible to everyone.
              </p>
              <p className="text-gray-600 mb-8">
                We partner with leading medical institutions, sports organizations, and health experts to ensure
                our products meet the highest standards of quality and effectiveness.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">10M+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
                  <div className="text-gray-600">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">500+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f7f18d80-cfc0-47b5-b22f-e7adc113272b.png"
                alt="Modern healthcare facility with professional staff and advanced medical equipment"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Support Section */}
      <section className="py-20 bg-indigo-50" id="support">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Technical Support</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone-alt text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Phone Support</h3>
              <p className="text-gray-600 mb-4">24/7 dedicated support line for immediate assistance</p>
              <div className="text-indigo-600 font-semibold">+1 (800) HEALTH-PRO</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed responses within 2 hours</p>
              <div className="text-indigo-600 font-semibold">support@healthpro.com</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-comments text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Live Chat</h3>
              <p className="text-gray-600 mb-4">Instant messaging with our support team</p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Start Chat
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h3>
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">How do I become an affiliate?</h4>
                <p className="text-gray-600">Sign up through our affiliate portal, complete the verification process, and start promoting our products with your unique referral links.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">What commission rates do you offer?</h4>
                <p className="text-gray-600">We offer competitive commission rates ranging from 15% to 30% depending on the product category and sales volume.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">How often are affiliate payments made?</h4>
                <p className="text-gray-600">Payments are processed monthly via PayPal, bank transfer, or other preferred methods for all commissions above the minimum threshold.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">HealthPro</div>
              <p className="text-gray-400">Your trusted partner in health and wellness products.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Affiliate Program</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Product Catalog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Affiliate Agreement</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <p className="text-gray-400">Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 HealthPro Affiliates. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

