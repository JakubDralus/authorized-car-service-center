package com.example.modules.review;

import com.example.modules.review.web.ReviewDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.modules.user.UserRepository;
import com.example.modules.user.web.UserDTO;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReviewMapper implements IMapper<Review, ReviewDTO> {

    private final UserMapper userMapper;
    private final UserRepository userRepository

    @Override
    public ReviewDTO toDto(Review review) {
        return ReviewDTO.builder()
                .reviewId(review.getReviewId())
                .title(review.getTitle())
                .description(review.getDescription())
                .createdAt(review.getCreatedAt())
                .userId(review.getUser().getUserId())
                .build();
    }

    @Override
    public void toEntity(ReviewDTO reviewDTO, Review review) {
        review.setTitle(reviewDTO.getTitle());
        review.setDescription(reviewDTO.getDescription());
        review.setCreatedAt(reviewDTO.getCreatedAt());
        setUser(reviewDTO, review);
    }

    private void setUser(ReviewDTO reviewDTO, Review review) {
        User user = userRepository.findById(reviewDTO.getUser().getUserId()).orElseThrow();
        review.setUser(user);
    }
}
