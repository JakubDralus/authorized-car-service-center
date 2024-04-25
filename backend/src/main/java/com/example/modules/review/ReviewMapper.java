package com.example.modules.review;

import com.example.modules.review.web.ReviewDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserMapper;
import com.example.shared.IMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReviewMapper implements IMapper<Review, ReviewDTO> {

    private final UserMapper userMapper;

    @Override
    public ReviewDTO toDto(Review review) {
        return ReviewDTO.builder()
                .reviewId(review.getReviewId())
                .title(review.getTitle())
                .description(review.getDescription())
                .createdAt(review.getCreatedAt())
                .user(userMapper.toDto(review.getUser()))
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
        User user = review.getUser(); // when editing
        if (user == null) user = new User(); // when creating new user
        userMapper.toEntity(reviewDTO.getUser(), user);
        review.setUser(user);
    }
}
