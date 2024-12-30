package com.junewe04.fitztyle.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String id;
    private String userId;
    private String username;
    private List<byte[]> imgLink = new ArrayList<>(); // Initialize imgLink to an empty ArrayList
    private String caption;
    private List<Object> likedby;
    private Date createdAt;
    private Date updatedAt;
    private int likeCount;
}
