package com.example.modules.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "SELECT * FROM review WHERE user_id = ?1", nativeQuery = true)
    Optional<Review> getReviewByUserId(Long userId);
}
