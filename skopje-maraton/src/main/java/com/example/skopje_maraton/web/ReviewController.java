package com.example.skopje_maraton.web;

import com.example.skopje_maraton.model.Review;
import com.example.skopje_maraton.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<Review>> findAll(){
        List<Review> reviews = reviewService.findAll();
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    public ResponseEntity<Review> create(@RequestBody Review review){
//        @RequestHeader Authorization String jwt
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User currentUser = (User) authentication.getPrincipal();
//        boolean isTokenValid = jwtService.isTokenValid(jwt, currentUser);
//        if (!isTokenValid) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//        }
        Review createdReview = reviewService.create(review);
        return ResponseEntity.ok(createdReview);
    }
}