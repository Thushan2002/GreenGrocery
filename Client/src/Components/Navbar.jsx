import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/greencart_assets/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLoginOption = (type) => {
    setLoginDropdown(false);
    if (type === "user") {
      setShowUserLogin(true);
    } else if (type === "seller") {
      navigate("/seller");
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/">
        <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
        </div>

        <div className="relative cursor-pointer">
          <img
            src={assets.cart_icon}
            onClick={() => {
              navigate("/cart");
            }}
            alt="Cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount() || 0}
          </button>
        </div>

        {!user ? (
          <div className="relative">
            <button
              onClick={() => setLoginDropdown(!loginDropdown)}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm flex items-center gap-1">
              Login
              <svg
                className={`w-4 h-4 transition-transform ${
                  loginDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Login Dropdown */}
            {loginDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                <button
                  onClick={() => handleLoginOption("user")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-lg border-b border-gray-100 transition-colors">
                  <div className="font-medium text-gray-900">User Login</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Shop and place orders
                  </div>
                </button>
                <button
                  onClick={() => handleLoginOption("seller")}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-lg transition-colors">
                  <div className="font-medium text-gray-900">seller Panel</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Manage products & orders
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative group cursor-pointer">
            <img src={assets.profile_icon} alt="profile" className="w-10" />
            <ul className="absolute right-0 hidden group-hover:block bg-white shadow-md p-2 rounded text-sm w-48 z-50">
              <li className="px-3 py-2 border-b border-gray-100">
                <span className="text-gray-600">Welcome, {user.name}</span>
              </li>
              <li className="hover:bg-gray-50 rounded">
                <NavLink to="/orders" className="block px-3 py-2">
                  My Orders
                </NavLink>
              </li>
              {user.role === "seller" && (
                <li className="hover:bg-gray-50 rounded">
                  <NavLink
                    to="/seller"
                    className="block px-3 py-2 text-primary font-medium">
                    seller Dashboard
                  </NavLink>
                </li>
              )}
              <li className="hover:bg-gray-50 rounded">
                <button
                  onClick={logout}
                  className="cursor-pointer py-2 px-3 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm w-full text-center">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden">
        <img src={assets.menu_icon} alt="Menu" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}>
        <NavLink to="/" onClick={() => setOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setOpen(false)}>
          All Products
        </NavLink>
        {user && (
          <NavLink to="/orders" onClick={() => setOpen(false)}>
            My Orders
          </NavLink>
        )}
        {user?.role === "seller" && (
          <NavLink
            to="/seller"
            onClick={() => setOpen(false)}
            className="text-primary font-medium">
            seller Dashboard
          </NavLink>
        )}
        <NavLink to="/" onClick={() => setOpen(false)}>
          Contact
        </NavLink>

        {!user ? (
          <div className="flex flex-col gap-2 w-full mt-2">
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm w-full text-center">
              User Login
            </button>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/seller");
              }}
              className="cursor-pointer px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition rounded-full text-sm w-full text-center">
              seller Panel
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Logout
          </button>
        )}
      </div>

      {/* Overlay for closing dropdowns */}
      {(loginDropdown || open) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setLoginDropdown(false);
            setOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
