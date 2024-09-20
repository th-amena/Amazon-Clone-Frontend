import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endpoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function ProductDetails() {
   const { productId } = useParams(); // Fetch product ID from the route parameters
   const [isLoading, setIsLoading] = useState(true); // Initialize as true to show loader initially

   const [product, setprodcut] = useState(null); // Initialize product as null for proper loading state
   useEffect(() => {
      // Fetch product details by product ID
       axios.get(`${productUrl}/products/${productId}`)
         .then((res) => {
            console.log(res);
            setprodcut(res.data);
            setIsLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setIsLoading(false);
         });
   }, [productId]);

   console.log(productId);
   if (isLoading) {
    return (
      <LayOut>
        <Loader /> {/* Show loader while data is being fetched */}
      </LayOut>
    );
  }

  return (
    <LayOut>
      {product ? (
        <ProductCard product={product} 
        flex = {true}
        renderDesc = {true}
        renderAdd={true}
        
        /> 
        /* Render the product details using ProductCard */
      ) : (
        <p>Product not found</p> // Handle the case when product is not found
      )}
    </LayOut>
  );
}

export default ProductDetails
