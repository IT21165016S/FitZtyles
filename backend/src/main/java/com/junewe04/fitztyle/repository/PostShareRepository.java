package com.junewe04.fitztyle.repository;

import com.junewe04.fitztyle.model.PostShare;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostShareRepository extends MongoRepository<PostShare, String> {
    List<PostShare> findByUserId(String userId);
}
