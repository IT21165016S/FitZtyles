package com.junewe04.fitztyle.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Getter
@Setter
public class WorkoutDTO {

    private String id;
    private String userId;
    private String workoutName;
    private String difficulty;
    private String days;
    private String postImage;
    private String userPhoto;
    private List<?> activity;

}
