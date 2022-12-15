import React from "react";
import Link from 'next/link';
import Meal from "./meal";

export async function getServerSideProps({params}) {
  const ingredientKeys = [
    "strIngredient1",
    "strIngredient2",
    "strIngredient3",
    "strIngredient4",
    "strIngredient5",
    "strIngredient6",
    "strIngredient7",
    "strIngredient8",
    "strIngredient9",
    "strIngredient10",
    "strIngredient11",
    "strIngredient12",
    "strIngredient13",
    "strIngredient14",
    "strIngredient15",
    "strIngredient16",
    "strIngredient17",
    "strIngredient18",
    "strIngredient19",
    "strIngredient20",
  ];
  const measureKeys = [
    "strMeasure1",
    "strMeasure2",
    "strMeasure3",
    "strMeasure4",
    "strMeasure5",
    "strMeasure6",
    "strMeasure7",
    "strMeasure8",
    "strMeasure9",
    "strMeasure10",
    "strMeasure11",
    "strMeasure12",
    "strMeasure13",
    "strMeasure14",
    "strMeasure15",
    "strMeasure16",
    "strMeasure17",
    "strMeasure18",
    "strMeasure19",
    "strMeasure20",
  ];
  const mealDetails = {}
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + params.idMeal)
  const detailsJson = await response.json();
  if(detailsJson){
    const details = detailsJson.meals[0]
    mealDetails.strMeal = details.strMeal;
    mealDetails.strMealThumb = details.strMealThumb;
    mealDetails.strInstructions = details.strInstructions;
    mealDetails.ingredients = [];
    mealDetails.measures = [];
    for (let i = 0; i < 20; i++) {
      if (details[ingredientKeys[i]] !== "") {
        mealDetails.ingredients.push(details[ingredientKeys[i]]);
        mealDetails.measures.push(details[measureKeys[i]]);
      }
    }
  }
  

  return { props: { mealDetails } }
}

export default function MealContainer({mealDetails}) {
  return (
    <div>
      <Link className='backButton' href='/'>
        Back
      </Link>
    <div className='Meal'>
      <Meal
          name={mealDetails.strMeal}
          img={mealDetails.strMealThumb}
          ingredients={mealDetails.ingredients}
          measures={mealDetails.measures}
          instructions={mealDetails.strInstructions}
        />
    </div>
    </div>
  );
};
