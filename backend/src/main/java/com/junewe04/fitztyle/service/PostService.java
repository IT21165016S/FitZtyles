package com.junewe04.fitztyle.service;

import com.junewe04.fitztyle.dto.CommentDTO;
import com.junewe04.fitztyle.dto.PostDTO;
import com.junewe04.fitztyle.model.Post;
import com.junewe04.fitztyle.model.Comment;
import com.junewe04.fitztyle.repository.CommentRepository;
import com.junewe04.fitztyle.repository.PostRepository;
import com.junewe04.fitztyle.repository.UserRepository;
import com.junewe04.fitztyle.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.midi.Sequence;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoOperations mongoOperations;

    public ResponseEntity<?> getPostById(String id){
        Optional<Post> optionalPost  =  postRepository.findById(id);
        List<PostDTO> postDTOList = new ArrayList<>();
        Optional<User> user = null;
        int count =0;
        try {
            if (optionalPost.isPresent()) {
                Post post = optionalPost.get();
                PostDTO postDTO = new PostDTO();
                postDTO.setId(post.getId());
                postDTO.setCaption(post.getCaption());
                postDTO.setImgLink(post.getImgLink());
                postDTO.setUpdatedAt(post.getUpdatedAt());
                postDTO.setCreatedAt(post.getCreatedAt());

                for (Object like: post.getLikedby()) {
                    count ++;
                    // Perform operation like count
                }

                System.out.println("---------ssssssss----------"+post.getLikeCount());
                postDTO.setLikeCount(post.getLikeCount());
                postDTO.setUserId(post.getUserId());

                System.out.println("--------------------------------------------"+post.getId());
                try {
                    user =  userRepository.findById(post.getUserId());

                    if(user.isPresent()) {
                        postDTO.setUsername(user.get().getUsername());
                        //postDTO.setProfileImage(user.get().getProfileImage());
                    }

                } catch (Exception e){
                    System.out.println("No posts found for userid "+ post.getUserId());
                }

                try {
                    List<Comment> comments = commentRepository.findByPostId(post.getId());
                    if(comments.size() > 0){
                        List<CommentDTO> commentDTOList = new ArrayList<>();

                        for(Comment comment: comments){
                            CommentDTO commentDTO = new CommentDTO();
                            commentDTO.setId(comment.getId());
                            commentDTO.setText(comment.getText());
                            commentDTO.setPostId(comment.getPostId());
                            commentDTO.setCreatedAt(comment.getCreatedAt());
                            commentDTO.setUpdatedAt(comment.getUpdatedAt());
                            commentDTO.setUserId(comment.getUserId());
                            Optional<User> commentedUser =  userRepository.findById(comment.getUserId());
                            if(commentedUser.isPresent()) {
                                commentDTO.setUsername(commentedUser.get().getUsername());
                                //commentDTO.setProfileImage(commentedUser.get().getProfileImage());
                            }
                            if(commentedUser.isPresent()) {
                                commentDTOList.add(commentDTO);
                            }

                        }

                        postDTO.setComments(commentDTOList);
                    }
                    if(user.isPresent()) {
                        postDTOList.add(postDTO);
                    }
                } catch (Exception e) {
                    System.out.println(""+ e);
                }
            }
        } catch (Exception e){
            return new ResponseEntity<>("No Post Found",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(postDTOList, HttpStatus.OK);
    }
    public ResponseEntity<?> getPosts(){
        List<Post> posts = new ArrayList<>();
        List<PostDTO> postDTOList = new ArrayList<>();
        Optional<User> user = null;
        int count =0;

        try {
            posts = postRepository.findAll();

            for (Post post:posts) {
                PostDTO postDTO = new PostDTO();
                postDTO.setId(post.getId());
                postDTO.setUserId(post.getUserId());
                postDTO.setUsername(post.getUsername());
                postDTO.setCaption(post.getCaption());
                postDTO.setImgLink(post.getImgLink());
                postDTO.setUpdatedAt(post.getUpdatedAt());
                postDTO.setCreatedAt(post.getCreatedAt());

//                if(post.getLikedby() != null){
//                    for (Object like: post.getLikedby()) {
//                        count ++;
//                        // Perform operation on like count
//                    }
//                    postDTO.setLikeCount(count);
//                } else {
//                    postDTO.setLikeCount(0);
//                }
                System.out.println("---------ddddddd----------"+post.getLikeCount());
                postDTO.setLikeCount(post.getLikeCount());
                postDTO.setUserId(post.getUserId());

                System.out.println("--------------------------------------------"+post.getId());
                try {
                    user =  userRepository.findById(post.getUserId());

                    if(user.isPresent()) {
                        postDTO.setUsername(user.get().getUsername());
                        //postDTO.setProfileImage(user.get().getProfileImage());
                    }

                } catch (Exception e){
                    System.out.println("No posts found for userid "+ post.getUserId());
                }

                try {
                    List<Comment> comments = commentRepository.findByPostId(post.getId());
                    if(comments.size() > 0){
                        List<CommentDTO> commentDTOList = new ArrayList<>();

                        for(Comment comment: comments){
                            CommentDTO commentDTO = new CommentDTO();
                            commentDTO.setId(comment.getId());
                            commentDTO.setText(comment.getText());
                            commentDTO.setPostId(comment.getPostId());
                            commentDTO.setCreatedAt(comment.getCreatedAt());
                            commentDTO.setUpdatedAt(comment.getUpdatedAt());
                            commentDTO.setUserId(comment.getUserId());
                            Optional<User> commentedUser =  userRepository.findById(comment.getUserId());
                            if(commentedUser.isPresent()) {
                                commentDTO.setUsername(commentedUser.get().getUsername());
                                //commentDTO.setProfileImage(commentedUser.get().getProfileImage());
                            }
                            if(commentedUser.isPresent()) {
                                commentDTOList.add(commentDTO);
                            }

                        }

                        postDTO.setComments(commentDTOList);
                    }
                    if(user.isPresent()) {
                        postDTOList.add(postDTO);
                    }
                } catch (Exception e) {
                    System.out.println(""+ e);
                }
            }

        } catch (Exception e) {
            System.out.println(e);
        }


        return new ResponseEntity<List<PostDTO>>(postDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> getPostsByUserId(String userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        List<PostDTO> postDTOList = new ArrayList<>();
        int count =0;


        for (Post post:posts) {
            PostDTO postDTO = new PostDTO();
            postDTO.setId(post.getId());
            postDTO.setCaption(post.getCaption());
            postDTO.setImgLink(post.getImgLink());
            postDTO.setUpdatedAt(post.getUpdatedAt());
            postDTO.setCreatedAt(post.getCreatedAt());

//            for (Object like: post.getLikedby()) {
//                count ++;
//                // Perform operation like count
//            }

            //postDTO.setLikeCount(count);
            System.out.println("---------------------------"+post.getLikeCount());
            postDTO.setLikeCount(post.getLikeCount());
            postDTO.setUserId(post.getUserId());

            Optional<User> user =  userRepository.findById(post.getUserId());
            if(user.isPresent()) {
                postDTO.setUsername(user.get().getUsername());
                //postDTO.setProfileImage(user.get().getProfileImage());
            }

            List<Comment> comments = commentRepository.findByPostId(post.getId());
            if(comments.size() > 0){
                List<CommentDTO> commentDTOList = new ArrayList<>();

                for(Comment comment: comments){
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setId(comment.getId());
                    commentDTO.setText(comment.getText());
                    commentDTO.setPostId(comment.getPostId());
                    commentDTO.setCreatedAt(comment.getCreatedAt());
                    commentDTO.setUpdatedAt(comment.getUpdatedAt());
                    commentDTO.setUserId(comment.getUserId());
                    Optional<User> commentedUser =  userRepository.findById(comment.getUserId());
                    if(commentedUser.isPresent()) {
                        commentDTO.setUsername(commentedUser.get().getUsername());
                        //commentDTO.setProfileImage(commentedUser.get().getProfileImage());
                    }
                    if(commentedUser.isPresent()) {
                        commentDTOList.add(commentDTO);
                    }

                }

                postDTO.setComments(commentDTOList);
            }
            if(user.isPresent()) {
                postDTOList.add(postDTO);
            }

        }

        return new ResponseEntity<List<PostDTO>>(postDTOList, HttpStatus.OK);
    }

    public static String generateRandomUserId() {
        UUID uuid = UUID.randomUUID();
        // Remove hyphens and convert to lowercase to create a more user-friendly ID
        return uuid.toString().replaceAll("-", "").toLowerCase();
    }

    public ResponseEntity<?> updatePostById(String id,Post post){
        try {
            Optional<Post> existingPostOptional = postRepository.findById(id);
            if (existingPostOptional.isPresent()) {
                Post existingPost = existingPostOptional.get();
                if (post.getCaption() != null) {
                    existingPost.setCaption(post.getCaption());
                }
                if (post.getImgLink() == null) {
                    existingPost.setImgLink(post.getImgLink());
                }
                if(post.getLikedby() !=null){
                    existingPost.setLikedby(post.getLikedby());
                }

                System.out.println("--------------------------------------"+post.getLikeCount());
                System.out.println("--------------------------------------"+existingPost.getLikeCount());

//                if(post.getLikeCount() == 0){
//                    existingPost.setLikeCount(existingPost.getLikeCount() + 1);
//                }
                existingPost.setLikeCount(post.getLikeCount());

                existingPost.setUpdatedAt(new Date(System.currentTimeMillis()));
                Post updatedPost = postRepository.save(existingPost);
                return new ResponseEntity<>(updatedPost, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating post: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public ResponseEntity<?> likePostById(String id,Post post){
        Optional<Post> existingPost =  postRepository.findById(id);
        if(existingPost.isPresent()){
            Post updatePost = existingPost.get();
            if(post.getLikedby() != null) {
                updatePost.setLikedby(post.getLikedby());
            }
            return new ResponseEntity<>(postRepository.save(updatePost), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Post Update Error",HttpStatus.NOT_FOUND);
        }
    }
    public ResponseEntity<?> deletePostById(String id){
        try{
            postRepository.deleteById(id);
            return new ResponseEntity<>("Success deleted with " + id,HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> savePost1(String caption, List<MultipartFile> images) {
        try {
            List<User> activeUser = userRepository.findActiveUsernames(1);
            Post post = new Post();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            for(User user: activeUser){
                post.setUserId(String.valueOf(activeUser.get(0).getId()));
                post.setUsername(String.valueOf(activeUser.get(0).getUsername()));
            }
            post.setId(generateRandomUserId());
            post.setCaption(caption);
            // Create a new Post object
            post.setCreatedAt(new java.sql.Date(System.currentTimeMillis()));
            post.setUpdatedAt(new java.sql.Date(System.currentTimeMillis()));

            // Convert MultipartFile objects to byte arrays and add them to the imgLink list
            for (MultipartFile image : images) {
                post.getImgLink().add(image.getBytes());
            }

            // Save the post
            Post savedPost = postRepository.save(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}

