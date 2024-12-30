package com.junewe04.fitztyle.service;

import com.junewe04.fitztyle.dto.WorkoutDTO;
import com.junewe04.fitztyle.model.Workout;
import com.junewe04.fitztyle.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    public List<WorkoutDTO> getWorkouts() {
        List<Workout> workouts = workoutRepository.findAll();

        List<WorkoutDTO> workoutDTOList = new ArrayList<>();

        for (Workout workout : workouts) {
            WorkoutDTO workoutDTO = new WorkoutDTO();
            workoutDTO.setId(workout.getId());
            workoutDTO.setUserId(workout.getUserId());
            workoutDTO.setWorkoutName(workout.getWorkoutName());
            workoutDTO.setDifficulty(workout.getDifficulty());
            workoutDTO.setDays(workout.getDays());
            workoutDTO.setPostImage(workout.getPostImage());
            workoutDTO.setUserPhoto(workout.getUserPhoto());
            workoutDTO.setActivity(workout.getActivity());

            workoutDTOList.add(workoutDTO);
        }

        return workoutDTOList;
    }

    public ResponseEntity<?> createWorkout(WorkoutDTO workoutDTO) {
        try {

            Workout workout = new Workout();

            workout.setUserId(workoutDTO.getUserId());
            workout.setWorkoutName(workoutDTO.getWorkoutName());
            workout.setDifficulty(workoutDTO.getDifficulty());
            workout.setDays(workoutDTO.getDays());
            workout.setPostImage(workoutDTO.getPostImage());
            workout.setActivity(workoutDTO.getActivity());
            workout.setUserPhoto(workoutDTO.getUserPhoto());

            Workout result = workoutRepository.save(workout);

            System.out.println("createWorkout : " + result);

            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("createWorkout error : " + e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<?> updateWorkout(String id, WorkoutDTO workoutDTO) {

        Optional<Workout> workout = workoutRepository.findById(id);

        if (workout.isPresent()) {

            Workout tobeUpdatedWorkout = workout.get();

            tobeUpdatedWorkout.setUserId(workoutDTO.getUserId());
            tobeUpdatedWorkout.setWorkoutName(workoutDTO.getWorkoutName());
            tobeUpdatedWorkout.setDifficulty(workoutDTO.getDifficulty());
            tobeUpdatedWorkout.setDays(workoutDTO.getDays());
            tobeUpdatedWorkout.setPostImage(workoutDTO.getPostImage());
            tobeUpdatedWorkout.setActivity(workoutDTO.getActivity());

            Workout res = workoutRepository.save(tobeUpdatedWorkout);

            System.out.println("updateWorkout : " + res);

            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public Workout deleteWorkout(String id) {

        Optional<Workout> workout = workoutRepository.findById(id);

        if (workout.isPresent()) {

            Workout tobeDeletedWorkout = workout.get();

            workoutRepository.delete(tobeDeletedWorkout);

            return tobeDeletedWorkout;
        } else {
            return null;
        }

    }

}
