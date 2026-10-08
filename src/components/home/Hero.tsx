import Link from "next/link";
import CurrentDate from "../shared/CurrentDate";
import hero_banner_image from "../../assets/bazar-hero 1.png" 
import Image from "next/image";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm border border-gray-100">
        
        
        <div className="flex-1 space-y-6">
          
          <div className="inline-block bg-bd-success/20 text-bd-success font-medium px-5 py-2 rounded-full text-sm ">
            <CurrentDate />
          </div>
          
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h1>
          
          
          <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          
         
          <div className="pt-2">
            <Link href="#products">
              <button className="bg-bd-primary hover:bg-bd-primary-hover text-white font-semibold px-8 py-3.5 rounded-lg shadow-md shadow-bd-primary/30 transition-colors cursor-pointer">
                সব পণ্য দেখুন
              </button>
            </Link>
          </div>
        </div>

      
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            
            <Image 
              src={hero_banner_image} 
              alt="Bazar Hero" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
