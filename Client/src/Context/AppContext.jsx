import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/greencart_assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // fetch products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // add to cart

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId].quantity += 1;
    } else {
      cartData[itemId] = { quantity: 1 };
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  // update cart item

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove cart item

  const removeCartItem = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId].quantity -= 1;
      if (cartData[itemId].quantity <= 0) {
        delete cartData[itemId];
      }

      setCartItems(cartData);
      toast.success("Item removed from cart");
    }
  };

  // Get cart items count

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item].quantity;
    }
    return totalCount;
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[item].quantity;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();
  });

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    currency,
    products,
    setProducts,
    updateCartItem,
    removeCartItem,
    cartItems,
    addToCart,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getTotalAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
