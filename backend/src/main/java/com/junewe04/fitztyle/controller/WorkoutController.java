package com.junewe04.fitztyle.controller;

import com.junewe04.fitztyle.dto.WorkoutDTO;
import com.junewe04.fitztyle.model.Workout;
import com.junewe04.fitztyle.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/workouts/")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @GetMapping
    public ResponseEntity<List<WorkoutDTO>> getWorkouts() {

        return ResponseEntity.ok(workoutService.getWorkouts());
    }

    @PostMapping
    public ResponseEntity<?> createWorkout(@RequestBody WorkoutDTO workoutDTO) {
        try {

            ResponseEntity<?> response = workoutService.createWorkout(workoutDTO);

            System.out.println("createWorkout res body : " + response.getBody());

            if (response.getStatusCode() == HttpStatus.CREATED) {
                return ResponseEntity.status(HttpStatus.CREATED).body(response.getBody());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response.getBody());
            }


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update workout: " + e.getMessage());
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateWorkout(@PathVariable("id") String id, @RequestBody WorkoutDTO workoutDTO) {
        try {
            ResponseEntity<?> updatedWorkout = workoutService.updateWorkout(id, workoutDTO);
            if (updatedWorkout != null) {
                return ResponseEntity.ok(updatedWorkout);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update workout: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Workout> deleteWorkout(@PathVariable("id") String id) {
        Workout response = workoutService.deleteWorkout(id);
        return ResponseEntity.ok(response);
    }

}
