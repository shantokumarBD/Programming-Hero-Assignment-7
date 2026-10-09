import { getAllProducts } from "@/lib/api";
import { Product } from "@/types";
import ProductCard from "../shared/ProductCard";
import ProductListWithSort from "../shared/ProductListWithSort";

const HomeProducts = async () => {
  const products = await getAllProducts();

  if (!products || products.length === 0) return null;

  
    const increasedProducts = products
    .filter((p: Product) => p.change.dir === "up")
    .sort((a: Product, b: Product) => b.change.pct - a.change.pct)
    .slice(0, 6);
    
    const decreasedProducts = products
    .filter((p: Product) => p.change.dir === "down")
    .sort((a: Product, b: Product) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20" id="products">
      
      
      {increasedProducts.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-red-600">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {increasedProducts.map((product: Product) => (
              <ProductCard key={`up-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      )}

      
      {decreasedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-600">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decreasedProducts.map((product: Product) => (
              <ProductCard key={`down-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      )}

      
      <ProductListWithSort products={products} title="সব পণ্য" />

    </div>
  );
};

export default HomeProducts;
