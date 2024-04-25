package com.example.modules.review.web;

import com.example.modules.mechanic.MechanicService;
import com.example.modules.mechanic.web.MechanicDTO;
import com.example.modules.review.ReviewService;
import com.example.shared.ApiHttpResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public List<ReviewDTO> getAll(){
        return reviewService.getAll();
    }

    @GetMapping("/{reviewId}")
    public ReviewDTO get(@PathVariable Long reviewId){
        return reviewService.get(reviewId);
    }

    @PostMapping
    public ReviewDTO create(@RequestBody ReviewDTO reviewDTO){
        return reviewService.create(reviewDTO);
    }

    @PutMapping
    public ReviewDTO update(@RequestBody ReviewDTO reviewDTO){
        return reviewService.update(reviewDTO);
    }

    @DeleteMapping("{reviewId}")
    public ResponseEntity<ApiHttpResponse> delete(@PathVariable Long reviewId) {
        reviewService.delete(reviewId);
        return ResponseEntity.ok().body(ApiHttpResponse.builder()
                .timeStamp(LocalDateTime.now().toString())
                .message("Review deleted")
                .build());
    }
}
