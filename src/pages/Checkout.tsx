
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phoneNumber: "",
  });

  // Redirect if cart is empty
  if (totalItems === 0) {
    navigate('/cart');
    return null;
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateShippingDetails = (): boolean => {
    // Simple validation
    const requiredFields = ['fullName', 'address', 'city', 'state', 'postalCode', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !shippingDetails[field as keyof ShippingDetails]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }

    // Validate phone number (basic validation)
    if (!/^\d{10}$/.test(shippingDetails.phoneNumber)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateShippingDetails()) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
      
      // In a real app, you would save the order to Supabase here
    }, 2000);
  };

  const handleFinishOrder = () => {
    clearCart();
    navigate('/');
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    });
  };

  const calculateTotal = () => {
    const subtotal = totalPrice;
    const shipping = 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping;
    return { subtotal, shipping, tax, total };
  };

  const { subtotal, shipping, tax, total } = calculateTotal();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <div className="flex items-center">
            <div className={`flex items-center ${step === 'shipping' ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
              <span className="mr-2">1</span>
              <span>Shipping</span>
            </div>
            <div className="w-10 h-0.5 mx-2 bg-gray-200"></div>
            <div className={`flex items-center ${step === 'payment' ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
              <span className="mr-2">2</span>
              <span>Payment</span>
            </div>
            <div className="w-10 h-0.5 mx-2 bg-gray-200"></div>
            <div className={`flex items-center ${step === 'confirmation' ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
              <span className="mr-2">3</span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={shippingDetails.fullName}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingDetails.address}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingDetails.state}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingDetails.postalCode}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={shippingDetails.phoneNumber}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        required
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate('/cart')}
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back to Cart
                    </Button>
                    <Button type="submit">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}
              
              {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-4">
                      This is a demo app. No real payment will be processed.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium mb-2">Shipping to:</h3>
                      <p>{shippingDetails.fullName}</p>
                      <p>{shippingDetails.address}</p>
                      <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}</p>
                      <p>{shippingDetails.country}</p>
                      <p>Phone: {shippingDetails.phoneNumber}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        id="cardName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        placeholder="4242 4242 4242 4242"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          id="expiryDate"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setStep('shipping')}
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back to Shipping
                    </Button>
                    <Button type="submit" disabled={isProcessing}>
                      {isProcessing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>
                </form>
              )}
              
              {step === 'confirmation' && (
                <div className="p-6 text-center">
                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-green-100 rounded-full p-3 mb-4">
                      <CheckCircle size={48} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
                    <p className="text-gray-600 max-w-md">
                      Your order has been placed successfully. You will receive a confirmation email shortly.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-left">
                    <h3 className="font-medium mb-2">Order Summary:</h3>
                    <p className="mb-1">Order Number: <span className="font-medium">KC-{Math.floor(Math.random() * 10000)}</span></p>
                    <p className="mb-1">Order Date: <span className="font-medium">{new Date().toLocaleDateString()}</span></p>
                    <p className="mb-1">Total Amount: <span className="font-medium">₹{total.toLocaleString()}</span></p>
                    <p className="mb-1">Payment Method: <span className="font-medium">Credit Card</span></p>
                  </div>
                  
                  <Button onClick={handleFinishOrder}>
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="mb-6 max-h-80 overflow-y-auto pr-2">
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li key={item.product.id} className="py-3 flex items-center">
                      <img 
                        src={item.product.mainImage} 
                        alt={item.product.name} 
                        className="w-12 h-12 object-cover rounded-md mr-3"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Totals */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
