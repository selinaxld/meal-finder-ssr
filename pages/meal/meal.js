import React from 'react'
import Ingredients from "./ingredients";
import Instructions from "./instructions";

const Meal = ({
    name,
    img,
    ingredients,
    measures,
    instructions,
}) => {
    return(
        <div>
            <h1>{name}</h1>
            <img src={img} />
            <Ingredients ingredients={ingredients} measures={measures}/>
            <Instructions instructions={instructions} />
        </div>
    )
}

export default Meal