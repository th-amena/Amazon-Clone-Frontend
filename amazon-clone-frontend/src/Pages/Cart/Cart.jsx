import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from './Cart.module.css';


function Cart() {
   const [{ basket, user }, dispatch] = useContext(DataContext);
   //console.log(basket);
   const total = basket.reduce((amount, item) => {

      return item.price * item.amount + amount
   },0)
   console.log(basket);
   
   return (
      <LayOut>
         <section className={classes.container}>
            <div className={classes.cart_container}> 
               <h2>Hello</h2>
               <h3>Your Shopping Basket</h3>
               <hr />
               {basket?.length === 0 ? (
                  <p>Opps ! Your cart is empty</p>
               ) : (
                  basket?.map((item, i) => {
                     console.log(item);

                     return (
                        <ProductCard
                           key={i}
                           product={item}
                           renderDesc={true}
                           renderAdd={false}
                           flex={true}
                        />
                     );
                  })
               )}
            </div>
            {basket?.length !== 0 && (
               <div className={classes.subtotal}>
                  <div>
                     <p>Subtotal ({basket?.length} items)</p>
                     <CurrencyFormat amount={total} />
                  </div>
                  <span>
                     <input type="checkbox" />
                     <small>This order contains a gift</small>
                  </span>
                  
                    <Link to="/payments">Continue to Checkout</Link>
                  </div>
            )}
         </section>
      </LayOut>
   );
}

export default Cart;
