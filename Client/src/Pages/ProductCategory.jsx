import React from "react";
import { categories } from "../assets/greencart_assets/assets";
import { useAppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category?.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="mt-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {searchCategory && (
        <div className="mb-8">
          <div className="flex flex-col items-start w-max">
            <h1 className="text-2xl font-bold text-gray-900">
              {searchCategory.text}
            </h1>
            <div className="w-full h-1 bg-primary rounded-full mt-2"></div>
          </div>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            No Products Found
          </p>
          <p className="text-gray-600 max-w-md">
            We couldn't find any products in the{" "}
            {searchCategory?.text || "selected"} category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
