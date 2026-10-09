import { getProductsByCategory } from "@/lib/api";
import { toBnNum } from "@/lib/utils";
import PriceTicker from "@/components/home/PriceTicker";
import ProductListWithSort from "@/components/shared/ProductListWithSort";
import Link from "next/link";

export const instant = false;

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

const CategoryPage = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  const products = await getProductsByCategory(categoryId);

  if (!products || products.length === 0) {
    return (
      <div className="bg-bd-bg min-h-screen flex flex-col items-center justify-center p-4 pb-20">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-50 text-bd-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm border border-emerald-100">
            🔍
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            আপনি যে ক্যাটাগরিটি খুঁজছেন তাতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই অথবা লিংকটি ভুল।
          </p>
          <Link href="/">
            <button className="w-full bg-bd-primary hover:bg-bd-primary-hover text-white font-semibold py-3 rounded-xl shadow-sm transition-colors cursor-pointer">
              হোম পেজে ফিরে যান
            </button>
          </Link>
        </div>
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

        <ProductListWithSort products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;
