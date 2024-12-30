package com.junewe04.fitztyle.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "workouts")
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Workout {

    @Id
    private String id;

    @NonNull
    private String userId;

    @NonNull
    private String workoutName;

    @NonNull
    private String difficulty;

    @NonNull
    private String days;

    @NonNull
    private String postImage;
    

    private String userPhoto;

    @NonNull
    private List<?> activity;
}
