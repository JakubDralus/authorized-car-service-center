package com.example.modules.review.web;

import com.example.modules.auth.JwtService;
import com.example.modules.review.ReviewService;
import com.example.shared.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public List<ReviewDTO> getAll(){
        return reviewService.getAll();
    }

    @GetMapping("/{reviewId}")
    public ApiResponse<ReviewDTO> get(@PathVariable Long reviewId) {
        ReviewDTO reviewDTO = reviewService.get(reviewId);
        return ApiResponse.<ReviewDTO>builder()
                .message("Review fetched.")
                .data(reviewDTO)
                .build();
    }

    @PostMapping
    public ApiResponse<ReviewDTO> create(@RequestBody ReviewDTO reviewDTO) {
        ReviewDTO created = reviewService.create(reviewDTO);
        return ApiResponse.<ReviewDTO>builder()
                .message("Review created.")
                .data(created)
                .build();
    }

    @PutMapping
    public ApiResponse<ReviewDTO> update(@RequestBody ReviewDTO reviewDTO) {
        ReviewDTO updated = reviewService.update(reviewDTO);
        return ApiResponse.<ReviewDTO>builder()
                .message("Review created.")
                .data(updated)
                .build();
    }

    @DeleteMapping("{reviewId}")
    public ApiResponse<ReviewDTO> delete(@PathVariable Long reviewId) {
        reviewService.delete(reviewId);
        return ApiResponse.<ReviewDTO>builder()
                .message("Review deleted.")
                .build();
    }


    //user review

    @GetMapping("/user-review")
    public ApiResponse<ReviewReadDTO> getUserReview(@RequestHeader("Authorization") String token) {
        ReviewReadDTO dto = reviewService.getReviewByToken(token);
        return ApiResponse.<ReviewReadDTO>builder()
                .message("Review fetched.")
                .data(dto)
                .build();
    }

    @PostMapping("/user-review")
    public ApiResponse<ReviewReadDTO> createUserReview(@RequestHeader("Authorization") String token, @RequestBody ReviewCreateDto reviewCreateDto) {
        ReviewReadDTO dto = reviewService.createUserReview(token, reviewCreateDto);
        return ApiResponse.<ReviewReadDTO>builder()
                .message("Review created.")
                .data(dto)
                .build();
    }

    @PutMapping("/user-review")
    public ApiResponse<ReviewReadDTO> updateUserReview(@RequestHeader("Authorization") String token, @RequestBody ReviewCreateDto reviewUpdateDto) {
        ReviewReadDTO dto = reviewService.updateUserReview(token, reviewUpdateDto);
        return ApiResponse.<ReviewReadDTO>builder()
                .message("Review updated.")
                .data(dto)
                .build();
    }
}
