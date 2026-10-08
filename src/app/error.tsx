"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-bd-bg min-h-screen flex flex-col items-center justify-center p-4 pb-20">
      <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center max-w-md w-full">

        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ⚠️
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          দুঃখিত, কোনো একটি সমস্যা হয়েছে!
        </h2>
        
        <p className="text-gray-500 text-sm mb-8">
          সার্ভারে ডেটা লোড করতে সমস্যা হচ্ছে অথবা কোনো অনাকাঙ্ক্ষিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>

    
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-bd-primary hover:bg-bd-primary-hover text-white font-semibold py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            আবার চেষ্টা করুন
          </button>
          
          <Link href="/">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors cursor-pointer">
              হোমপেজে ফিরে যান
            </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
