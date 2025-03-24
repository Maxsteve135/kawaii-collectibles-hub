
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  ChevronLeft, 
  Minus, 
  Plus, 
  ShoppingBag,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number, productName: string) => {
    removeItem(productId);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart.`,
      duration: 3000,
    });
  };

  const handleClearCart = () => {
    clearCart();
    setShowEmptyConfirm(false);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 3000,
    });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to proceed to checkout.",
        variant: "destructive",
      });
      navigate("/auth", { state: { from: "/cart" } });
    } else {
      navigate("/checkout");
    }
  };

  const calculateTotal = () => {
    const subtotal = totalPrice;
    const shipping = subtotal > 0 ? 99 : 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  };

  const { subtotal, shipping, total } = calculateTotal();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary-600 mb-4" />
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (totalItems === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <ShoppingBag className="text-gray-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/shop">
            <Button className="px-6">
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
            <button
              onClick={() => setShowEmptyConfirm(true)}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
            >
              <Trash2 size={16} className="mr-1" />
              Empty Cart
            </button>
          </div>
        </div>

        {/* Empty Cart Confirmation */}
        {showEmptyConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Empty your cart?</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your cart? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowEmptyConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleClearCart}
                >
                  Empty Cart
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <li key={item.product.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="sm:w-20 h-20 mb-4 sm:mb-0 flex-shrink-0">
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.mainImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="sm:ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <div className="text-xs text-gray-500 uppercase mb-1">
                              {item.product.category}
                            </div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                          <div className="mt-2 sm:mt-0 font-semibold">
                            ₹{item.product.price.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center mb-4 sm:mb-0">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className="p-1 rounded-md border border-gray-200 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="mx-3 w-8 text-center text-gray-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                              disabled={item.quantity >= item.product.stock}
                              className="p-1 rounded-md border border-gray-200 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between sm:block">
                            <span className="text-gray-500 sm:hidden">Subtotal:</span>
                            <div className="flex items-center">
                              <span className="text-gray-900 font-medium mr-4">
                                ₹{(item.product.price * item.quantity).toLocaleString()}
                              </span>
                              <button
                                onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Continue Shopping Link */}
            <div className="mt-4">
              <Link
                to="/shop"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <ChevronLeft size={16} className="mr-1" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹{shipping.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Including ₹{Math.round(total * 0.18).toLocaleString()} in taxes
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6 py-6" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 text-center text-xs text-gray-500">
                <p>Secure checkout powered by Razorpay</p>
                <div className="flex justify-center items-center mt-2 space-x-2">
                  <div className="w-8 h-5 bg-gray-100 rounded"></div>
                  <div className="w-8 h-5 bg-gray-100 rounded"></div>
                  <div className="w-8 h-5 bg-gray-100 rounded"></div>
                  <div className="w-8 h-5 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
