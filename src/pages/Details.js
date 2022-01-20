import React from "react";
import { useSelector } from "react-redux";

export const Details = () => {
    const details = useSelector(store => store.peopleDetails)
    console.log('details', details);
    if (details.loading) {
        return <div>Loading ...</div>
    }
    const { name, birth_year, skin_color, mass} = details.data
    return (
        <div>
            <h1>{name}</h1>
            <h4>{birth_year}</h4>
            <p>Skin: {skin_color}</p>
            <p>Mass: { mass }</p>
        </div>
    )
}