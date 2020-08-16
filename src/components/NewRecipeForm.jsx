import React, {useState} from "react"
// code in this section based on example from here : https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs
function NewRecipeForm() {
    const [ingredients, setIngredients] = useState([{ ingredient: "", amount: "" }])

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...ingredients];
        list[index][name] = value;
        setIngredients(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...ingredients];
        list.splice(index, 1);
        setIngredients(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setIngredients([...ingredients, { ingredient: "", amount: "" }]);
    };

    return(
        <div>
            <h3>Input Ingredients</h3>
            {ingredients.map((x, i)=> {
                return(
                    <div className="box">
                        <input
                            name="ingredient"
                            placeholder="Enter ingredient"
                            value={x.ingredient}
                            onChange={e => handleInputChange(e,i)}
                        />
                        <input
                            name="amount"
                            placeholder="Enter amount"
                            value={x.amount}
                            onChange={e => handleInputChange(e,i)}
                        />
                        <div className="btn-box">
                            {ingredients.length !== 1 && <button className="mr10"
                            onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {ingredients.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default NewRecipeForm