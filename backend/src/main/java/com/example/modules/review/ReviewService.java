package com.example.modules.review;


import com.example.modules.auth.JwtService;
import com.example.modules.review.web.ReviewCreateDto;
import com.example.modules.review.web.ReviewDTO;
import com.example.modules.review.web.ReviewReadDTO;
import com.example.modules.user.User;
import com.example.modules.user.UserRepository;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService implements CrudService<ReviewDTO>{

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public List<ReviewDTO> getAll() {
        return reviewRepository.findAll().stream().map(reviewMapper::toDto).toList();
    }

    @Override
    public ReviewDTO get(Long id) {
        return reviewMapper.toDto(reviewRepository.findById(id).orElseThrow());
    }

    @Override
    public ReviewDTO create(ReviewDTO reviewDTO) {
        Review review = new Review();
        reviewMapper.toEntity(reviewDTO, review);
        review = reviewRepository.save(review);
        return reviewMapper.toDto(review);
    }

    @Override
    public ReviewDTO update(ReviewDTO reviewDTO) {
        Review review = reviewRepository.getReferenceById(reviewDTO.getReviewId());
        reviewMapper.toEntity(reviewDTO, review);
        review = reviewRepository.save(review);
        return reviewMapper.toDto(review);
    }

    @Override
    public void delete(Long id) {
        if(reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id);
        }
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find the provided review.");
    }

    public ReviewReadDTO getReviewByToken(String token) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow();

        Review review = reviewRepository.getReviewByUserId(user.getUserId()).orElseThrow();
        return reviewMapper.toReadDto(review);
    }

    public ReviewReadDTO createUserReview(String token, ReviewCreateDto reviewCreateDto) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow();

        Review review = new Review();
        review.setCreatedAt(LocalDateTime.now());
        review.setUser(user);
        review.setDescription(reviewCreateDto.getDescription());
        review.setRate(reviewCreateDto.getRate());
        review.setTitle(reviewCreateDto.getTitle());

        review = reviewRepository.save(review);
        return reviewMapper.toReadDto(review);
    }

    public ReviewReadDTO updateUserReview(String token, ReviewCreateDto reviewUpdateDto) {
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow();

        Review review = reviewRepository.getReviewByUserId(user.getUserId()).orElseThrow();
        review.setTitle(reviewUpdateDto.getTitle());
        review.setDescription(reviewUpdateDto.getDescription());
        review.setRate(reviewUpdateDto.getRate());

        review = reviewRepository.save(review);
        return reviewMapper.toReadDto(review);
    }
}
