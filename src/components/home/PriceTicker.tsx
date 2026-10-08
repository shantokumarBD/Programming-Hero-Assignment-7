import Marquee from "react-fast-marquee";
import { getAllProducts } from "@/lib/api";
import { Product } from "@/types";
import { getUnitBn, toBnNum } from "@/lib/utils";




const PriceTicker = async () => {
  const products = await getAllProducts();

  if (!products || products.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-200">
      <Marquee
        speed={150}
        pauseOnHover={true}
        gradient={false}
        className="py-2.5"
      >
        {products
          .filter((product: Product) => product.change.dir !== "flat")
          .map((product: Product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";
          const isFlat = product.change.dir === "flat";

          return (
            <div
              key={product.id}
              className="flex items-center gap-1.5 px-6 border-r border-gray-200 text-sm whitespace-nowrap"
            >
              <span className="text-base">{product.image}</span>
              <span className="text-gray-700 font-medium">
                {product.nameBn}
              </span>
              <span className="text-gray-600">
                {toBnNum(product.today)} টাকা/{getUnitBn(product.unit)}
              </span>

              

              {!isFlat && (
                <span
                  className={`font-bold ml-1 flex items-center ${
                    isUp ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isUp ? "▲" : "▼"} {toBnNum(Math.abs(product.change.pct))}%
                </span>
              )}
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default PriceTicker;
