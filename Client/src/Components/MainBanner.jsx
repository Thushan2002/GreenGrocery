import React from "react";
import { assets } from "../assets/greencart_assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative mt-10 w-full">
      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Banner Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center px-6 md:px-16 lg:px-24 pb-20 md:pb-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[18rem] md:max-w-[28rem] lg:max-w-[38rem] leading-tight lg:leading-tight text-black">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
          <Link
            to="/products"
            className="group flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dull transition rounded text-white font-medium">
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="md:hidden transition group-focus:translate-x-1"
            />
          </Link>
          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-8 py-3 border border-black hover:bg-gray-100 transition rounded font-medium text-black">
            Explore Deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
