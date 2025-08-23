import Image from "next/image";

export default function Home() {
  return (
	   <div className="min-h-screen bg-gray-100 p-6 sm:p-12 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">

      <Image
      src="https://drive.google.com/file/d/1JRqYc8jitdkTytgeC-oIVdbv3I68WtYn/view"
      alt="logo"
      width={200}
      height={200}
      className="rounded-lg"
      />
        {/* Left: Product Image */}
        <div className="flex items-center justify-center p-6">
	<a href="#">
          <Image
            src="
https://offer.alibaba.com/cps/bn67ksob?bm=cps&src=saf&productId=1601557435333" // ضع هنا رابط الصورة الفعلي
            alt="Trendy Recyclable Leather Backpack"
            width={500}
            height={500}
            className="rounded-lg"
          /></a>
        </div>

        {/* Right: Product Info */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              2025 Best-selling Trendy Recyclable Leather Backpack
            </h1>
            <p className="text-xl text-red-600 font-semibold mb-4">
              $29.99
            </p>
            <p className="text-gray-700 mb-6">
              High-quality recyclable leather backpack, trendy design, perfect for daily use and eco-friendly lifestyle. Durable, spacious, and stylish for students or professionals.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Material: Recyclable Leather</li>
              <li>Dimensions: 30x15x40 cm</li>
              <li>Color: Brown / Black / Blue</li>
              <li>Weight: 0.8 kg</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition"
            >
              Add to Cart
            </a>
            <a
              href="https://offer.alibaba.com/cps/bn67ksob?bm=cps&src=saf&productId=1601524414012"
              className="border border-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg text-center hover:bg-gray-100 transition"
            >
              Buy Now
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
