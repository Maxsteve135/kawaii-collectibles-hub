
import { Product } from "../../lib/mockData";
import ProductCard from "../ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
