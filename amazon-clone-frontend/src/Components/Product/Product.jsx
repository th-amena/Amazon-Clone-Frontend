import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from './Product.module.css';
import Loader from "../Loader/Loader";

function Product() {
   const [products, setProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

   useEffect(() => {
      axios
         .get("https://fakestoreapi.com/products")
         .then((res) => {
            setProducts(res.data); // Set the products after fetching
            setIsLoading(false); // Set loading to false after data is fetched
         })
         .catch((err) => {
            console.log(err);
            setIsLoading(false); // Ensure loading is set to false even if there's an error
         });
   }, []); // Empty dependency array means this effect runs once on component mount

   return (
      <>
         {isLoading ? (
            <Loader />
         ) : (
            <section className={classes.products_container}>
               {products.map((singleProduct) => (
                  <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
               ))}
            </section>
         )}
      </>
   );
}

export default Product;
