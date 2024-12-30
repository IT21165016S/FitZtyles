package com.junewe04.fitztyle.repository;

import com.junewe04.fitztyle.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findAll();
    List<Post> findByUserId(String userId);
}
