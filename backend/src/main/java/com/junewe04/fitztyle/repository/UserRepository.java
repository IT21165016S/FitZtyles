package com.junewe04.fitztyle.repository;

import com.junewe04.fitztyle.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);

    @Query(value = "{ 'actstatus' : ?0 }", fields = "{ 'username': 1 }")
    List<User> findActiveUsernames(int actStatus);
}
