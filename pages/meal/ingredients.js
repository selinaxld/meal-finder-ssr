import React from 'react'

export const Ingredients = ({
    ingredients,
    measures
}) => {
    return(
        <div>
            <h1>Ingredients</h1>
            <div className='grid'>
                {ingredients.map((ingredient, i) => (
                    <div className='item' key={i}>
                        <img className='ingredientImg' src={'https://www.themealdb.com/images/ingredients/'+ingredient+'.png'}/>
                        <p>{measures[i]+' '+ingredient}</p>
                    </div>
                    ))}
            </div>
        </div>
    )
}