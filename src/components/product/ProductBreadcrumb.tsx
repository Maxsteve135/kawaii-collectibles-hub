
import { Link } from "react-router-dom";
import { Product } from "../../lib/mockData";

interface ProductBreadcrumbProps {
  product: Product;
}

const ProductBreadcrumb = ({ product }: ProductBreadcrumbProps) => {
  return (
    <nav className="mb-6 text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-gray-500 hover:text-primary-600 transition-colors">
            Home
          </Link>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <Link to="/shop" className="text-gray-500 hover:text-primary-600 transition-colors">
            Shop
          </Link>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <Link 
            to={`/shop?category=${product.category}`} 
            className="text-gray-500 hover:text-primary-600 transition-colors capitalize"
          >
            {product.category}s
          </Link>
        </li>
        <li className="text-gray-400">/</li>
        <li className="text-gray-700 truncate">{product.name}</li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
