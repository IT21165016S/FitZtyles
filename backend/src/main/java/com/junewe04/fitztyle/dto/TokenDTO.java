package com.junewe04.fitztyle.dto;

import com.junewe04.fitztyle.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TokenDTO {

    private String userId;
    private User user;
    private String accessToken;
    private String refreshToken;
}
