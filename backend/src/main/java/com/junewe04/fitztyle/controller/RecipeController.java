package com.junewe04.fitztyle.controller;

import com.junewe04.fitztyle.dto.RecipeDTO;
import com.junewe04.fitztyle.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/recipes/")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/{category}")
    public ResponseEntity getRecipes(@PathVariable String category) {
        return recipeService.getRecipes(category);
    }

    @PostMapping
    public ResponseEntity createRecipe(@RequestBody RecipeDTO recipeDTO) {
        return recipeService.createRecipe(recipeDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRecipe(@PathVariable String id) {
        return recipeService.deleteRecipe(id);
    }

    @PutMapping
    public ResponseEntity updateRecipe(@RequestBody RecipeDTO recipeDTO) {

        return recipeService.updateRecipe(recipeDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity getUserRecipes(@PathVariable String userId) {
        return recipeService.getUserRecipes(userId);
    }
}
