package com.example.skopje_maraton.service;

import com.example.skopje_maraton.model.Review;

import java.util.List;

public interface ReviewService {
    List<Review> findAll();
    Review create(Review review);
}