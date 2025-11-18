import React from "react";
import { assets } from "../assets/greencart_assets/assets";
import { useAppContext } from "../Context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeCartItem, cartItems, navigate } =
    useAppContext();

  if (!product) return null;

  return (
    <div
      onClick={() =>
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
      }
      className="group cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 w-full max-w-xs mx-auto">
      {/* Image Container */}
      <div className="flex items-center justify-center mb-4 h-48 overflow-hidden rounded-lg bg-gray-50">
        <img
          className="group-hover:scale-105 transition-transform duration-300 w-auto h-full object-contain"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3 h-3"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt={i < 4 ? "Filled star" : "Empty star"}
                />
              ))}
          </div>
          <span className="text-xs text-gray-600">({product.rating})</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-primary">
              {currency}${product.offerPrice}
            </span>
            <span className="text-xs text-gray-500 line-through">
              {currency}${product.price}
            </span>
          </div>

          {/* Add to Cart Button */}
          <div onClick={(e) => e.stopPropagation()}>
            {!cartItems[product._id] ? (
              <button
                className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                onClick={() => addToCart(product._id)}>
                <img src={assets.cart_icon} alt="Cart" className="w-4 h-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-primary/20 border border-primary/30 rounded-lg px-2 py-1">
                <button
                  onClick={() => removeCartItem(product._id)}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-primary/30 transition-colors text-sm font-medium">
                  -
                </button>
                <span className="text-sm font-medium w-6 text-center">
                  {cartItems[product._id].quantity}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-primary/30 transition-colors text-sm font-medium">
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
