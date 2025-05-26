import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/greencart_assets/assets";
import { useAppContext } from "../Context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
  } = useAppContext();

  const logout = () => {
    setUser(null);
    navigate("/");
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
            3
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Login
          </button>
        ) : (
          <div className="relative group cursor-pointer">
            <img src={assets.profile_icon} alt="profile" className="w-10" />
            <ul className="absolute hidden group-hover:block bg-white shadow-md  p-2 rounded text-sm">
              <li>
                <NavLink to="/orders">My Orders</NavLink>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="cursor-pointer py-1 px-3 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
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
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        {user && <NavLink to="/orders">My Orders</NavLink>}
        <NavLink to="/">Contact</NavLink>
        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
