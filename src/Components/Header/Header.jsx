import React, { useContext } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import classes from "./Header.module.css"; // Fixed import
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { IoIosSearch } from "react-icons/io";
import { auth } from "../../Utility/firebase";

function Header() {
   const [{ user, basket }, dispatch] = useContext(DataContext);
   const totalItem = basket?.reduce((amount, item) => {
      return item.amount + amount;
   }, 0);
   console.log(basket.length);

   return (
      <section className={classes.fixed}>
         <section>
            <div className={classes.header_container}>
               {/* Amazon logo */}
               <div className={classes.logo_container}>
                  <Link to="/">
                     <img
                        src="https://pngimg.com/d/amazon_PNG11.png"
                        alt="Amazon logo"
                        className={classes.logo}
                     />
                  </Link>

                  {/* Delivery section */}
                  <div className={classes.delivery}>
                     <span>
                        <LocationOnIcon size={25} />
                     </span>
                     <div>
                        <p>Deliver to</p>
                        <span>USA</span>
                     </div>
                  </div>
               </div>

               {/* Search section */}
               <div className={classes.search}>
                  <select name="" id="">
                     <option value="">All</option>
                  </select>
                  <input type="text" placeholder="Search products" />
                  <IoIosSearch size={38} />
               </div>

               {/* Right section */}
               <div className={classes.order_container}>
                  <Link to="" className={classes.language}>
                     <img
                        src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png"
                        alt="US flag"
                     />
                     <select name="" id="">
                        <option value="">EN</option>
                     </select>
                  </Link>

                  {/* Account, order, and cart section */}
                  <Link to={!user && "/auth"}>
                     {/* direct user to sign in if not signed in */}
                     <div>
                        {user ? (
                           <>
                           {/* option for user to sign-out, if signed-in */}

                              <p>Hello {user?.email?.split("@")[0]} </p>
                              <span onClick={()=>auth.signOut()}>Sign Out</span>
                              {/* to call firebase signout method when 'Sign Out' is cliked, state also need to be updted on App.jsx for the logout to work  App.jsx on inital render checks if user is signed in  */}
                           </>
                        ) : (
                           <>
                           {/* for user who wants to sign-in */}

                              <p>Hello, Sign In</p>
                              <span>Account & Lists</span>
                           </>
                        )}
                     </div>
                  </Link>

                  <Link to="/orders">
                     <p>Returns</p>
                     <span>& Orders</span>
                  </Link>

                  {/* Cart section */}
                  <Link to="/cart" className={classes.cart}>
                     <AddShoppingCartIcon />
                     <span>{totalItem}</span>
                  </Link>
               </div>
            </div>
         </section>
         <LowerHeader />
      </section>
   );
}

export default Header;
