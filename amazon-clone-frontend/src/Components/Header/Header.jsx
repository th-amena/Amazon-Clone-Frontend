import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import classes from './Header.module.css';  // Fixed import

function Header() {
   return (
      <>
         <section>
            <div className={classes.header_container}>
               {/* Amazon logo */}
               <div className={classes.logo_container}>
                  <a href="/">
                     <img
                        src="https://pngimg.com/d/amazon_PNG11.png"
                        alt="Amazon logo"
                        className={classes.logo}
                     />
                  </a>

                  {/* Delivery section */}
                  <div className={classes.delivery}>
                     <span>
                        <LocationOnIcon />
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
                                 
                     <a href="" className={classes.language}>
                        <img
                           src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png"
                           alt="US flag" />
                        <select name="" id="">
                           <option value="">EN</option>
                        </select>
                     </a>

                     {/* Account, order, and cart section */}
                     <a href="">
                        <p>Sign In</p>
                        <span>Account & Lists</span>
                     </a>

                     <a href="">
                        <p>Returns</p>
                        <span>& Orders</span>
                     </a>
                  
                  
                     {/* Cart section */}
                     <a href="" className={classes.cart}>
                        <AddShoppingCartIcon />
                        <span>0</span>
                     </a>
                  
               </div>
            </div>
         </section>
      </>
   );
}

export default Header;

// import React from "react";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// import SearchIcon from "@mui/icons-material/Search";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import classes from './Header.module.css'
// function Header() {
//    return (
//       <>
//          <section className={classes.header_container}>
//             <div>
//                {/* {logo} */}
//                <a href="/">
//                   <img
//                      src="https://pngimg.com/d/amazon_PNG11.png"
//                      alt="amazon logo"
//                   />
//                </a>
//                {/* deilivery section */}
//                <span>
//                   <LocationOnIcon />
//                </span>
//                <div>
//                   <p>Delivere to </p>
//                   <span>USA</span>
//                </div>
//             </div>

//             <div>
//                {/* Search section */}
//                <select name="" id="">
//                   <option value="">All</option>
//                </select>
//                <input type="text" name="" id="" placeholder="search product" />

//                {/* icon */}
//                <SearchIcon />
//             </div>
//             {/* right header section */}
//             <div>
//                <div>
//                   <img
//                      src="https://cdn.countryflags.com/thumbs/united-states-of-america/flag-400.png"
//                      alt="us flag"
//                   />
//                   <section>
//                      <option value="">EN</option>
//                   </section>
//                </div>

//                {/* Account, order and cart section */}

//                <a href="">
//                   <div>
//                      <p>Sign In</p>
//                      <span>Account and Lists</span>
//                   </div>
//                </a>
//                {/* Orders */}

//                <a href="">
//                   <p>Returns</p>
//                   <span>& Orders </span>
//                </a>
//                {/* cart */}
//                <a>
//                   {/* icon */}
//                   <AddShoppingCartIcon />
//                   <span>0</span>
//                </a>
//             </div>
//          </section>
//       </>
//    );
// }