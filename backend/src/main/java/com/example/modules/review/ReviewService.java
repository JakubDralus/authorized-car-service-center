package com.example.modules.review;


import com.example.modules.review.web.ReviewDTO;
import com.example.shared.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService implements CrudService<ReviewDTO>{

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

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
}
