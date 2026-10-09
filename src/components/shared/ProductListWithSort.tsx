"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/types";
import { toBnNum } from "@/lib/utils";

interface Props {
  products: Product[];
  title?: string;
  showCount?: boolean;
}

export default function ProductListWithSort({ products, title, showCount = true }: Props) {
  const [sortBy, setSortBy] = useState<string>("default");

  const sortedProducts = useMemo(() => {
    if (sortBy === "low-to-high") {
      return [...products].sort((a, b) => a.today - b.today);
    }
    if (sortBy === "high-to-low") {
      return [...products].sort((a, b) => b.today - a.today);
    }
    return products;
  }, [products, sortBy]);

  return (
    <div>

      <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border border-gray-100 mb-6">
        {title ? (
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm font-medium">সাজান</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 text-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-bd-primary cursor-pointer bg-white"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

  
      {showCount && (
        <p className="text-sm text-gray-500 mb-4">
          মোট {toBnNum(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
