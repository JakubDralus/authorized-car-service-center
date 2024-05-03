package com.example.modules.review.web;

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
}
