import { Product } from "@/types";
import { getUnitBn, toBnNum } from "@/lib/utils";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  return (
    <Link href={`/product/${product.slug}`}>
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-bd-success transition-shadow duration-300">
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl">
          {product.image}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-base">{product.nameBn}</h3>
          <p className="text-sm text-gray-500">প্রতি {getUnitBn(product.unit)}</p>
        </div>
      </div>

      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[14px] text-gray-500 mb-1">আজকের দাম</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">{toBnNum(product.today)}</span>
            <span className="text-sm text-gray-700 font-medium">টাকা</span>
          </div>
        </div>

        
        <div
          className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp && "▲"}
          {isDown && "▼"}
          {isFlat && "—"}
           <span>{toBnNum(Math.abs(product.change.pct))}%</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
