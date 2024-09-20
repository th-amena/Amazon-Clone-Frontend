import React, {useState, useEffect} from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endpoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'
import classes from './Results.module.css'

function Results() {

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const {categoryName} = useParams()
  console.log(categoryName);

  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res) => {
      setResults(res.data)
      setIsLoading(false);
    console.log(res.data);
      })
      .catch((err) =>{
        console.log(err);
        setIsLoading(false)
        
      })

  }, [categoryName]) // Add categoryName to dependencies

  
  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}> 
            {results.map((product) => (
              <ProductCard key={product.id} product={product}
              renderDesc={false}
              renderAdd={true} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;