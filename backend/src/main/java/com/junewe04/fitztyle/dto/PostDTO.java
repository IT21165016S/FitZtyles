package com.junewe04.fitztyle.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class PostDTO {

    private String id;
    private String media;
    private String caption;
    private Date createdAt;
    private Date updatedAt;
    private List<Object> likedby;
    private List<CommentDTO> comments;
    private List<byte[]> imgLink = new ArrayList<>(); // Initialize imgLink to an empty ArrayList
    private String profileImage;
    private String userId;
    private String username;
    private int likeCount;
}
