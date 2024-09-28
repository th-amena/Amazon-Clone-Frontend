import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import {
   collection,
   doc,
   query,
   orderBy,
   onSnapshot,
} from "firebase/firestore"; // modular Firestore methods
import { db } from "../../Utility/firebase"; // ensure db is properly imported
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Orders.module.css";

function Orders() {
   const [{ user }, dispatch] = useContext(DataContext); // to pick user from useContext
   const [orders, setOrders] = useState([]); // for the orders

   useEffect(() => {
      if (user) {
         // Define the orders reference path
         const ordersRef = collection(db, "users", user.uid, "orders");

         // Query the orders ordered by 'created' in descending order
         const ordersQuery = query(ordersRef, orderBy("created", "desc"));

         // Listen to real-time updates from Firestore
         const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
            setOrders(
               snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(), // Retrieves the 'basket' data from Firestore
               }))
            );
         });

         // Cleanup listener on unmount
         return () => unsubscribe();
      } else {
         setOrders([]);
      }
   }, [user]); // Dependency on 'user', as it triggers fetching orders when the user is logged in

   return (
      <LayOut>
         <section className={classes.container}>
            <div className={classes.orders_container}>
               <h2>Your Orders</h2>
               {orders?.length == 0 && <div style={{ padding: "20px"}}> You don't have orders yet.</div> }

               <div>
                  {orders?.map((eachOrder, i) => {
                     return (
                        <div key={i}>
                           <hr />
                           <p>Order ID: {eachOrder?.id}</p>
                           {eachOrder?.data?.basket?.map((order) => {
                              return (
                                 <ProductCard
                                    flex={true}
                                    product={order}
                                    key={order.id}
                                 />
                              );
                           })}
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>
      </LayOut>
   );
}

export default Orders;
