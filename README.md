# GreenGrocery

GreenGrocery is a full-stack grocery shopping platform with a customer storefront and a seller dashboard. Customers can browse products, manage a cart, save delivery addresses, place orders, and make payments. Sellers can add products, manage the product catalogue, and review orders.

## Features

- Product browsing and category views
- Product search, details, and cart management
- User authentication and persistent carts
- Address management and order history
- Stripe payment integration
- Seller authentication and dashboard
- Product uploads through Cloudinary
- Responsive React interface

## Tech stack

- **Frontend:** React, React Router, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Services:** Cloudinary for images and Stripe for payments

## Project structure

```text
GreenGrocery/
├── Client/    # React + Vite storefront and seller dashboard
└── Server/    # Express API, authentication, models, and routes
```

## Prerequisites

- Node.js 18 or newer
- MongoDB database
- Cloudinary account
- Stripe account and API key

## Getting started

Clone the repository and install dependencies in both applications:

```bash
git clone https://github.com/Thushan2002/GreenGrocery.git
cd GreenGrocery

cd Server
npm install

cd ../Client
npm install
```

Create `Server/.env`:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SELLER_EMAIL=your_seller_email
SELLER_PASSWORD=your_seller_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Create `Client/.env` and point the frontend to the running API:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=$
```

Do not commit either `.env` file or real credentials.

## Running locally

Start the API in one terminal:

```bash
cd Server
npm run dev
```

Start the frontend in another terminal:

```bash
cd Client
npm run dev
```

Open the local URL printed by Vite. The API health endpoint is available at `http://localhost:4000/`.

## Available scripts

### Client

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

### Server

- `npm run dev` - start the API with Nodemon
- `npm start` - start the API with Node.js

## API route groups

The backend exposes route groups under `/api` for users, sellers, products, carts, addresses, and orders. Authentication uses cookies and JWTs.

## License

This project is distributed under the ISC license declared by the server package.
