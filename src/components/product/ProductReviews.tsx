
import { Star } from "lucide-react";
import { Review } from "../../lib/mockData";

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews = ({ reviews }: ProductReviewsProps) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
      
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h4 className="font-semibold mr-2">{review.userName}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? "currentColor" : "none"}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(review.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
