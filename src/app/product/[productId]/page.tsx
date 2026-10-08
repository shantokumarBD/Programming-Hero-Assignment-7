import { getProductBySlug } from "@/lib/api";
import { getUnitBn, toBnNum, calculateMarketSummary } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;


interface PageProps {
  params: Promise<{ productId: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps ) => {
  const {productId} = await params;

  const product = await getProductBySlug(productId);


  if (!product) {
    notFound(); 
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  
  const priceDiff = Math.abs(product.today - product.yesterday);
  const diffText = isUp 
    ? `গতকালের তুলনায় আজ দাম বেড়েছে - ${toBnNum(priceDiff)} টাকা`
    : isDown
    ? `গতকালের তুলনায় আজ দাম কমেছে - ${toBnNum(priceDiff)} টাকা`
    : `গতকালের তুলনায় আজ দাম অপরিবর্তিত আছে`;

  const { lowestPrice, highestPrice, averagePrice, marketsWithAvg } = calculateMarketSummary(
    product.markets,
    product.today
  );

  return (
    <div className="bg-bd-bg min-h-screen pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10">
        

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-bd-primary transition-colors">হোম</Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="hover:text-bd-primary transition-colors">
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.nameBn}</span>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-gray-100 mb-8">
          
  
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl md:text-5xl shadow-sm shrink-0">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.nameBn}
              </h1>
              <p className="text-gray-500 text-sm mb-3">
                প্রতি {getUnitBn(product.unit)} • {product.categoryNameBn}
              </p>
              <p className="text-sm font-medium text-gray-700 bg-gray-50 inline-block px-3 py-1 rounded-md">
                {diffText}
              </p>
            </div>
          </div>

          
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 min-w-[160px] text-center flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {toBnNum(product.today)}
            </h2>
            <p className="text-xs text-gray-500 mb-3">
              টাকা / {getUnitBn(product.unit)}
            </p>
            
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                isUp ? "bg-red-50 text-red-600" : isDown ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
              }`}
            >
              {isUp && "▲"}
              {isDown && "▼"}
              {isFlat && "—"}
              <span>{toBnNum(Math.abs(product.change.pct))}%</span>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        
          <h3 className="text-lg font-bold text-gray-900 mb-5">দামের সারসংক্ষেপ</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="border border-gray-100 rounded-xl p-5">
              <p className="text-xs text-gray-500 mb-2">সর্বনিম্ন দাম</p>
              <h4 className="text-xl font-bold text-green-600 mb-1">
                {toBnNum(Math.round(lowestPrice))} <span className="text-sm font-normal">টাকা</span>
              </h4>
              <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>
            
            <div className="border border-gray-100 rounded-xl p-5">
              <p className="text-xs text-gray-500 mb-2">সর্বোচ্চ দাম</p>
              <h4 className="text-xl font-bold text-red-600 mb-1">
                {toBnNum(Math.round(highestPrice))} <span className="text-sm font-normal">টাকা</span>
              </h4>
              <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="border border-gray-100 rounded-xl p-5">
              <p className="text-xs text-gray-500 mb-2">গড় দাম</p>
              <h4 className="text-xl font-bold text-green-600 mb-1">
                {toBnNum(Math.round(averagePrice))} <span className="text-sm font-normal">টাকা</span>
              </h4>
              <p className="text-xs text-gray-400">প্রতি {getUnitBn(product.unit)} এর হিসাব</p>
            </div>
          </div>

         
          <h3 className="text-lg font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h3>
          
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-4 font-medium">বাজার</th>
                  <th className="px-5 py-4 font-medium">বিভাগ</th>
                  <th className="px-5 py-4 font-medium">সর্বনিম্ন</th>
                  <th className="px-5 py-4 font-medium">সর্বোচ্চ</th>
                  <th className="px-5 py-4 font-medium text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {marketsWithAvg.map((market, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 text-gray-900 font-medium whitespace-nowrap">{market.market}</td>
                    <td className="px-5 py-4 whitespace-nowrap">{market.division}</td>
                    <td className="px-5 py-4 whitespace-nowrap">{toBnNum(market.min)} টাকা</td>
                    <td className="px-5 py-4 whitespace-nowrap">{toBnNum(market.max)} টাকা</td>
                    <td className="px-5 py-4 text-right text-gray-900 whitespace-nowrap">{toBnNum(Math.round(market.avg))} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;
