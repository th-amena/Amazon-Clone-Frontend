import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { axiosInstance } from "../../Api/axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
   const [{ user, basket }, dispatch] = useContext(DataContext); // Get setBasket from DataContext

   // Calculate total number of items and total price
   const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
   const total = basket.reduce(
      (amount, item) => item.price * item.amount + amount,
      0
   );

   const [cardError, setCardError] = useState(null);
   const [clientSecret, setClientSecret] = useState(""); // Store client secret
   const [processing, setProcessing] = useState(false); // Disable button during payment

   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate();

   const clearBasket = () => {
      dispatch({ type: Type.EMPTY_BASKET }); // Dispatch action to empty the basket
      // setBasket([]); // Use setBasket to clear the basket after payment
   };

   const handleChange = (e) => {
      setCardError(e?.error?.message || ""); // Set card error if it exists
   };

   const handlePayment = async (e) => {
      e.preventDefault(); // Prevent page refresh

      if (!stripe || !elements) return;

      setProcessing(true); // Disable button while processing

      try {
         //1. need to contact backend || functions -----> to get the client secret
         // Get client secret from the backend
         const response = await axiosInstance({
            method: "POST",
            url: `/payment/create?total=${total * 100}`, // total in cents
         });

         const clientSecret = response.data.clientSecret;
         setClientSecret(clientSecret);

         // Confirm payment on the client side
         //2. client side (react side confirmation) using stripe
         const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
               payment_method: {
                  card: elements.getElement(CardElement),
               },
            }
         );

         if (error) {
            setCardError(error.message);
            setProcessing(false);
         } else if (paymentIntent.status === "succeeded") {
            console.log("Payment successful");
            console.log(paymentIntent);
            clearBasket(); // Clear basket after payment

            //Save the order to Firestore after payment confirmation
            // Further actions: Save order to Firestore, etc.
            //3. after the confirmation -----> order firestore db to save the order, then clear the basket, once order is saved on the db, no more needed in the basket at this point
            await setDoc(
               doc(
                  collection(db, "users"),
                  user.uid,
                  "orders",
                  paymentIntent.id
               ),
               {
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created,
               }
            );

            //empty the baseket 

            dispatch({ type: Type.EMPTY_BASKET});

            setProcessing(false);
            navigate("/orders", {
               state: { msg: "You have placed a new order" },
            });
         }
      } catch (error) {
         console.error("Payment error:", error);
         setProcessing(false);
      }
   };

   return (
      <LayOut>
         <div className={classes.payment_header}>
            Checkout {totalItem} items
         </div>

         <section className={classes.payment}>
            {/* Address */}
            <div className={classes.flex}>
               <h3>Delivery Address</h3>
               <div>
                  <div>{user?.email}</div>
                  <div>123 React Lane</div>
                  <div>Washington, D.C</div>
               </div>
            </div>
            <hr />

            {/* Products */}
            <div className={classes.flex}>
               <h3>Review Items and Delivery</h3>
               <div>
                  {basket?.map((item) => (
                     <ProductCard key={item.id} product={item} flex={true} />
                  ))}
               </div>
            </div>
            <hr />

            {/* Payment form */}
            <div className={classes.flex}>
               <h3>Payment Methods</h3>

               <div className={classes.payment_card_container}>
                  <div className={classes.payment_details}>
                     {/* Client-side payment functionality */}
                     <form onSubmit={handlePayment}>
                        {cardError && (
                           <small style={{ color: "red" }}> {cardError} </small>
                        )}

                        {/* Card Element */}
                        <CardElement onChange={handleChange} />

                        {/* Total price */}
                        <div className={classes.payment_price}>
                           <div>
                              <span style={{ display: "flex", gap: "10px" }}>
                                 <p>Total Order |</p>
                                 <CurrencyFormat amount={total} />
                              </span>
                           </div>
                           <button
                              type="submit"
                              disabled={processing || !stripe}
                           >
                              {processing ? (
                                 <div className={classes.loading}>
                                    <ClipLoader color="gray" size={12} />
                                    <p>Please Wait ...</p>
                                 </div>
                              ) : (
                                 "Pay Now"
                              )}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </LayOut>
   );
}

export default Payment;

//**************************************************************************************** */
// import React, { useContext, useState } from "react";
// import LayOut from "../../Components/LayOut/LayOut";
// import classes from "./Payment.module.css";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";
// import { axiosInstance } from "../../Api/axios";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

// function Payment() {
//    const [{ user, basket }] = useContext(DataContext);

//    //calculate the total number of items
//    const totalItem = basket?.reduce((amount, item) => {
//       return item.amount + amount;
//    }, 0);

//    const total = basket.reduce((amount, item) => {
//       // Calculate the total price
//       return item.price * item.amount + amount;
//    }, 0);

//    const [cardError, setCardError] = useState(null);

//    const stripe = useStripe();
//    const elements = useElements();

//    const handleChange = (e) => {
//       console.log(e);

//       e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
//    };

//    const handlePayment = async (e) => {
//       // to prevent the page from refrshing, otherwise the state will be lost
//       e.preventDefault();

//       try {
//          //1. need to contact backend || functions -----> to get the client secret
//          const response = await axiosInstance({
//             method: "POST",
//             url: `/payment/create?total=${total * 100}`,
//          });

//          console.log(response.data);
//          const clientSecret = response.data?.clientSecret;
//          console.log(clientSecret);

//          //2. client side (react side confirmation) using stripe
//          const confirmation = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                card: elements.getElement(CardElement),
//             },
//          });

//          console.log(confirmation);
//       } catch (error) {}

//       //3. after the confirmation -----> order firestore db to save the order, then clear the basket, once order is saved on the db, no more needed in the basket at this point
//    };

//    return (
//       <LayOut>
//          {/* header section */}
//          <div className={classes.payment_header}>
//             {" "}
//             Checkout {totalItem} items
//          </div>
//          {/* payment method  */}

//          <section className={classes.payment}>
//             {/* address */}
//             <div className={classes.flex}>
//                <h3>Delivery Address</h3>
//                <div>
//                   <div>{user?.email}</div>
//                   <div>123 React Lane</div>
//                   <div>Washington, D.C</div>
//                </div>
//             </div>
//             <hr />

//             {/* product */}

//             <div className={classes.flex}>
//                <h3>Review Items and Delivery</h3>
//                <div>
//                   {basket?.map((item) => (
//                      <ProductCard product={item} flex={true} />
//                   ))}
//                </div>
//             </div>

//             <hr />

//             {/* card form */}
//             <div className={classes.flex}>
//                <h3>Payment Methods</h3>

//                <div className={classes.payment_card_container}>
//                   <div className={classes.payment_details}>
//                      {/* client side payment functionality */}
//                      <form onSubmit={handlePayment}></form>
//                      {/* error */}

//                      <form action="">
//                         {cardError && (
//                            <small style={{ color: "red" }}> {cardError} </small>
//                         )}

//                         {/* card element */}
//                         <CardElement onChange={handleChange} />

//                         {/* price  */}

//                         <div className={classes.payment_price}>
//                            <div>
//                               <span style={{ display: "flex", gap: "10px" }}>
//                                  <p> Total Order | </p>
//                                  <CurrencyFormat amount={total} />
//                               </span>
//                            </div>
//                            <button type="submit">Pay Now</button>
//                         </div>
//                      </form>
//                   </div>
//                </div>
//             </div>
//          </section>
//       </LayOut>
//    );
// }

// export default Payment;
