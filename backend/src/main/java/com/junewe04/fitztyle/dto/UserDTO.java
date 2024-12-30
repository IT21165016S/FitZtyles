package com.junewe04.fitztyle.dto;

import com.junewe04.fitztyle.model.User;
import lombok.Builder;
import lombok.Data;

@Data
public class UserDTO {

    private String id;
    private String username;
    private String profileImage;
    private String firstName;
    private String lastName;
    private String bio;
    private String gender;
    private boolean isProfileCreated;
}
