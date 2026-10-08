import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-bd-bg min-h-screen flex flex-col items-center justify-center p-4 pb-20">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center max-w-md w-full">
        
 
        <div className="w-24 h-24 bg-gray-50 text-gray-400 rounded-full flex flex-col items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
          <span className="text-3xl font-bold">404</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          পেজটি পাওয়া যায়নি!
        </h2>
        
        <p className="text-gray-500 text-sm mb-8">
          আপনি যে পেজটি খুঁজছেন তা হয়তো ডিলিট হয়ে গেছে অথবা লিংকটি ভুল। অনুগ্রহ করে সঠিক লিংকটি চেক করুন।
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/">
            <button className="w-full bg-bd-primary hover:bg-bd-primary-hover text-white font-semibold py-3 rounded-lg shadow-sm transition-colors cursor-pointer">
              হোমপেজে ফিরে যান
            </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
