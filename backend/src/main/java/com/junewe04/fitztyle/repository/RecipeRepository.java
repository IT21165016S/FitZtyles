package com.junewe04.fitztyle.repository;

import org.springframework.stereotype.Repository;
import com.junewe04.fitztyle.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Repository
public interface RecipeRepository extends org.springframework.data.mongodb.repository.MongoRepository<com.junewe04.fitztyle.model.Recipe, java.lang.String> {
    List<Recipe> findAllByCategory(String category);
    List<Recipe> findAllByUserId(String userId);
}
