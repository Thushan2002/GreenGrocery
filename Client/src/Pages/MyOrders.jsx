import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { dummyOrders } from "../assets/greencart_assets/assets";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    setMyOrders(dummyOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid 2xl:grid-cols-2 gap-5">
        {myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 py-5 w-fit mb-10">
            <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
              <span>Order Id: {order._id}</span>
              <span>Payment:{order.paymentType}</span>
              <span>
                Total Amount: {currency}
                {order.amount}
              </span>
            </p>
            {order.items.map((item, index) => (
              <div
                key={index}
                className={`relative  text-gray-500/70 ${
                  order.items.length !== index + 1 && "border-b"
                } border-gray-300 flex flex-col md:flex-row justify-between items-start md:items-center p-4 py-5 md:gap-16 w-full `}>
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <img
                      src={item.product.image[0]}
                      alt=""
                      className="h-16 w-16"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-medium text-gray-800">
                      {item.product.name}
                    </h2>
                    <p>Category: {item.product.category}</p>
                  </div>
                </div>
                <div>
                  <p>Quantity: {item.product.quantity || "1"}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-primary text-lg font-medium">
                  Amount: {currency}
                  {item.product.price * (item.product.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
