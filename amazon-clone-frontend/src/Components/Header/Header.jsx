import React, {useContext} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import classes from './Header.module.css';  // Fixed import
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";

function Header() {

   const [{basket}, dispatch] = useContext(DataContext)
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
                  <SearchIcon />
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
                  <Link to="auth">
                     <p>Sign In</p>
                     <span>Account & Lists</span>
                  </Link>

                  <Link to="/orders">
                     <p>Returns</p>
                     <span>& Orders</span>
                  </Link>

                  {/* Cart section */}
                  <Link to="/cart" className={classes.cart}>
                     <AddShoppingCartIcon />
                     <span>{basket.length}</span>
                  </Link>
               </div>
            </div>
         </section>
         <LowerHeader />
         
      </section>
   );
}

export default Header;
