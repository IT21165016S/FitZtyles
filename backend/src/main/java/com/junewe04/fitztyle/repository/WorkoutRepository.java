package com.junewe04.fitztyle.repository;

import com.junewe04.fitztyle.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepository extends MongoRepository<Workout, String> {

}
