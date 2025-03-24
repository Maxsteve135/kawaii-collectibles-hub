
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "../lib/mockData";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";
import { CartItem as SupabaseCartItem } from "../lib/supabase";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

type CartAction =
  | { type: "SET_CART"; payload: { items: CartItem[] } }
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: true,
};

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART": {
      const { items } = action.payload;
      const { totalItems, totalPrice } = calculateTotals(items);
      return { ...state, items, totalItems, totalPrice, isLoading: false };
    }

    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);

      let updatedItems: CartItem[];
      if (existingItemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        updatedItems = [...state.items, { product, quantity }];
      }

      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { ...state, items: updatedItems, totalItems, totalPrice };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload.productId);
      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { ...state, items: updatedItems, totalItems, totalPrice };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      const updatedItems = state.items.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { ...state, items: updatedItems, totalItems, totalPrice };
    }

    case "CLEAR_CART":
      return { ...initialState, isLoading: false };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

interface CartContextType extends Omit<CartState, 'isLoading'> {
  isLoading: boolean;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load cart from Supabase when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (!isAuthenticated || !user) {
        // If not authenticated, try to load from localStorage
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            dispatch({ type: "SET_CART", payload: { items: parsedCart.items } });
          } catch (error) {
            console.error("Error parsing cart from localStorage", error);
            dispatch({ type: "CLEAR_CART" });
          }
        } else {
          dispatch({ type: "SET_LOADING", payload: false });
        }
        return;
      }

      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const { data: cartItems, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error("Error fetching cart from Supabase", error);
          dispatch({ type: "SET_LOADING", payload: false });
          return;
        }

        if (cartItems && cartItems.length > 0) {
          // Convert Supabase cart items to our CartItem format
          const items: CartItem[] = await Promise.all(
            cartItems.map(async (item: SupabaseCartItem) => {
              // Import product data from our mock data
              const { products } = await import("../lib/mockData");
              const product = products.find(p => p.id === item.product_id);
              
              if (!product) {
                console.error(`Product with ID ${item.product_id} not found`);
                return null;
              }
              
              return {
                product,
                quantity: item.quantity,
              };
            })
          );

          // Filter out any null items
          const validItems = items.filter(Boolean) as CartItem[];
          dispatch({ type: "SET_CART", payload: { items: validItems } });
        } else {
          dispatch({ type: "CLEAR_CART" });
        }
      } catch (error) {
        console.error("Error in loadCart", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadCart();
  }, [user, isAuthenticated]);

  // Save cart to Supabase or localStorage when it changes
  useEffect(() => {
    const saveCart = async () => {
      if (state.isLoading) return;

      if (isAuthenticated && user) {
        try {
          // First delete all existing cart items for this user
          await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id);

          // Then insert new cart items
          if (state.items.length > 0) {
            const cartItemsForSupabase = state.items.map(item => ({
              user_id: user.id,
              product_id: item.product.id,
              quantity: item.quantity,
            }));

            const { error } = await supabase
              .from('cart_items')
              .insert(cartItemsForSupabase);

            if (error) {
              console.error("Error saving cart to Supabase", error);
            }
          }
        } catch (error) {
          console.error("Error in saveCart", error);
        }
      } else {
        // Save to localStorage if not authenticated
        localStorage.setItem("cart", JSON.stringify({
          items: state.items,
          totalItems: state.totalItems,
          totalPrice: state.totalPrice,
        }));
      }
    };

    saveCart();
  }, [state.items, isAuthenticated, user]);

  const addItem = async (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };

  const removeItem = async (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        isLoading: state.isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
