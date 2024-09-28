import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const stripePromise = loadStripe(
   "pk_test_51Q1tasRtrOw8t1NUWIwaz7DbYsgZoPhh6otqvi0EUwbXOuZw43aNfN0aucafkNn5h34ityveH14JO3nIJYAYQ6Dw00uF4ESuDl"
);

function Routing() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route
               path="/payments"
               element={
                  <ProtectedRoute
                     msg={"You must login to pay"}
                     redirect={"/payments"}
                  >
                     <Elements stripe={stripePromise}>
                        <Payment />
                     </Elements>
                  </ProtectedRoute>
               }
            />
            <Route
               path="/orders"
               element={
                  <ProtectedRoute
                     msg={"You must login to access your orders"}
                     redirect={"/orders"}
                  >
                     <Orders />
                  </ProtectedRoute>
               }
            />

            <Route path="/category/:categoryName" element={<Results />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
         </Routes>
      </Router>
   );
}

export default Routing;
