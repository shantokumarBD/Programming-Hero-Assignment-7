import { getProductsByCategory } from "@/lib/api";
import ProductCard from "@/components/shared/ProductCard";
import { toBnNum } from "@/lib/utils";
import PriceTicker from "@/components/home/PriceTicker";

export const instant = false;

interface PageProps {
  params: Promise<{ categoryId: string }>;
}


const CategoryPage = async ({ params }: PageProps) => {
 
  const {categoryId} = await params;
  const products = await getProductsByCategory(categoryId);

  if (!products || products.length === 0) {
    return (
      <div className="bg-bd-bg min-h-screen pt-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি!</h2>
      </div>
    );
  }

  const categoryName = products[0].categoryNameBn;
  const categoryIcon = products[0].categoryIcon;

  return (
    <div className="bg-bd-bg min-h-screen pb-20">
      
      <PriceTicker />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
   
        <div className="bg-white rounded-2xl p-6 md:p-8 flex items-center gap-6 shadow-sm border border-gray-100 mb-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl md:text-5xl shadow-sm">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {categoryName}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              {toBnNum(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 flex justify-end items-center shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">সাজান</span>
            <select className="border border-gray-300 text-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-bd-primary cursor-pointer bg-white">
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">দাম: কম থেকে বেশি</option>
              <option value="high-to-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>


        <div>
          <p className="text-sm text-gray-500 mb-4">
            মোট {toBnNum(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;
