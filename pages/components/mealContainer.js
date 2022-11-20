import React, { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import { Meal } from "./meal";

//TODO: fetch meal data using SSR
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()
  
  // Pass data to the page via props
  return { props: { data } }
}

export const MealContainer = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [country, setCountry] = useState('Canadian')
  const [meals, setMeals] = useState([]);
  const [mealDetails, setDetails] = useState({});
  const countries = [
    "Canadian",
    "American",
    "British",
    "French",
    "Chinese",
    "Italian",
    "Indian",
    "Japanese",
    "Greek",
    "Malaysian",
    "Mexican",
    "Thai",
    "Vietnamese",
  ]
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

  const getMeals = async () => {
    setLoading(true);
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country)
      .then((response) => response.json())
      .then((json) => {
        const mealTemp = [];
        for (const meal of json.meals) mealTemp.push(meal);
        setMeals(mealTemp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getMealDetails = async () => {
    let name = meals[index].strMeal;
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name)
      .then((response) => response.json())
      .then((json) => {
        let meal = json.meals[0];
        let tempMeal = {};
        tempMeal.strInstructions = meal.strInstructions;
        tempMeal.ingredients = [];
        tempMeal.measures = [];
        for (let i = 0; i < 20; i++) {
          if (meal[ingredientKeys[i]] !== "") {
            tempMeal.ingredients.push(meal[ingredientKeys[i]]);
            tempMeal.measures.push(meal[measureKeys[i]]);
          }
        }
        mealDetails[meal.idMeal] = tempMeal;
        setDetails(mealDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMeals();
  }, [country]);

  useEffect(() => {
    if (meals[index] != null) {
      if (mealDetails[meals[index].idMeal] == null) {
        getMealDetails();
      } else {
        setLoading(false);
      }
    }
  }, [meals, index]);

  const onSelect = (e) => {
    setLoading(true)
    setCountry(e.value)
  }

  const getPrev = () => {
    setLoading(true);
    const isFirst = index === 0;
    const newIndex = isFirst ? meals.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const getNext = () => {
    setLoading(true);
    const isLast = index === meals.length - 1;
    const newIndex = isLast ? 0 : index + 1;
    setIndex(newIndex);
  };

  return (
    <div>
      <Dropdown className='countrySelect' options={countries} onChange={onSelect} value={country} />
      <button className="prev" onClick={getPrev}>
        {"<"}
      </button>
      <div className='Meal'>
        {!isLoading && (
          <Meal
            name={meals[index].strMeal}
            img={meals[index].strMealThumb}
            ingredients={mealDetails[meals[index].idMeal].ingredients}
            measures={mealDetails[meals[index].idMeal].measures}
            instructions={mealDetails[meals[index].idMeal].strInstructions}
          />
        )}
      </div>
      <button className="next" onClick={getNext}>
        {">"}
      </button>
    </div>
  );
};
