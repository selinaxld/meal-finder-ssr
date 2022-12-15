import React from 'react';
import Link from 'next/link';
import Navbar from './meal/navbar';

export async function getServerSideProps() {
  const mealsJson = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + 'Canadian')
      .then((response) => response.json());
  const meals = mealsJson.meals
  return { props: { meals } }
}

export default function Home({meals}) {
  return (
    <div>
      <Navbar />
      <div className='grid'>
        {meals.map((meal) => (
          <Link href={`/meal/${meal.idMeal}`} key={meal.idMeal}>
              <img src={meal.strMealThumb} style={{height: '300px', width: '300px'}}/>
              <h3>{meal.strMeal}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}