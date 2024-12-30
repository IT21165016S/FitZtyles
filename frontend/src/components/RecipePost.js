import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../store/actions/recipe.action";

const RecipePost = () => {
  const dispatch = useDispatch();
  const recipesData = useSelector((state) => state.recipe);
  const [recipeData, setRecipeData] = useState({
    id: "",
    title: "",
    description: "",
    ingredients: "",
    image: "",
    category: "Breakfast",
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...recipeData, userId: user.user.id };
    dispatch(createRecipe(data));
    resetForm();
  };

  const handleUpdate = (recipe) => {
    setRecipeData(recipe);
  };

  const handleDelete = (recipe_id) => {
    console.log("comes here");
    dispatch(deleteRecipe(recipe_id));
  };

  const resetForm = () => {
    setRecipeData({
      id: "",
      title: "",
      description: "",
      ingredients: "",
      image: "",
      category: "Breakfast",
    });
  };

  return (
    <div>
      <div className="container-recipepost">
        <div className="card-body-recipee">
          <form onSubmit={handleSubmit}>
            <h1 className="mt-2">Add new recipe</h1>
            <div className="form-label">
              <label className="form-title">Recipe Title</label>
              <input
                type="text"
                className="form-control"
                value={recipeData.title}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, title: e.target.value })
                }
              />
            </div>
            <div className="form-label">
              <label className="form-title">Recipe Category</label>
              <select
                className="form-select"
                value={recipeData.category}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, category: e.target.value })
                }
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Fresh Fruits">Fresh Fruits</option>
                <option value="Healthy Drinks">Healthy Drinks</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="form-label">
              <label className="form-title">Recipe Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={recipeData.description}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="form-label">
              <label className="form-title">Recipe Ingredients</label>
              <textarea
                className="form-control"
                rows="3"
                value={recipeData.ingredients}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, ingredients: e.target.value })
                }
              ></textarea>
            </div>
            <div className="form-label">
              <label className="form-title">Recipe Image</label>
              <input
                type="file"
                className="form-control"
                value={recipeData.image}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, image: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-success">
              {recipeData.id ? "UPDATE RECIPE" : "CREATE RECIPE"}
            </button>
            {recipeData.id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={resetForm}
              >
                CANCEL UPDATE
              </button>
            )}
          </form>
          <div>
            {recipesData.recipes &&
              recipesData.recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="card-body-recipee"
                  style={{ border: "1px solid black", margin: "10px" }}
                >
                  <h3>{recipe.title}</h3>
                  <br />
                  <button onClick={() => handleUpdate(recipe)}>UPDATE</button>
                  <button onClick={() => handleDelete(recipe.id)}>
                    DELETE
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePost;
