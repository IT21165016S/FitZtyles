import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getUserRecipes } from "../../store/actions/recipe.action";
import RecipeWidget from "./RecipeWidget";

const RecipesWidget = ({ category, userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipe.recipes);
  const token = localStorage.getItem("Authorization");

  // const getUserPosts = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/posts/${userId}/posts`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  // };

  useEffect(() => {
    if (userId) {
      dispatch(getUserRecipes(userId));
    } else {
      dispatch(getRecipes(category));
    }
  }, []);

  return (
    <>
      {recipes.map(
        ({
          id,
          userId,
          username,
          userImage,
          title,
          image,
          description,
          ingredients,
          // likes,
          // comments,
        }) => (
          <RecipeWidget
            key={id}
            recipeId={id}
            recipeUserId={userId}
            name={username}
            userImage={userImage}
            title={title}
            image={image}
            description={description}
            ingredients={ingredients}
            // likes={likes}
            // comments={comments}
          />
        )
      )}
    </>
  );
};

export default RecipesWidget;
