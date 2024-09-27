import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import classes from "./Header.module.css";

function LowerHeader() {
   return (
      <div className={classes.lower_container}>
         <ul>
            <li>
                < MenuIcon  />
                <p>All</p>
            </li>
            <li>Same-Day Delivery</li>
            <li>Medical Care</li>
            <li>Keep Shopping For</li>
            <li>Prime Video</li>
            <li>Amazon Bascis</li>
            <li>Today's Deals</li>
            <li>Best Sellers</li>
            <li>Toy & Games</li>
            <li>Groceries</li>
            <li>Prime</li>
            <li>Buy Again</li>
            <li>Shop By Interest</li>
            <li>Household, Health & Baby Care</li>
            <li>Livestreams</li>
            <li>Subscribe & Save</li>
         </ul>
      </div>
   );
}

export default LowerHeader;
