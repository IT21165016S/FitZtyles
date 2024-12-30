package com.junewe04.fitztyle.model;

import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Document(collection = "users")
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    private String id;

    @NonNull
    private String username;

    @NonNull
    private String password;

    private String profileImage;
    private String firstName;
    private String lastName;
    private String bio;
    private String gender;
    private boolean isProfileCreated;
    private List<String> friends;


    private int actstatus;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.EMPTY_LIST;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
