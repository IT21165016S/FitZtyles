package com.junewe04.fitztyle.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentDTO {
    private String id;
    private String text;
    private String userId;
    private String username;
    private String profileImage;
    private String postId;
    private Date createdAt;
    private Date updatedAt;
}
