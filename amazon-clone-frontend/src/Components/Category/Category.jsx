import React from 'react'
import CategoryInfo from './CategoryInfo.js'
import CategoryCard from './CategoryCard'
import classes from './Category.module.css'

function Category() {
  return (
    <section className= {classes.category_container}>
        {

        CategoryInfo.map((infos, index) => (
           <CategoryCard key={index} data={infos} />
        ))
        }
      
    </section>
  )
}

export default Category
