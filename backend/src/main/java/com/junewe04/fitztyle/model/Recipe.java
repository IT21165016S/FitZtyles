package com.junewe04.fitztyle.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Recipe {
    @Id
    private String id;

    @NonNull
    private String userId;

    @NonNull
    private String title;

    @NonNull
    private String description;

    @NonNull
    private String ingredients;

    @NonNull
    private String instructions;

    @NonNull
    private String image;

    @NonNull
    private String category;
}
