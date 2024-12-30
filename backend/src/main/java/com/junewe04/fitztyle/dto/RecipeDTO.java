package com.junewe04.fitztyle.dto;

import lombok.Data;

@Data
public class RecipeDTO {
    private String id;
    private String userId;
    private String username;
    private String userImage;
    private String title;
    private String description;
    private String ingredients;
    private String instructions;
    private String image;
    private String category;
}
