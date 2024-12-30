package com.junewe04.fitztyle.service;

import com.junewe04.fitztyle.model.User;
import com.junewe04.fitztyle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.text.MessageFormat;
import java.util.Optional;

@Service
public class UserService implements UserDetailsManager {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void createUser(UserDetails user) {
        ((User) user).setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save((User) user);
    }

    @Override
    public void updateUser(UserDetails user) {

    }

    @Override
    public void deleteUser(String username) {

    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {

    }

    @Override
    public boolean userExists(String username) {
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(MessageFormat.format("username {0} not found", username)));
    }

    public ResponseEntity<?> updateActiveStatus(String username) {
        Optional<User> existingUser =  userRepository.findByUsername(username);
        if(existingUser.isPresent()){
            User updateUser = existingUser.get();
            updateUser.setActstatus(1);
            return new ResponseEntity<>(userRepository.save(updateUser), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Comment Update Error",HttpStatus.NOT_FOUND);
        }
    }
}
