package com.junewe04.fitztyle.controller;

import com.junewe04.fitztyle.model.Post;
import com.junewe04.fitztyle.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

//     @GetMapping
//     public ResponseEntity getPosts() {
//         return postService.getPosts();
//     }

// }

//@PostMapping
//    public ResponseEntity<?> savePost(@RequestBody Post post){
//        return postService.savePost(post);
//    }

    @PostMapping("/savepost")
    public ResponseEntity<?> savePost(@RequestParam("caption") String caption,
                                      @RequestParam("images") List<MultipartFile> images) {
        return postService.savePost1(caption,images);
    }
    @GetMapping("/allposts")
    public ResponseEntity<?> getPosts(){
        return postService.getPosts();
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getPostsByUserId(@PathVariable String id){
        return postService.getPostsByUserId(id);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable String id){
        return postService.getPostById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePostById(@PathVariable String id, @RequestBody Post post){
        return  postService.updatePostById(id,post);
    }
    @PutMapping("/like/{id}")
    public ResponseEntity<?> likePostById(@PathVariable String id, @RequestBody Post post){
        return  postService.likePostById(id,post);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePostById(@PathVariable String id){
        return postService.deletePostById(id);
    }
}