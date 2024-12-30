package com.junewe04.fitztyle.service;

import com.junewe04.fitztyle.dto.RecipeDTO;
import com.junewe04.fitztyle.model.Recipe;
import com.junewe04.fitztyle.model.User;
import com.junewe04.fitztyle.repository.RecipeRepository;
import com.junewe04.fitztyle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getRecipes(String category) {
        List<Recipe> recipes= recipeRepository.findAllByCategory(category);

        List<RecipeDTO> recipeDTOList = new ArrayList<>();

        for (Recipe recipe:recipes) {
            RecipeDTO recipeDTO = new RecipeDTO();
            recipeDTO.setUserId(recipe.getUserId());

            // getting the username of the poster
            User user = userRepository.findById(recipe.getUserId()).get();

            recipeDTO.setUsername(user.getUsername());
            recipeDTO.setUserImage(user.getProfileImage());
            recipeDTO.setTitle(recipe.getTitle());
            recipeDTO.setDescription(recipe.getDescription());
            recipeDTO.setIngredients(recipe.getIngredients());
            recipeDTO.setImage(recipe.getImage());
            recipeDTO.setId(recipe.getId());

            recipeDTOList.add(recipeDTO);
        }

        return new ResponseEntity<>(recipeDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> getUserRecipes(String userId) {
        List<Recipe> recipes = recipeRepository.findAllByUserId(userId);

        List<RecipeDTO> recipeDTOList = new ArrayList<>();

        for (Recipe recipe:recipes) {
            RecipeDTO recipeDTO = new RecipeDTO();
            recipeDTO.setUserId(recipe.getUserId());

            // getting the username of the poster
            User user = userRepository.findById(recipe.getUserId()).get();

            recipeDTO.setUsername(user.getUsername());
            recipeDTO.setUserImage(user.getProfileImage());
            recipeDTO.setTitle(recipe.getTitle());
            recipeDTO.setDescription(recipe.getDescription());
            recipeDTO.setIngredients(recipe.getIngredients());
            recipeDTO.setImage(recipe.getImage());
            recipeDTO.setId(recipe.getId());

            recipeDTOList.add(recipeDTO);
        }

        return new ResponseEntity<>(recipeDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> createRecipe(RecipeDTO recipeDTO) {

        Recipe recipe = new Recipe();

        recipe.setUserId(recipeDTO.getUserId());
        recipe.setTitle(recipeDTO.getTitle());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setIngredients(recipeDTO.getIngredients());
        recipe.setImage(recipeDTO.getImage());
        recipe.setCategory(recipeDTO.getCategory());

        Recipe savedRecipe = recipeRepository.save(recipe);

        RecipeDTO savedRecipeDTO = new RecipeDTO();

        savedRecipeDTO.setUserId(savedRecipe.getUserId());

        // getting the username of the poster
        User user = userRepository.findById(savedRecipe.getUserId()).get();

        savedRecipeDTO.setUsername(user.getUsername());
        savedRecipeDTO.setUserImage(user.getProfileImage());
        savedRecipeDTO.setTitle(savedRecipe.getTitle());
        savedRecipeDTO.setDescription(savedRecipe.getDescription());
        savedRecipeDTO.setIngredients(savedRecipe.getIngredients());
        savedRecipeDTO.setId(savedRecipe.getId());
        savedRecipeDTO.setImage(savedRecipe.getImage());

        return new ResponseEntity<>(savedRecipeDTO, HttpStatus.CREATED);
    }

    public ResponseEntity<?> updateRecipe(RecipeDTO recipeDTO) {

        Optional<Recipe> recipe = recipeRepository.findById(recipeDTO.getId());

        if (recipe.isPresent()) {

            Recipe tobeUpdatedRecipe = recipe.get();
            tobeUpdatedRecipe.setTitle(recipeDTO.getTitle());
            tobeUpdatedRecipe.setUserId(recipeDTO.getUserId());
            tobeUpdatedRecipe.setDescription(recipeDTO.getDescription());
            tobeUpdatedRecipe.setIngredients(recipeDTO.getIngredients());
//            tobeUpdatedRecipe.setInstructions(recipeDTO.getInstructions());
//            tobeUpdatedRecipe.setImage(recipeDTO.getImage());
//            tobeUpdatedRecipe.setCategory(recipeDTO.getCategory());

            Recipe updatedRecipe = recipeRepository.save(tobeUpdatedRecipe);

            RecipeDTO updatedRecipeDTO = new RecipeDTO();

            updatedRecipeDTO.setUserId(updatedRecipe.getUserId());

            // getting the username of the poster
            User user = userRepository.findById(updatedRecipe.getUserId()).get();

            updatedRecipeDTO.setUsername(user.getUsername());
            updatedRecipeDTO.setUserImage(user.getProfileImage());
            updatedRecipeDTO.setTitle(updatedRecipe.getTitle());
            updatedRecipeDTO.setDescription(updatedRecipe.getDescription());
            updatedRecipeDTO.setIngredients(updatedRecipe.getIngredients());
            updatedRecipeDTO.setId(updatedRecipe.getId());
            updatedRecipeDTO.setImage(updatedRecipe.getImage());

            return new ResponseEntity<>(updatedRecipeDTO, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    public ResponseEntity<?> deleteRecipe(String id) {

        Optional<Recipe> recipe = recipeRepository.findById(id);

        if (recipe.isPresent()) {
            Recipe tobeDeletedRecipe = recipe.get();

            recipeRepository.delete(tobeDeletedRecipe);

            return new ResponseEntity<>(recipe, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
