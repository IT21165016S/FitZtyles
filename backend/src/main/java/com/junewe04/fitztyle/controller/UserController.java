package com.junewe04.fitztyle.controller;

import com.junewe04.fitztyle.dto.ErrorDTO;
import com.junewe04.fitztyle.dto.LoginDTO;
import com.junewe04.fitztyle.dto.SignUpDTO;
import com.junewe04.fitztyle.dto.UserDTO;
import com.junewe04.fitztyle.model.User;
import com.junewe04.fitztyle.repository.UserRepository;
import com.junewe04.fitztyle.security.TokenGenerator;
import com.junewe04.fitztyle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users/")
public class UserController {

    @Autowired
    private UserDetailsManager userDetailsManager;

    @Autowired
    TokenGenerator tokenGenerator;

    @Autowired
    DaoAuthenticationProvider daoAuthenticationProvider;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody SignUpDTO signupDTO) {
        User user = new User(signupDTO.getUsername(), signupDTO.getPassword());

        Optional<User> checkExistingUser = userRepository.findByUsername(signupDTO.getUsername());

        if (checkExistingUser.isPresent()) {
            return ResponseEntity.status(400).body("Username already exists");
        } else {
            user.setProfileCreated(false);
            userDetailsManager.createUser(user);

            System.out.println(user);

            Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, signupDTO.getPassword(), Collections.EMPTY_LIST);

            return ResponseEntity.ok(tokenGenerator.createToken(authentication));
        }
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {

        try {

            Optional<User> existingUser = userRepository.findByUsername(loginDTO.getUsername());

            Authentication authentication = daoAuthenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(loginDTO.getUsername(), loginDTO.getPassword()));

            ResponseEntity<?> responseEntity = userService.updateActiveStatus(loginDTO.getUsername());

            return ResponseEntity.ok(tokenGenerator.createToken(authentication));

        } catch (Exception e) {

            ErrorDTO errorDTO = new ErrorDTO();
            errorDTO.setError("Username or password is incorrect");
            return ResponseEntity.status(400).body(errorDTO);
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("#user.id == #id")
    public ResponseEntity user(@AuthenticationPrincipal User user, @PathVariable String id) {
        return ResponseEntity.ok(userRepository.findById(id).orElseThrow());
    }

    @PutMapping()
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO) {

        try {
            Optional<User> user = userRepository.findByUsername(userDTO.getUsername());
            if(user.isPresent()) {
                User toBeUpdatedUser = user.get();

                toBeUpdatedUser.setFirstName(userDTO.getFirstName());
                toBeUpdatedUser.setLastName(userDTO.getLastName());
                toBeUpdatedUser.setGender(userDTO.getGender());
                toBeUpdatedUser.setProfileImage(userDTO.getProfileImage());
                toBeUpdatedUser.setBio(userDTO.getBio());
                toBeUpdatedUser.setProfileCreated(userDTO.isProfileCreated());

                return ResponseEntity.ok(userRepository.save(toBeUpdatedUser));
            } else {
               return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        try {
            Optional<User> user = userRepository.findById(id);
            if(user.isPresent()) {
                User toBeDeletedUser = user.get();
                userRepository.delete(toBeDeletedUser);
                return ResponseEntity.status(200).body("User deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PatchMapping("/{userId}/{friendId}")
    public ResponseEntity<?> addRemoveFriend(@PathVariable String userId, @PathVariable String friendId) {
        try {

            User currentUser = userRepository.findById(userId).get();

            User friendToBeNotToBe = userRepository.findById(friendId).get();

            if (currentUser.getFriends() != null && currentUser.getFriends().contains(friendId)) {
                currentUser.getFriends().remove(friendId);
                friendToBeNotToBe.getFriends().remove(userId);
            } else if (currentUser.getFriends() != null && friendToBeNotToBe.getFriends() != null) {
                currentUser.getFriends().add(friendId);
                friendToBeNotToBe.getFriends().add(userId);
            } else if (currentUser.getFriends() != null && friendToBeNotToBe.getFriends() == null) {
                currentUser.getFriends().add(friendId);
                List<String> friendNullFriends = new ArrayList<>();
                friendNullFriends.add(userId);
                friendToBeNotToBe.setFriends(friendNullFriends);
            } else if (currentUser.getFriends() == null && friendToBeNotToBe.getFriends() != null) {
                friendToBeNotToBe.getFriends().add(friendId);
                List<String> currentNullFriends = new ArrayList<>();
                currentNullFriends.add(userId);
                friendToBeNotToBe.setFriends(currentNullFriends);
            }

            if (currentUser.getFriends() == null) {
                List<String> currentUserFriends = new ArrayList<>();
                currentUserFriends.add(friendId);
                currentUser.setFriends(currentUserFriends);
            }

            if (friendToBeNotToBe.getFriends() == null) {
                List<String> friendToBeNotToBeFriends = new ArrayList<>();
                friendToBeNotToBeFriends.add(userId);
                friendToBeNotToBe.setFriends(friendToBeNotToBeFriends);
            }

            userRepository.save(currentUser);
            userRepository.save(friendToBeNotToBe);

            User updatedUser = userRepository.findById(userId).get();

            List<UserDTO> friends = new ArrayList<>();

            if (updatedUser.getFriends() != null) {
                for (String friend:updatedUser.getFriends()) {

                    UserDTO dto = new UserDTO();

                    User friendData = userRepository.findById(friend).get();

                    dto.setId(friendData.getId());
                    dto.setUsername(friendData.getUsername());
                    dto.setProfileImage(friendData.getProfileImage());
                    dto.setBio(friendData.getBio());
                    dto.setGender(friendData.getGender());
                    dto.setFirstName(friendData.getFirstName());
                    dto.setLastName(friendData.getLastName());

                    friends.add(dto);
                }
            }

            return new ResponseEntity<>(friends, HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}/friends")
    public ResponseEntity<?> getUserFriends(@PathVariable String userId) {

        try {

            User user = userRepository.findById(userId).get();

            List<UserDTO> friends = new ArrayList<>();

            if (user.getFriends() != null) {
                for (String friend:user.getFriends()) {

                    UserDTO dto = new UserDTO();

                    User friendData = userRepository.findById(friend).get();

                    dto.setId(friendData.getId());
                    dto.setUsername(friendData.getUsername());
                    dto.setProfileImage(friendData.getProfileImage());
                    dto.setBio(friendData.getBio());
                    dto.setGender(friendData.getGender());
                    dto.setFirstName(friendData.getFirstName());
                    dto.setLastName(friendData.getLastName());

                    friends.add(dto);
                }
            }

            return new ResponseEntity<>(friends, HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
