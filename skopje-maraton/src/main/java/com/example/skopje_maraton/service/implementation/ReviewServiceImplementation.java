package com.example.skopje_maraton.service.implementation;

import com.example.skopje_maraton.model.Review;
import com.example.skopje_maraton.repository.ReviewRepository;
import com.example.skopje_maraton.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImplementation implements ReviewService {
    private final ReviewRepository reviewRepository;
    public ReviewServiceImplementation(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Review create(Review review) {
        return reviewRepository.save(review);
    }
}